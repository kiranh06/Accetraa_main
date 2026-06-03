import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';

const PageWrapper = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // id="main-content" is the skip-nav anchor target from the Navbar skip link.
  // tabIndex={-1} allows programmatic focus without adding to natural tab order.
  return (
    <ErrorBoundary>
      <div id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        {children}
      </div>
    </ErrorBoundary>
  );
};

export default PageWrapper;
