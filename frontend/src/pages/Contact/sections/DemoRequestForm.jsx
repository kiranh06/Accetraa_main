import { useState } from 'react';
import useForm from '@/hooks/useForm';
import { submitDemo } from '@/services/forms';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import { config } from '@/config/env';
import styles from './DemoRequestForm.module.scss';

// ─── Staging notice (replaces form when VITE_STAGING_MODE=true) ───────────────
const StagingNotice = () => (
  <div className={styles.stagingNotice}>
    <div className={styles.stagingIcon} aria-hidden="true"><StagingInfoIcon /></div>
    <h3 className={styles.stagingTitle}>Demo booking temporarily unavailable</h3>
    <p className={styles.stagingBody}>
      This site is currently in internal review. To request a product demo, please email{' '}
      <a href="mailto:businessaccetraacompany@gmail.com" className={styles.stagingLink}>
        businessaccetraacompany@gmail.com
      </a>
      {' '}with the subject line <strong>"Demo Request"</strong>.
      We will get back to you within one business day.
    </p>
  </div>
);

function StagingInfoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M14 12v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="14" cy="8.5" r="1.25" fill="currentColor"/>
    </svg>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PRODUCT_OPTIONS = [
  { value: 'UrSaloon', label: 'UrSaloon — Salon & Spa Management Platform' },
  { value: 'HRMS',     label: 'HRMS — Human Resource Management System' },
];

const COMPANY_SIZE_OPTIONS = [
  { value: '1-10',     label: '1–10 employees' },
  { value: '11-50',    label: '11–50 employees' },
  { value: '51-200',   label: '51–200 employees' },
  { value: '201-500',  label: '201–500 employees' },
  { value: '501-1000', label: '501–1,000 employees' },
  { value: '1000+',    label: '1,000+ employees' },
];

const validate = (v) => {
  const e = {};
  if (!v.full_name?.trim())              e.full_name       = 'Full name is required.';
  else if (v.full_name.trim().length < 2) e.full_name      = 'Please enter your full name.';
  if (!v.email?.trim())                  e.email           = 'Email address is required.';
  else if (!EMAIL_RE.test(v.email))      e.email           = 'Please enter a valid email address.';
  if (!v.phone?.trim())                  e.phone           = 'Phone number is required.';
  if (!v.company_name?.trim())           e.company_name    = 'Company name is required.';
  if (!v.product_interest)              e.product_interest = 'Please select a product for the demo.';
  if (!v.message?.trim())               e.message         = 'Message is required.';
  else if (v.message.trim().length < 10) e.message         = 'Message must be at least 10 characters.';
  return e;
};

const INITIAL = {
  full_name: '', email: '', phone: '', company_name: '',
  job_title: '', product_interest: '', company_size: '', message: '',
};

const DemoFormFields = () => {
  if (config.stagingMode) return <StagingNotice />;

  const { values, errors, submitting, handleChange, handleSubmit, reset } = useForm(INITIAL, validate);
  const [serverFieldErrors, setServerFieldErrors] = useState({});
  const [serverError, setServerError]             = useState('');
  const [success, setSuccess]                     = useState(false);

  const fe = (name) => errors[name] || serverFieldErrors[name] || '';

  const onSubmit = async (vals) => {
    setServerError('');
    setServerFieldErrors({});
    try {
      await submitDemo(vals);
      setSuccess(true);
      reset();
    } catch (err) {
      if (err.fieldErrors) {
        const mapped = {};
        Object.entries(err.fieldErrors).forEach(([k, msgs]) => {
          mapped[k] = Array.isArray(msgs) ? msgs[0] : String(msgs);
        });
        setServerFieldErrors(mapped);
      } else {
        setServerError(err.message || 'Something went wrong. Please try again.');
      }
    }
  };

  if (success) {
    return (
      <div className={styles.successBox} role="status">
        <div className={styles.successIcon} aria-hidden="true"><SuccessIcon /></div>
        <h3 className={styles.successTitle}>Demo request submitted</h3>
        <p className={styles.successBody}>
          We've received your demo request. Our team will contact you within one business day to schedule a personalised demonstration.
        </p>
        <Button variant="outline" size="md" onClick={() => setSuccess(false)}>
          Request another demo
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Demo request form">
      <div className={styles.formRow}>
        <FormField label="Full Name"    name="full_name"    value={values.full_name}    onChange={handleChange} error={fe('full_name')}    required placeholder="Jane Smith" />
        <FormField label="Job Title"    name="job_title"    value={values.job_title}    onChange={handleChange} error={fe('job_title')}    placeholder="Head of Operations" />
      </div>
      <div className={styles.formRow}>
        <FormField label="Email Address" name="email"       type="email" value={values.email} onChange={handleChange} error={fe('email')}  required placeholder="jane@company.com" />
        <FormField label="Phone Number"  name="phone"       type="tel"   value={values.phone} onChange={handleChange} error={fe('phone')}  required placeholder="+91 98765 43210" />
      </div>
      <div className={styles.formRow}>
        <FormField label="Company Name"  name="company_name"              value={values.company_name}  onChange={handleChange} error={fe('company_name')}  required placeholder="Acme Corporation" />
        <FormField
          label="Company Size"
          name="company_size"
          type="select"
          value={values.company_size}
          onChange={handleChange}
          error={fe('company_size')}
          placeholder="Select company size…"
          options={COMPANY_SIZE_OPTIONS}
        />
      </div>
      <FormField
        label="Product of Interest"
        name="product_interest"
        type="select"
        value={values.product_interest}
        onChange={handleChange}
        error={fe('product_interest')}
        required
        placeholder="Select a product…"
        options={PRODUCT_OPTIONS}
      />
      <FormField label="What would you like to see in the demo?" name="message" type="textarea" rows={4} value={values.message} onChange={handleChange} error={fe('message')} required placeholder="Describe your use case, key workflows you'd like to explore, or specific features you're evaluating…" />

      {serverError && (
        <div className={styles.serverError} role="alert">
          <p>{serverError}</p>
        </div>
      )}

      <Button type="submit" variant="accent" size="lg" loading={submitting} disabled={submitting} fullWidth>
        {submitting ? 'Submitting…' : 'Request Demo'}
      </Button>
    </form>
  );
};

const DemoRequestForm = () => (
  <section className={styles.section} aria-label="Request a product demo" id="demo-request">
    <div className="container">
      <div className={styles.layout}>

        <div className={styles.left}>
          <span className={styles.eyebrow}>Product Demo</span>
          <h2 className={styles.title}>See our products in action</h2>
          <p className={styles.body}>
            We offer personalised product demonstrations tailored to your industry and role. No one-size-fits-all recordings — your demo is scoped to the workflows that matter most to your team.
          </p>

          <div className={styles.productList}>
            {PRODUCT_OPTIONS.map(({ label }) => (
              <div key={label} className={styles.productBadge}>
                <ProductIcon />
                <span>{label.split(' — ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <DemoFormFields />
        </div>
      </div>
    </div>
  </section>
);

function SuccessIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 20l6 6 10-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProductIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25"/>
      <path d="M4 7h6M7 4v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  );
}

export default DemoRequestForm;
