"""
Initial migration for the products app.
Creates the products_product table in MySQL.

Generated for model: apps.products.models.Product
Run with: python manage.py migrate products
"""
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Product',
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
                # Product-specific fields
                ('name', models.CharField(
                    max_length=150,
                    help_text='Product name.',
                )),
                ('slug', models.SlugField(
                    max_length=150,
                    unique=True,
                    help_text='URL-safe identifier. Reserved for Phase 2 product pages.',
                )),
                ('tagline', models.CharField(
                    max_length=255,
                    blank=True,
                    null=True,
                    help_text='One-line product pitch.',
                )),
                ('short_description', models.CharField(
                    max_length=500,
                    help_text='Brief description shown on product cards.',
                )),
                ('description', models.TextField(
                    blank=True,
                    null=True,
                    help_text='Full description. Reserved for Phase 2 product pages.',
                )),
                ('thumbnail', models.ImageField(
                    upload_to='products/',
                    blank=True,
                    null=True,
                    help_text='Product image. Stored in media/products/.',
                )),
                ('is_featured', models.BooleanField(
                    default=False,
                    help_text='Show in homepage featured products section.',
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
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
                'ordering': ['sort_order', 'name'],
            },
        ),
    ]
