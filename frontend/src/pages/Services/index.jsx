import SEO from '@/components/seo';
import PageHero from '@/components/shared/PageHero';
import CTABanner from '@/components/shared/CTABanner';
import { ROUTES } from '@/utils/constants';
import ServicesOverview from './sections/ServicesOverview';
import ServicesGrid from './sections/ServicesGrid';
import ServiceDetails from './sections/ServiceDetails';
import IndustriesServed from './sections/IndustriesServed';
import EngagementProcess from './sections/EngagementProcess';
import WhyOurServices from './sections/WhyOurServices';
import ServicesFAQ from './sections/ServicesFAQ';

const BREADCRUMBS = [
  { label: 'Home',     path: ROUTES.HOME },
  { label: 'Services', path: ROUTES.SERVICES },
];

const Services = () => (
  <>
    <SEO
      title="Our Services"
      description="Accetraa Technologies delivers end-to-end technology services — product engineering, cloud architecture, AI automation, and data engineering — for enterprises that demand the highest standards."
    />

    <main>
      <PageHero
        title="Our Services"
        subtitle="End-to-end technology services engineered for enterprise performance. From product development to cloud infrastructure, we own the full delivery lifecycle."
        breadcrumbs={BREADCRUMBS}
        size="sm"
        align="center"
      />

      <ServicesOverview />
      <ServicesGrid />
      <ServiceDetails />
      <EngagementProcess />
      <IndustriesServed />
      <WhyOurServices />
      <ServicesFAQ />

      <CTABanner
        eyebrow="Ready to Get Started?"
        heading="Let's discuss your technology requirements"
        description="Book a free consultation with our senior engineers. We'll review your requirements, ask the right questions, and outline a clear path forward — no sales pressure."
        primaryAction={{ label: 'Book Consultation', href: ROUTES.CONTACT }}
        secondaryAction={{ label: 'Contact Us', href: ROUTES.CONTACT }}
        variant="dark"
        align="split"
      />
    </main>
  </>
);

export default Services;
