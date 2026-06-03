"""
Adds the user_agent column to contact_contactrequest.
Additive migration — no data loss, no downtime risk.

Run with: python manage.py migrate contact
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactrequest',
            name='user_agent',
            field=models.TextField(
                blank=True,
                null=True,
                help_text='Browser/device user agent string captured at submission time. Used for spam investigation.',
            ),
        ),
    ]
