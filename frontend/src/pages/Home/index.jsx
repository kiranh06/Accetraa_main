import SEO from '@/components/seo';
import CTABanner from '@/components/shared/CTABanner';
import { ROUTES } from '@/utils/constants';
import HeroSection from './sections/HeroSection';
import CompanyOverview from './sections/CompanyOverview';
import ServicesPreview from './sections/ServicesPreview';
import ProductsPreview from './sections/ProductsPreview';
import PortfolioHighlights from './sections/PortfolioHighlights';
import WhyChooseUs from './sections/WhyChooseUs';
import TestimonialsSection from './sections/TestimonialsSection';

const Home = () => (
  <>
    <SEO
      title="Enterprise Technology Partner"
      description="Accetraa delivers enterprise-grade technology solutions — product engineering, cloud architecture, and AI automation — that drive measurable business outcomes."
    />

    <main>
      <HeroSection />
      <CompanyOverview />
      <ServicesPreview />
      <ProductsPreview />
      <PortfolioHighlights />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTABanner
        eyebrow="Start Your Journey"
        heading="Ready to accelerate your digital future?"
        description="Book a free consultation with our experts and discover how Accetraa can transform your business."
        primaryAction={{ label: 'Book Consultation', href: ROUTES.CONTACT }}
        secondaryAction={{ label: 'View Our Work', href: ROUTES.PORTFOLIO }}
        variant="dark"
        align="split"
      />
    </main>
  </>
);

export default Home;
