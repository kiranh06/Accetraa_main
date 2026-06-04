import { useState } from 'react';
import styles from './FAQAccordion.module.scss';

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

const MinusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
);

// items: [{ question: string, answer: string }]
// allowMultiple: whether more than one item can be open at once
const FAQAccordion = ({ items = [], allowMultiple = false }) => {
  const [openSet, setOpenSet] = useState(new Set());

  const toggle = (index) => {
    setOpenSet(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={styles.accordion}>
      {items.map(({ question, answer }, index) => {
        const isOpen = openSet.has(index);
        const headingId = `faq-q-${index}`;
        const panelId   = `faq-a-${index}`;

        return (
          <div key={index} className={`${styles.item} ${isOpen ? styles['item--open'] : ''}`}>
            <button
              id={headingId}
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
            >
              <span className={styles.question}>{question}</span>
              <span className={styles.iconWrap} aria-hidden="true">
                {isOpen ? <MinusIcon /> : <PlusIcon />}
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={`${styles.panelWrap} ${isOpen ? styles['panelWrap--open'] : ''}`}
            >
              <div className={styles.panel}>
                <p className={styles.answer}>{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
