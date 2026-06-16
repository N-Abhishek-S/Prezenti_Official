import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

import { FloatingSocialBar } from '../FloatingSocialBar';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col relative">
      <Navbar />
      <FloatingSocialBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
