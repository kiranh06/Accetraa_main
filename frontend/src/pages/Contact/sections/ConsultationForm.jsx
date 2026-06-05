import { useState } from 'react';
import useForm from '@/hooks/useForm';
import { submitConsultation } from '@/services/forms';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';
import { config } from '@/config/env';
import styles from './ConsultationForm.module.scss';

// ─── Staging notice (replaces form when VITE_STAGING_MODE=true) ───────────────
const StagingNotice = () => (
  <div className={styles.stagingNotice}>
    <div className={styles.stagingIcon} aria-hidden="true"><StagingInfoIcon /></div>
    <h3 className={styles.stagingTitle}>Consultation booking temporarily unavailable</h3>
    <p className={styles.stagingBody}>
      This site is currently in internal review. To request a consultation, please email{' '}
      <a href="mailto:businessaccetraacompany@gmail.com" className={styles.stagingLink}>
        businessaccetraacompany@gmail.com
      </a>
      {' '}with the subject line <strong>"Consultation Request"</strong>.
      We will respond within one business day.
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

const SERVICE_OPTIONS = [
  { value: 'Software Development',    label: 'Software Development' },
  { value: 'AI & Data Solutions',     label: 'AI & Data Solutions' },
  { value: 'Mobile App Development',  label: 'Mobile App Development' },
  { value: 'Cloud Services',          label: 'Cloud Services' },
  { value: 'Cybersecurity',           label: 'Cybersecurity' },
  { value: 'Digital Transformation',  label: 'Digital Transformation' },
  { value: 'HR & Recruitment Services', label: 'HR & Recruitment Services' },
  { value: 'Startup Consulting',      label: 'Startup Consulting' },
  { value: 'General',                 label: 'General Enquiry' },
];

const validate = (v) => {
  const e = {};
  if (!v.full_name?.trim())              e.full_name        = 'Full name is required.';
  else if (v.full_name.trim().length < 2) e.full_name       = 'Please enter your full name.';
  if (!v.email?.trim())                  e.email            = 'Email address is required.';
  else if (!EMAIL_RE.test(v.email))      e.email            = 'Please enter a valid email address.';
  if (!v.phone?.trim())                  e.phone            = 'Phone number is required.';
  if (!v.company_name?.trim())           e.company_name     = 'Company name is required.';
  if (!v.service_interest)              e.service_interest = 'Please select a service of interest.';
  if (!v.message?.trim())               e.message          = 'Message is required.';
  else if (v.message.trim().length < 10) e.message          = 'Message must be at least 10 characters.';
  return e;
};

const INITIAL = {
  full_name: '', email: '', phone: '', company_name: '', service_interest: '', message: '',
};

const ConsultationFormFields = () => {
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
      await submitConsultation(vals);
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
        <h3 className={styles.successTitle}>Consultation request received</h3>
        <p className={styles.successBody}>
          Thank you for requesting a consultation. Our team will review your requirements and contact you within one business day to confirm your session.
        </p>
        <Button variant="outline" size="md" onClick={() => setSuccess(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Consultation request form">
      <div className={styles.formRow}>
        <FormField label="Full Name"    name="full_name"    value={values.full_name}    onChange={handleChange} error={fe('full_name')}    required placeholder="Jane Smith" />
        <FormField label="Email Address" name="email"       type="email" value={values.email} onChange={handleChange} error={fe('email')}    required placeholder="jane@company.com" />
      </div>
      <div className={styles.formRow}>
        <FormField label="Phone Number"  name="phone"       type="tel"   value={values.phone} onChange={handleChange} error={fe('phone')}    required placeholder="+91 98765 43210" />
        <FormField label="Company Name"  name="company_name"              value={values.company_name} onChange={handleChange} error={fe('company_name')} required placeholder="Acme Corporation" />
      </div>
      <FormField
        label="Service of Interest"
        name="service_interest"
        type="select"
        value={values.service_interest}
        onChange={handleChange}
        error={fe('service_interest')}
        required
        placeholder="Select a service…"
        options={SERVICE_OPTIONS}
      />
      <FormField label="Tell us about your goals" name="message" type="textarea" rows={5} value={values.message} onChange={handleChange} error={fe('message')} required placeholder="What business challenge are you trying to solve? What does success look like for this project?" />

      {serverError && (
        <div className={styles.serverError} role="alert">
          <p>{serverError}</p>
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" loading={submitting} disabled={submitting} fullWidth>
        {submitting ? 'Submitting…' : 'Request Consultation'}
      </Button>
    </form>
  );
};

const ConsultationForm = () => (
  <section className={styles.section} aria-label="Request a consultation" id="consultation">
    <div className="container">
      <div className={styles.layout}>

        <div className={styles.left}>
          <span className={styles.eyebrow}>Free Consultation</span>
          <h2 className={styles.title}>Book a consultation with our senior team</h2>
          <p className={styles.body}>
            Our consultation sessions are structured around your specific situation — not a generic sales presentation. We'll review your current-state, understand your goals, and outline a realistic path forward.
          </p>

          <ul className={styles.promiseList} aria-label="What you'll get">
            {[
              '60-minute session with a senior engineer',
              'Current-state assessment and gap analysis',
              'Recommended approach and rough roadmap',
              'No commitment required',
            ].map(item => (
              <li key={item} className={styles.promiseItem}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <ConsultationFormFields />
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

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{flexShrink: 0}}>
      <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.12"/>
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default ConsultationForm;
