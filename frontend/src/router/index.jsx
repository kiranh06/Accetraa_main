import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageWrapper from '@/components/layout/PageWrapper';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/utils/constants';

const Home      = lazy(() => import('@/pages/Home'));
const About     = lazy(() => import('@/pages/About'));
const Services  = lazy(() => import('@/pages/Services'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Contact   = lazy(() => import('@/pages/Contact'));
const Careers      = lazy(() => import('@/pages/Careers'));
const NotFound     = lazy(() => import('@/pages/NotFound'));
const DesignSystem = lazy(() => import('@/pages/DesignSystem'));

const MainLayout = () => (
  <>
    <Navbar />
    <Suspense fallback={<Loader fullPage />}>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </Suspense>
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME,      element: <Home /> },
      { path: ROUTES.ABOUT,     element: <About /> },
      { path: ROUTES.SERVICES,  element: <Services /> },
      { path: ROUTES.PORTFOLIO, element: <Portfolio /> },
      { path: ROUTES.CONTACT,   element: <Contact /> },
      { path: ROUTES.CAREERS,   element: <Careers /> },
      { path: '/_design',       element: <DesignSystem /> },
      { path: '*',              element: <NotFound /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
