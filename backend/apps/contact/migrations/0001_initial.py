"""
Initial migration for the contact app.
Creates the contact_contactrequest table in MySQL.

Run with: python manage.py migrate contact
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='ContactRequest',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                # Inherited from TimeStampedModel
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                # Submitted fields
                ('full_name', models.CharField(
                    max_length=150,
                    help_text='Submitter full name.',
                )),
                ('email', models.EmailField(
                    max_length=254,
                    help_text='Submitter email address.',
                )),
                ('phone', models.CharField(
                    max_length=30,
                    help_text='Submitter phone number.',
                )),
                ('company_name', models.CharField(
                    max_length=150,
                    blank=True,
                    null=True,
                    help_text='Company or organisation name (optional).',
                )),
                ('subject', models.CharField(
                    max_length=255,
                    help_text='Brief subject of the enquiry.',
                )),
                ('message', models.TextField(
                    help_text='Full message from the submitter.',
                )),
                # Admin-managed
                ('status', models.CharField(
                    max_length=10,
                    choices=[
                        ('new',       'New'),
                        ('contacted', 'Contacted'),
                        ('closed',    'Closed'),
                    ],
                    default='new',
                    db_index=True,
                    help_text='Follow-up status of this contact request.',
                )),
                # System
                ('ip_address', models.GenericIPAddressField(
                    blank=True,
                    null=True,
                    help_text='IP address for rate limiting and spam detection.',
                )),
            ],
            options={
                'verbose_name':        'Contact Request',
                'verbose_name_plural': 'Contact Requests',
                'ordering':            ['-created_at'],
            },
        ),
    ]
