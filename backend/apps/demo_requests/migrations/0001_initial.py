"""
Initial migration for the demo_requests app.
Creates the demo_requests_demorequest table in MySQL.

Run with: python manage.py migrate demo_requests
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='DemoRequest',
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
                    help_text='Full name of the person requesting the demo.',
                )),
                ('email', models.EmailField(
                    max_length=254,
                    help_text='Contact email address.',
                )),
                ('phone', models.CharField(
                    max_length=30,
                    help_text='Contact phone number.',
                )),
                ('company_name', models.CharField(
                    max_length=150,
                    help_text='Company or organisation name.',
                )),
                ('job_title', models.CharField(
                    max_length=150,
                    blank=True,
                    null=True,
                    help_text='Job title or role of the requester (optional).',
                )),
                ('product_interest', models.CharField(
                    max_length=150,
                    help_text='The Accetraa product the prospect wants to see demonstrated.',
                )),
                ('company_size', models.CharField(
                    max_length=50,
                    blank=True,
                    null=True,
                    help_text='Approximate number of employees at the prospect company (optional).',
                )),
                ('message', models.TextField(
                    help_text='Additional context, specific use cases, or questions from the prospect.',
                )),
                # Admin-managed
                ('status', models.CharField(
                    max_length=10,
                    choices=[
                        ('new',       'New'),
                        ('contacted', 'Contacted'),
                        ('scheduled', 'Demo Scheduled'),
                        ('completed', 'Demo Completed'),
                        ('closed',    'Closed'),
                    ],
                    default='new',
                    db_index=True,
                    help_text='Tracks the demo lifecycle status.',
                )),
                # System fields
                ('ip_address', models.GenericIPAddressField(
                    blank=True,
                    null=True,
                    help_text='Submitter IP address.',
                )),
                ('user_agent', models.TextField(
                    blank=True,
                    null=True,
                    help_text='Browser/device user agent string.',
                )),
            ],
            options={
                'verbose_name':        'Demo Request',
                'verbose_name_plural': 'Demo Requests',
                'ordering':            ['-created_at'],
            },
        ),
    ]
