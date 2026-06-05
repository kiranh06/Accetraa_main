import SEO from '@/components/seo';
import PageHero from '@/components/shared/PageHero';
import CTABanner from '@/components/shared/CTABanner';
import { ROUTES } from '@/utils/constants';
import WhyJoinUs from './sections/WhyJoinUs';
import LifeAtAccetraa from './sections/LifeAtAccetraa';
import Benefits from './sections/Benefits';
import CurrentOpenings from './sections/CurrentOpenings';
import TalentCTA from './sections/TalentCTA';
import CareersFAQ from './sections/CareersFAQ';

const BREADCRUMBS = [
  { label: 'Home',    path: ROUTES.HOME },
  { label: 'Careers', path: ROUTES.CAREERS },
];

const Careers = () => (
  <>
    <SEO
      title="Careers"
      description="Join the Accetraa Technologies team. We hire experienced engineers and consultants who care about quality, ownership, and building software that matters."
    />

    <main>
      <PageHero
        title="Careers at Accetraa"
        subtitle="We hire for character and capability — then invest in both. If you want to do your best work alongside people who take the craft seriously, let's talk."
        breadcrumbs={BREADCRUMBS}
        size="sm"
        align="center"
      />

      <WhyJoinUs />
      <LifeAtAccetraa />
      <Benefits />
      <CurrentOpenings />
      <TalentCTA />
      <CareersFAQ />

      <CTABanner
        eyebrow="Ready to Make Your Move?"
        heading="Don't wait for a job posting"
        description="The best hires come through direct introductions. Reach out now, tell us about yourself, and we'll be in touch when the right opportunity arises."
        primaryAction={{ label: 'Get in Touch', href: ROUTES.CONTACT }}
        variant="dark"
        align="split"
      />
    </main>
  </>
);

export default Careers;
