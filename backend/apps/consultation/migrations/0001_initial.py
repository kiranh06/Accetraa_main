"""
Initial migration for the consultation app.
Creates the consultation_consultationrequest table in MySQL.

Run with: python manage.py migrate consultation
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='ConsultationRequest',
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
                    help_text='Full name of the person requesting the consultation.',
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
                ('service_interest', models.CharField(
                    max_length=150,
                    help_text='The Accetraa service the prospect is interested in discussing.',
                )),
                ('message', models.TextField(
                    help_text='Additional context or questions from the prospect.',
                )),
                # Admin-managed
                ('status', models.CharField(
                    max_length=10,
                    choices=[
                        ('new',       'New'),
                        ('scheduled', 'Scheduled'),
                        ('completed', 'Completed'),
                        ('closed',    'Closed'),
                    ],
                    default='new',
                    db_index=True,
                    help_text='Consultation lifecycle status.',
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
                'verbose_name':        'Consultation Request',
                'verbose_name_plural': 'Consultation Requests',
                'ordering':            ['-created_at'],
            },
        ),
    ]
