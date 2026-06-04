# Staging Fix Report — `DB_NAME` UndefinedValueError
**Date:** 2026-06-04  
**Status:** ✅ Fixed and verified

---

## Root Cause

`base.py` defined the `DATABASES` block at module scope using `python-decouple`'s `config()` function with no defaults:

```python
# base.py — original (broken for staging)
DATABASES = {
    'default': {
        'ENGINE':   'django.db.backends.mysql',
        'NAME':     config('DB_NAME'),       ← raises UndefinedValueError immediately
        'USER':     config('DB_USER'),       ← raises UndefinedValueError immediately
        'PASSWORD': config('DB_PASSWORD'),   ← raises UndefinedValueError immediately
        ...
    }
}
```

Python executes `from .base import *` **line by line, eagerly**, before any code in `staging.py` can run. When `staging.py` did `from .base import *`, it triggered `config('DB_NAME')` on the Render server where no MySQL variables exist — only `DATABASE_URL`. `python-decouple` raised `UndefinedValueError` and the deployment crashed before `staging.py` could define its own `DATABASES`.

**The rule that was violated:** a shared base settings file must not call `config()` for variables that are environment-specific. Every `config()` call in `base.py` is evaluated on import by *every* environment, regardless of what that environment actually needs.

---

## Files Changed

### 1. `backend/accetraa/settings/base.py`

**Removed** the `DATABASES` block entirely. Replaced with a routing comment:

```python
# ── Database ───────────────────────────────────────────────────────────────────
# DATABASES is NOT defined here.
#
# Each environment settings file is responsible for its own database block:
#
#   development.py → MySQL  via DB_NAME / DB_USER / DB_PASSWORD / DB_HOST / DB_PORT
#   production.py  → MySQL  via DB_NAME / DB_USER / DB_PASSWORD / DB_HOST / DB_PORT
#   staging.py     → PostgreSQL via DATABASE_URL (injected automatically by Render)
#
# Defining DATABASES in base.py would force all three environments to supply
# MySQL variables at import time, which breaks staging where only DATABASE_URL
# is available.
```

### 2. `backend/accetraa/settings/development.py`

**Added** the MySQL `DATABASES` block (previously inherited from base.py):

```python
from decouple import config

DATABASES = {
    'default': {
        'ENGINE':   'django.db.backends.mysql',
        'NAME':     config('DB_NAME'),
        'USER':     config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST':     config('DB_HOST', default='localhost'),
        'PORT':     config('DB_PORT', default='3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
        'CONN_MAX_AGE': 60,
    }
}
```

`DB_NAME`, `DB_USER`, `DB_PASSWORD` are now only demanded when `development.py` is the active settings module — not when `staging.py` is.

### 3. `backend/accetraa/settings/production.py`

**Added** the same MySQL `DATABASES` block. Production also uses MySQL (AWS RDS) and must continue working unchanged.

### 4. `backend/accetraa/settings/staging.py`

**No change.** `staging.py` already defined its own `DATABASES` via `dj_database_url.config()`. The only reason it was failing was because `base.py` crashed before staging.py could do anything.

---

## Exact Fix in Diff Form

```diff
--- a/accetraa/settings/base.py
+++ b/accetraa/settings/base.py
-# ── Database ──────────────────────────────────────────────────────────────────
-# Reads connection details from environment variables.
-# Override in development.py / production.py if needed.
-DATABASES = {
-    'default': {
-        'ENGINE': 'django.db.backends.mysql',
-        'NAME': config('DB_NAME'),
-        'USER': config('DB_USER'),
-        'PASSWORD': config('DB_PASSWORD'),
-        'HOST': config('DB_HOST', default='localhost'),
-        'PORT': config('DB_PORT', default='3306'),
-        'OPTIONS': {
-            'charset': 'utf8mb4',
-            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
-        },
-        'CONN_MAX_AGE': 60,
-    }
-}
+# ── Database ──────────────────────────────────────────────────────────────────
+# DATABASES is NOT defined here.
+# Each environment settings file defines its own database connection:
+#   development.py / production.py → MySQL via DB_* variables
+#   staging.py                     → PostgreSQL via DATABASE_URL
```

```diff
--- a/accetraa/settings/development.py
+++ b/accetraa/settings/development.py
 from .base import *  # noqa: F401, F403
+from decouple import config
+
+# ── Database — local MySQL ────────────────────────────────────────────────────
+DATABASES = {
+    'default': {
+        'ENGINE':   'django.db.backends.mysql',
+        'NAME':     config('DB_NAME'),
+        'USER':     config('DB_USER'),
+        'PASSWORD': config('DB_PASSWORD'),
+        'HOST':     config('DB_HOST', default='localhost'),
+        'PORT':     config('DB_PORT', default='3306'),
+        'OPTIONS': {
+            'charset': 'utf8mb4',
+            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
+        },
+        'CONN_MAX_AGE': 60,
+    }
+}
```

```diff
--- a/accetraa/settings/production.py
+++ b/accetraa/settings/production.py
 from .base import *  # noqa: F401, F403
 from decouple import config
+
+# ── Database — AWS RDS MySQL ───────────────────────────────────────────────────
+DATABASES = {
+    'default': { ... same MySQL block ... }
+}
+
 # ── Security ...
```

---

## Verification Results

| Command | Settings module | Result |
|---|---|---|
| `python manage.py check` | `accetraa.settings.staging` | ✅ **System check identified no issues (0 silenced)** |
| `python manage.py check --deploy` | `accetraa.settings.staging` | ✅ **2 expected warnings only** (see note below) |
| `python manage.py collectstatic --no-input` | `accetraa.settings.staging` | ✅ **162 static files copied, 466 post-processed** |
| `python manage.py migrate --check` | `accetraa.settings.development` | ✅ **All migrations applied, 0 pending** |
| `python manage.py showmigrations` | `accetraa.settings.development` | ✅ **All 7 app migration chains: [X] applied** |
| Python `ast.parse` on all 4 settings files | — | ✅ **All syntax valid** |

**Note on `check --deploy` warnings:**  
`SECURE_HSTS_SECONDS` and `SECURE_SSL_REDIRECT` both show warnings because they are intentionally not set / set to `False`. Render terminates TLS at the load balancer — enabling `SECURE_SSL_REDIRECT` inside Django would cause redirect loops, and HSTS is managed at the infrastructure layer. These are expected and correct.

**Note on `migrate` local test:**  
`python manage.py migrate` was run against development MySQL (`showmigrations` above) because the staging `migrate` command requires a live PostgreSQL connection. When using `DATABASE_URL=sqlite:///` for local simulation, `dj_database_url` passes `sslmode=require` to SQLite's driver which does not support that argument — this is a local test limitation, not a staging issue. On Render, `DATABASE_URL` is a `postgres://` URL and `ssl_require=True` is a valid and necessary parameter.

---

## Behaviour After Fix

| Environment | Settings module | MySQL vars required | PostgreSQL URL required |
|---|---|---|---|
| Local development | `development.py` | ✅ Yes (`DB_NAME` etc.) | ❌ No |
| Render staging | `staging.py` | ❌ No | ✅ Yes (`DATABASE_URL`) |
| Production (AWS) | `production.py` | ✅ Yes (`DB_NAME` etc.) | ❌ No |

The `from .base import *` in all three child settings files now completes without touching any database variables. Each settings module independently satisfies its own database requirements.
