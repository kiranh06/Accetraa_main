from django.db import models
from apps.core.models import TimeStampedModel


class Product(TimeStampedModel):
    """
    Represents a proprietary software product built by Accetraa Technologies.
    Displayed in the Products section of the Portfolio & Products page
    and on the Home page featured products grid.

    Phase 1: Showcase card only (name, tagline, short description, thumbnail).
    Phase 2: Full product landing page uses the `description` field.

    Table: products_product
    """
    name = models.CharField(
        max_length=150,
        help_text='Product name (e.g. "UrSaloon", "HRMS").',
    )
    slug = models.SlugField(
        max_length=150,
        unique=True,
        help_text='URL-safe identifier. Reserved for Phase 2 product detail pages.',
    )
    tagline = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text='One-line product pitch shown on the product card.',
    )
    short_description = models.CharField(
        max_length=500,
        help_text='Brief description shown on product cards (2–4 lines).',
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text='Full product description. Reserved for Phase 2 individual product pages.',
    )
    thumbnail = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True,
        help_text='Product screenshot or logo. Stored in media/products/. Recommended: 800×500px.',
    )
    is_featured = models.BooleanField(
        default=False,
        help_text='Check to show this product in the Home page featured products section.',
    )
    sort_order = models.PositiveSmallIntegerField(
        default=0,
        help_text='Controls display order on the Products page. Lower numbers appear first.',
    )
    is_active = models.BooleanField(
        default=True,
        help_text='Uncheck to hide this product from the public website without deleting it.',
    )

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name
