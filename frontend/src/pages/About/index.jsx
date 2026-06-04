import SEO from '@/components/seo';
import PageHero from '@/components/shared/PageHero';
import CTABanner from '@/components/shared/CTABanner';
import { ROUTES } from '@/utils/constants';
import CompanyIntro from './sections/CompanyIntro';
import MissionVision from './sections/MissionVision';
import CoreValues from './sections/CoreValues';
import WhyChooseUs from './sections/WhyChooseUs';
import IndustryExpertise from './sections/IndustryExpertise';
import TeamSection from './sections/TeamSection';
import ProcessSection from './sections/ProcessSection';
import StatisticsSection from './sections/StatisticsSection';

const BREADCRUMBS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'About Us', path: ROUTES.ABOUT },
];

const About = () => (
  <>
    <SEO
      title="About Us"
      description="Accetraa Technologies is an enterprise technology partner delivering product engineering, cloud architecture, and AI automation solutions that drive measurable business outcomes."
    />

    <main>
      <PageHero
        title="About Accetraa Technologies"
        subtitle="We are a technology partner — not a vendor. We combine senior engineering talent with strategic thinking to deliver enterprise systems that scale, perform, and endure."
        breadcrumbs={BREADCRUMBS}
        size="sm"
        align="center"
      />

      <CompanyIntro />
      <MissionVision />
      <CoreValues />
      <StatisticsSection />
      <WhyChooseUs />
      <IndustryExpertise />
      <TeamSection />
      <ProcessSection />

      <CTABanner
        eyebrow="Work With Us"
        heading="Ready to partner with a team that takes ownership?"
        description="Schedule a consultation with our leadership team. No sales pitch — just an honest conversation about how we can help you achieve your goals."
        primaryAction={{ label: 'Book Consultation', href: ROUTES.CONTACT }}
        secondaryAction={{ label: 'View Our Work', href: ROUTES.PORTFOLIO }}
        variant="dark"
        align="split"
      />
    </main>
  </>
);

export default About;
