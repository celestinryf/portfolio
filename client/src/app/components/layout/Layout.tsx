import TopNavigation from './Topbar';
import Footer from './Footer';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}