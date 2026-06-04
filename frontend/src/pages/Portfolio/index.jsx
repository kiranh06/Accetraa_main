import SEO from '@/components/seo';
import PageHero from '@/components/shared/PageHero';
import CTABanner from '@/components/shared/CTABanner';
import { ROUTES } from '@/utils/constants';
import PortfolioOverview from './sections/PortfolioOverview';
import SuccessMetrics from './sections/SuccessMetrics';
import ProductsShowcase from './sections/ProductsShowcase';
import FeaturedProjects from './sections/FeaturedProjects';
import PortfolioShowcase from './sections/PortfolioShowcase';
import TechnologyExpertise from './sections/TechnologyExpertise';

const BREADCRUMBS = [
  { label: 'Home',               path: ROUTES.HOME },
  { label: 'Portfolio & Products', path: ROUTES.PORTFOLIO },
];

const Portfolio = () => (
  <>
    <SEO
      title="Portfolio & Products"
      description="Explore Accetraa's portfolio of enterprise projects and proprietary products — built across FinTech, HealthTech, Manufacturing, and SaaS with measurable business outcomes."
    />

    <main>
      <PageHero
        title="Portfolio & Products"
        subtitle="Real projects. Measurable outcomes. Enterprise-grade delivery across every vertical we serve."
        breadcrumbs={BREADCRUMBS}
        size="sm"
        align="center"
      />

      <PortfolioOverview />
      <SuccessMetrics />
      <ProductsShowcase />
      <FeaturedProjects />
      <PortfolioShowcase />
      <TechnologyExpertise />

      <CTABanner
        eyebrow="See It in Action"
        heading="Want a live demonstration of our products?"
        description="Schedule a tailored demo with our team. We'll walk you through the platform features most relevant to your industry and use case."
        primaryAction={{ label: 'Request Demo', href: ROUTES.CONTACT }}
        secondaryAction={{ label: 'Book Consultation', href: ROUTES.CONTACT }}
        variant="dark"
        align="split"
      />
    </main>
  </>
);

export default Portfolio;
