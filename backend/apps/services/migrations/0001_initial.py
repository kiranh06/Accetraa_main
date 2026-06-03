"""
Initial migration for the services app.
Creates the services_service table in MySQL.

Generated for model: apps.services.models.Service
Run with: python manage.py migrate services
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Service',
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
                # Service-specific fields
                ('name', models.CharField(
                    max_length=150,
                    help_text='Display name of the service.',
                )),
                ('slug', models.SlugField(
                    max_length=150,
                    unique=True,
                    help_text='URL-safe identifier.',
                )),
                ('short_description', models.CharField(
                    max_length=300,
                    help_text='Brief description shown on service cards.',
                )),
                ('description', models.TextField(
                    blank=True,
                    null=True,
                    help_text='Full description for Phase 2 service detail pages.',
                )),
                ('icon', models.CharField(
                    max_length=100,
                    blank=True,
                    null=True,
                    help_text='Icon filename or CSS class name.',
                )),
                ('sort_order', models.PositiveSmallIntegerField(
                    default=0,
                    help_text='Controls display order. Lower = first.',
                )),
                ('is_active', models.BooleanField(
                    default=True,
                    help_text='Uncheck to hide from public website.',
                )),
            ],
            options={
                'verbose_name': 'Service',
                'verbose_name_plural': 'Services',
                'ordering': ['sort_order', 'name'],
            },
        ),
    ]
