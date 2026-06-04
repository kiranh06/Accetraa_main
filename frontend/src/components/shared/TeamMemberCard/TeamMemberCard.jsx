import styles from './TeamMemberCard.module.scss';

const TeamMemberCard = ({ name, role, description, image, linkedIn }) => (
  <article className={styles.card}>
    <div className={styles.photoWrap} aria-hidden="true">
      {image
        ? <img src={image} alt={name} className={styles.photo} loading="lazy" />
        : <div className={styles.photoPlaceholder}>
            <span className={styles.initials}>{getInitials(name)}</span>
          </div>
      }
    </div>

    <div className={styles.body}>
      <h3 className={styles.name}>{name}</h3>
      <span className={styles.role}>{role}</span>
      {description && <p className={styles.description}>{description}</p>}
      {linkedIn && (
        <a
          href={linkedIn}
          className={styles.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      )}
    </div>
  </article>
);

const getInitials = (name = '') =>
  name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default TeamMemberCard;
