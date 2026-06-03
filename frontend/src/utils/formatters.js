export const formatDate = (dateString, locale = 'en-IN') => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Safely coerce any API value to a renderable string.
// DRF can return relational fields as nested objects, e.g.:
//   category: { id: 1, name: "FinTech", slug: "fintech", sort_order: 1 }
// Passing such an object directly to React causes "Objects are not valid as a React child".
export const asString = (val) => {
  if (val == null) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) return val.map(asString).filter(Boolean).join(', ');
  if (typeof val === 'object') {
    // Try common DRF label fields in priority order
    return (
      val.name      ??
      val.label     ??
      val.title     ??
      val.display_name ??
      val.value     ??
      ''
    );
  }
  return String(val);
};

// Normalise a features/highlights array that may contain strings or objects.
export const toStringArray = (val) => {
  if (!val) return [];
  if (typeof val === 'string') return val.split(',').map((s) => s.trim()).filter(Boolean);
  if (Array.isArray(val)) return val.map(asString).filter(Boolean);
  return [];
};
