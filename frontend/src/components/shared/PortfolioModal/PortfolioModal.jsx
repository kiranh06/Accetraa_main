import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import useFocusTrap from '@/hooks/useFocusTrap';
import useScrollLock from '@/hooks/useScrollLock';
import { asString, toStringArray } from '@/utils/formatters';
import styles from './PortfolioModal.module.scss';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M7 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 2h4v4M14 2L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// item: portfolio object from API
// onClose: () => void
const PortfolioModal = ({ item, onClose }) => {
  const isOpen = Boolean(item);
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);

  useFocusTrap(containerRef, isOpen);
  useScrollLock(isOpen);

  // Save focus target and restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      // Move focus into dialog on next tick
      const timer = setTimeout(() => {
        const focusable = containerRef.current?.querySelector(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleEsc]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const title        = asString(item.title ?? item.name);
  const description  = asString(item.description ?? item.summary ?? item.overview ?? '');
  const category     = asString(item.category ?? item.industry ?? '');
  const client       = asString(item.client ?? item.client_name ?? '');
  const projectUrl   = item.url ?? item.project_url ?? item.live_url ?? null;
  const technologies = toStringArray(item.technologies ?? item.tech_stack ?? item.tags);
  const gallery      = Array.isArray(item.gallery) ? item.gallery
                     : Array.isArray(item.images)  ? item.images
                     : item.image                  ? [item.image]
                     : item.thumbnail              ? [item.thumbnail]
                     : [];

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={handleBackdrop}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        className={styles.modal}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerMeta}>
            {category && <span className={styles.category}>{category}</span>}
            {client && <span className={styles.client}>Client: {client}</span>}
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close project details"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className={styles.modalBody}>
          {/* Gallery */}
          {gallery.length > 0 && (
            <div className={styles.gallery}>
              {gallery.slice(0, 1).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${title} preview`}
                  className={styles.galleryImage}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {gallery.length === 0 && (
            <div className={styles.galleryPlaceholder} aria-hidden="true">
              <ProjectPlaceholderIcon />
            </div>
          )}

          {/* Content */}
          <div className={styles.content}>
            <h2 id="portfolio-modal-title" className={styles.title}>{title}</h2>

            {description && (
              <p className={styles.description}>{description}</p>
            )}

            {technologies.length > 0 && (
              <div className={styles.techSection}>
                <h3 className={styles.sectionLabel}>Technologies Used</h3>
                <div className={styles.techTags}>
                  {technologies.map(tech => (
                    <span key={tech} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                <LinkIcon />
                View live project
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ProjectPlaceholderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 20h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 32l5-5 4 4 4-5 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="26" r="2" fill="currentColor" opacity="0.4"/>
  </svg>
);

export default PortfolioModal;
