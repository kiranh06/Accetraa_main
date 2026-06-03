"""
Initial migration for the portfolio app.
Creates three tables in MySQL:
  - portfolio_portfoliocategory
  - portfolio_portfolioitem        (FK → portfoliocategory)
  - portfolio_portfolioitemimage   (FK → portfolioitem)

Run with: python manage.py migrate portfolio
"""
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [

        # ── Table 1: portfolio_portfoliocategory ──────────────────────────────
        migrations.CreateModel(
            name='PortfolioCategory',
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
                ('name', models.CharField(
                    max_length=100,
                    unique=True,
                    help_text='Category display name.',
                )),
                ('slug', models.SlugField(
                    max_length=100,
                    unique=True,
                    help_text='URL-safe identifier for frontend filter.',
                )),
                ('sort_order', models.PositiveSmallIntegerField(
                    default=0,
                    help_text='Controls filter tab order.',
                )),
            ],
            options={
                'verbose_name': 'Portfolio Category',
                'verbose_name_plural': 'Portfolio Categories',
                'ordering': ['sort_order', 'name'],
            },
        ),

        # ── Table 2: portfolio_portfolioitem ──────────────────────────────────
        migrations.CreateModel(
            name='PortfolioItem',
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
                # ForeignKey to PortfolioCategory
                (
                    'category',
                    models.ForeignKey(
                        help_text='Category used for portfolio filter tabs.',
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name='items',
                        to='portfolio.portfoliocategory',
                    ),
                ),
                # PortfolioItem fields
                ('title', models.CharField(
                    max_length=255,
                    help_text='Project title.',
                )),
                ('slug', models.SlugField(
                    max_length=255,
                    unique=True,
                    help_text='URL-safe identifier. Reserved for Phase 2 detail pages.',
                )),
                ('client_name', models.CharField(
                    max_length=150,
                    blank=True,
                    null=True,
                    help_text='Client name. Blank = anonymous.',
                )),
                ('short_description', models.CharField(
                    max_length=500,
                    help_text='Brief description shown on the card.',
                )),
                ('description', models.TextField(
                    blank=True,
                    null=True,
                    help_text='Full description for modal and Phase 2 detail page.',
                )),
                ('thumbnail', models.ImageField(
                    upload_to='portfolio/thumbnails/',
                    blank=True,
                    null=True,
                    help_text='Main card image.',
                )),
                ('technologies', models.CharField(
                    max_length=500,
                    blank=True,
                    null=True,
                    help_text='Comma-separated technologies list.',
                )),
                ('project_url', models.URLField(
                    max_length=500,
                    blank=True,
                    null=True,
                    help_text='Live project URL.',
                )),
                ('is_featured', models.BooleanField(
                    default=False,
                    help_text='Show in homepage portfolio highlights.',
                )),
                ('sort_order', models.PositiveSmallIntegerField(
                    default=0,
                    help_text='Display order within category.',
                )),
                ('is_active', models.BooleanField(
                    default=True,
                    help_text='Uncheck to hide from public site.',
                )),
            ],
            options={
                'verbose_name': 'Portfolio Item',
                'verbose_name_plural': 'Portfolio Items',
                'ordering': ['sort_order', '-created_at'],
            },
        ),

        # ── Table 3: portfolio_portfolioitemimage ─────────────────────────────
        migrations.CreateModel(
            name='PortfolioItemImage',
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
                (
                    'portfolio_item',
                    models.ForeignKey(
                        help_text='The project this image belongs to.',
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='images',
                        to='portfolio.portfolioitem',
                    ),
                ),
                ('image', models.ImageField(
                    upload_to='portfolio/gallery/',
                    help_text='Gallery image.',
                )),
                ('caption', models.CharField(
                    max_length=255,
                    blank=True,
                    null=True,
                    help_text='Optional caption shown below the image.',
                )),
                ('sort_order', models.PositiveSmallIntegerField(
                    default=0,
                    help_text='Image display order.',
                )),
            ],
            options={
                'verbose_name': 'Portfolio Image',
                'verbose_name_plural': 'Portfolio Images',
                'ordering': ['sort_order'],
            },
        ),
    ]
