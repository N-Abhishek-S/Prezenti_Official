import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </>
  );
}
