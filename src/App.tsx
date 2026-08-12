import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from './seo/Analytics';
import { Clarity } from './seo/Clarity';
import { ConsentBanner } from './components/consent/ConsentBanner';

export default function App() {
  return (
    <HelmetProvider>
      <Analytics router={router} />
      <Clarity router={router} />
      <RouterProvider router={router} />
      <ConsentBanner />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </HelmetProvider>
  );
}
