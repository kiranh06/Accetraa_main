from django.db import models
from apps.core.models import TimeStampedModel


class Service(TimeStampedModel):
    """
    Represents a service offered by Accetraa Technologies.
    Displayed on the Services page and the Home page services overview.

    Table: services_service
    """
    name = models.CharField(
        max_length=150,
        help_text='Display name of the service (e.g. "AI & Data Solutions").',
    )
    slug = models.SlugField(
        max_length=150,
        unique=True,
        help_text='URL-safe identifier (auto-generated from name). Used for Phase 2 detail pages.',
    )
    short_description = models.CharField(
        max_length=300,
        help_text='Brief description shown on service cards (max 2–3 lines, ~200 characters).',
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text='Full rich-text description. Reserved for Phase 2 individual service pages.',
    )
    icon = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text='Icon filename (e.g. "icon-ai.svg") or CSS class name for icon font.',
    )
    sort_order = models.PositiveSmallIntegerField(
        default=0,
        help_text='Controls display order. Lower numbers appear first.',
    )
    is_active = models.BooleanField(
        default=True,
        help_text='Uncheck to hide this service from the public website without deleting it.',
    )

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name
