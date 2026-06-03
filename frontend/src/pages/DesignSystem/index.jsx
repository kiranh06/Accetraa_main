import SEO from '@/components/seo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card, { ServiceCard, PortfolioCard, ProductCard } from '@/components/ui/Card';
import FormField from '@/components/ui/FormField';
import { SkeletonCard, SkeletonText } from '@/components/ui/Skeleton';
import Loader from '@/components/ui/Loader';
import SectionHeader from '@/components/shared/SectionHeader';
import styles from './DesignSystem.module.scss';

const Section = ({ title, children }) => (
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <div className={styles.sectionContent}>{children}</div>
  </section>
);

const Row = ({ children, wrap = true }) => (
  <div className={`${styles.row} ${wrap ? styles.rowWrap : ''}`}>{children}</div>
);

const DesignSystem = () => (
  <>
    <SEO title="Design System" description="Accetraa component and token reference." />
    <main className={styles.page}>
      <div className={styles.header}>
        <span className={styles.tag}>Internal Reference</span>
        <h1 className={styles.title}>Design System</h1>
        <p className={styles.subtitle}>Tokens, components, and patterns for the Accetraa frontend.</p>
      </div>

      {/* ── COLOR SYSTEM ── */}
      <Section title="1 · Color System">
        <div className={styles.colorGrid}>
          {[
            { name: 'Primary',       bg: '#0038A8', light: true },
            { name: 'Primary Dark',  bg: '#002880', light: true },
            { name: 'Primary Light', bg: '#1A57D6', light: true },
            { name: 'Primary Subtle',bg: '#E8EEFB', light: false },
            { name: 'Secondary',     bg: '#00897B', light: true },
            { name: 'Accent',        bg: '#FF4D00', light: true },
            { name: 'Success',       bg: '#16A34A', light: true },
            { name: 'Warning',       bg: '#D97706', light: true },
            { name: 'Error',         bg: '#DC2626', light: true },
            { name: 'Neutral 950',   bg: '#060810', light: true },
            { name: 'Neutral 900',   bg: '#0C1120', light: true },
            { name: 'Neutral 700',   bg: '#232E42', light: true },
            { name: 'Neutral 500',   bg: '#556070', light: true },
            { name: 'Neutral 300',   bg: '#B0BCCA', light: false },
            { name: 'Neutral 100',   bg: '#EBF0F5', light: false },
            { name: 'Neutral 50',    bg: '#F5F8FB', light: false },
          ].map(({ name, bg, light }) => (
            <div key={name} className={styles.swatch} style={{ background: bg }}>
              <span className={styles.swatchName} style={{ color: light ? '#fff' : '#0C1120' }}>
                {name}
              </span>
              <span className={styles.swatchHex} style={{ color: light ? 'rgba(255,255,255,0.7)' : '#556070' }}>
                {bg}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── TYPOGRAPHY ── */}
      <Section title="2 · Typography">
        <div className={styles.typeStack}>
          <p style={{ fontSize: '3.75rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#0C1120' }}>Display / Hero</p>
          <p style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#0C1120' }}>Heading 1</p>
          <p style={{ fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#0C1120' }}>Heading 2</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#0C1120' }}>Heading 3</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#151D30' }}>Heading 4</p>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.75, color: '#556070' }}>Lead body text — 18px Regular. Used for page intros and prominent descriptions.</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#556070' }}>Body text — 16px Regular. Standard paragraph size for all content sections.</p>
          <p style={{ fontSize: '0.875rem', color: '#7F8E9E' }}>Small / Caption — 14px. Used for metadata, captions, and helper text.</p>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0038A8' }}>Eyebrow Label — 12px Semibold Upper</p>
        </div>
      </Section>

      {/* ── BUTTONS ── */}
      <Section title="3 · Button System">
        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Variants</h3>
          <Row>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
          </Row>
        </div>
        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Sizes</h3>
          <Row>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </Row>
        </div>
        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>States</h3>
          <Row>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="outline" loading>Loading</Button>
          </Row>
        </div>
      </Section>

      {/* ── BADGES ── */}
      <Section title="4 · Badge System">
        <Row>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="dark">Dark</Badge>
        </Row>
      </Section>

      {/* ── CARDS ── */}
      <Section title="5 · Card System">
        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Service Card</h3>
          <div className={styles.cardGrid}>
            <ServiceCard
              eyebrow="Strategy"
              title="Digital Transformation"
              description="End-to-end guidance from legacy modernisation to cloud-native architecture."
              href="#"
            />
            <ServiceCard
              eyebrow="Engineering"
              title="Product Development"
              description="Full-stack product engineering from MVP to production-grade platforms."
              href="#"
            />
            <ServiceCard
              eyebrow="Data"
              title="Analytics & Insights"
              description="Business intelligence, data pipelines, and ML-powered decision engines."
              href="#"
            />
          </div>
        </div>
        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Portfolio Card</h3>
          <div className={styles.cardGrid}>
            <PortfolioCard
              category="Enterprise SaaS"
              title="Supply Chain Intelligence Platform"
              description="Real-time tracking and predictive analytics for a Fortune 500 logistics provider."
              href="#"
            />
            <PortfolioCard
              category="FinTech"
              title="Digital Banking Dashboard"
              description="Unified financial operations console serving 2M+ retail customers."
              href="#"
            />
          </div>
        </div>
        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Product Card</h3>
          <div className={styles.cardGrid}>
            <ProductCard
              badge="New"
              title="AccetraaAI"
              description="AI-powered workflow automation for enterprise operations teams."
              features={['Natural language processing', 'No-code rule builder', 'Enterprise SSO']}
              href="#"
            />
            <ProductCard
              title="AccetraaFlow"
              description="Low-latency data pipeline orchestration with real-time monitoring."
              features={['Sub-10ms latency', 'Visual pipeline builder', 'Audit logging']}
              href="#"
            />
          </div>
        </div>
      </Section>

      {/* ── FORMS ── */}
      <Section title="6 · Form System">
        <div className={styles.formGrid}>
          <FormField label="Full Name" name="name" placeholder="Jane Doe" required />
          <FormField label="Email Address" name="email" type="email" placeholder="jane@company.com" required />
          <FormField
            label="Email (Error State)"
            name="email-error"
            type="email"
            value="invalid-email"
            onChange={() => {}}
            error="Please enter a valid email address."
          />
          <FormField
            label="Department"
            name="department"
            type="select"
            placeholder="Select department"
            options={[
              { value: 'engineering', label: 'Engineering' },
              { value: 'design', label: 'Design' },
              { value: 'product', label: 'Product' },
            ]}
          />
          <div className={styles.formFullWidth}>
            <FormField
              label="Message"
              name="message"
              type="textarea"
              placeholder="Describe your project requirements..."
              helperText="Minimum 50 characters for detailed enquiries."
              rows={5}
            />
          </div>
          <FormField label="Disabled Field" name="disabled" placeholder="Not editable" disabled />
        </div>
      </Section>

      {/* ── SKELETON & LOADER ── */}
      <Section title="7 · Skeleton &amp; Loader">
        <Row>
          <div style={{ width: 300 }}><SkeletonCard /></div>
          <div style={{ width: 300 }}><SkeletonCard /></div>
          <div style={{ width: 240 }}><SkeletonText lines={4} /></div>
        </Row>
        <div style={{ marginTop: 24 }}>
          <Loader />
        </div>
      </Section>

      {/* ── SECTION HEADER ── */}
      <Section title="8 · Section Header">
        <div className={styles.sectionHeaderDemo}>
          <SectionHeader
            eyebrow="Our Capabilities"
            title="Enterprise-grade solutions built to scale"
            subtitle="We help organizations accelerate digital transformation with modern engineering and design."
          />
        </div>
        <div className={styles.sectionHeaderDemoDark}>
          <SectionHeader
            eyebrow="Our Capabilities"
            title="Built for enterprise. Designed for people."
            subtitle="Combining deep technical expertise with human-centered design to deliver meaningful outcomes."
            theme="dark"
            align="center"
          />
        </div>
      </Section>

      {/* ── SHADOWS ── */}
      <Section title="9 · Shadows &amp; Elevation">
        <Row>
          {['xs', 'sm', 'md', 'lg', 'xl'].map((level) => (
            <div key={level} className={styles.shadowCard} data-level={level}>
              <span className={styles.shadowLabel}>shadow-{level}</span>
            </div>
          ))}
        </Row>
      </Section>

      {/* ── BORDER RADIUS ── */}
      <Section title="10 · Border Radius">
        <Row>
          {[
            { name: 'xs', px: '2px' },
            { name: 'sm', px: '4px' },
            { name: 'md', px: '8px' },
            { name: 'lg', px: '12px' },
            { name: 'xl', px: '16px' },
            { name: '2xl', px: '24px' },
            { name: 'full', px: '9999px' },
          ].map(({ name, px }) => (
            <div key={name} className={styles.radiusDemo} style={{ borderRadius: px }}>
              <span>{name}</span>
              <span>{px}</span>
            </div>
          ))}
        </Row>
      </Section>
    </main>
  </>
);

export default DesignSystem;
