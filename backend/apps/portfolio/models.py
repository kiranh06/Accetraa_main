from django.db import models
from apps.core.models import TimeStampedModel


class PortfolioCategory(models.Model):
    """
    Lookup table for portfolio item categories.
    Used as the filter tabs on the Portfolio & Products page.

    Table: portfolio_portfoliocategory
    """
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text='Category display name (e.g. "Web Projects").',
    )
    slug = models.SlugField(
        max_length=100,
        unique=True,
        help_text='URL-safe identifier used by the frontend filter (e.g. "web-projects").',
    )
    sort_order = models.PositiveSmallIntegerField(
        default=0,
        help_text='Controls the order of filter tabs. Lower numbers appear first.',
    )

    class Meta:
        verbose_name = 'Portfolio Category'
        verbose_name_plural = 'Portfolio Categories'
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name


class PortfolioItem(TimeStampedModel):
    """
    A single portfolio project showcased on the Portfolio & Products page.

    Phase 1: Displayed as a card in a filterable grid.
             Clicking a card opens a modal with the full description and gallery images.
             No separate detail page — that is Phase 2.

    Phase 2: Individual detail page at /portfolio/:slug using the description field.

    Table: portfolio_portfolioitem
    """
    category = models.ForeignKey(
        PortfolioCategory,
        on_delete=models.PROTECT,
        related_name='items',
        help_text='Category this project belongs to. Used for the portfolio filter tabs.',
    )
    title = models.CharField(
        max_length=255,
        help_text='Project title displayed on the card and in the modal.',
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        help_text='URL-safe identifier. Reserved for Phase 2 portfolio detail pages.',
    )
    client_name = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        help_text='Client or company name. Leave blank to display anonymously.',
    )
    short_description = models.CharField(
        max_length=500,
        help_text='Brief description shown on the portfolio card (2–3 lines).',
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text='Full project description shown in the Phase 1 modal and Phase 2 detail page.',
    )
    thumbnail = models.ImageField(
        upload_to='portfolio/thumbnails/',
        blank=True,
        null=True,
        help_text='Main card image. Stored in media/portfolio/thumbnails/. Recommended: 800×600px.',
    )
    technologies = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        help_text='Comma-separated list of technologies used (e.g. "React, Django, MySQL, AWS").',
    )
    project_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text='Live project URL shown as a link in the modal. Leave blank if not applicable.',
    )
    is_featured = models.BooleanField(
        default=False,
        help_text='Check to show this project in the Home page portfolio highlights section.',
    )
    sort_order = models.PositiveSmallIntegerField(
        default=0,
        help_text='Controls display order within a category. Lower numbers appear first.',
    )
    is_active = models.BooleanField(
        default=True,
        help_text='Uncheck to hide this project from the public website without deleting it.',
    )

    class Meta:
        verbose_name = 'Portfolio Item'
        verbose_name_plural = 'Portfolio Items'
        ordering = ['sort_order', '-created_at']

    def __str__(self):
        return self.title


class PortfolioItemImage(models.Model):
    """
    Additional gallery images for a portfolio item.
    Displayed in the Phase 1 modal and Phase 2 detail page.

    Table: portfolio_portfolioitemimage
    """
    portfolio_item = models.ForeignKey(
        PortfolioItem,
        on_delete=models.CASCADE,
        related_name='images',
        help_text='The portfolio project this image belongs to.',
    )
    image = models.ImageField(
        upload_to='portfolio/gallery/',
        help_text='Gallery image. Stored in media/portfolio/gallery/. Recommended: 1280×800px.',
    )
    caption = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text='Optional caption displayed below the image in the modal.',
    )
    sort_order = models.PositiveSmallIntegerField(
        default=0,
        help_text='Controls the image display order. Lower numbers appear first.',
    )

    class Meta:
        verbose_name = 'Portfolio Image'
        verbose_name_plural = 'Portfolio Images'
        ordering = ['sort_order']

    def __str__(self):
        return f'{self.portfolio_item.title} — image {self.sort_order}'
