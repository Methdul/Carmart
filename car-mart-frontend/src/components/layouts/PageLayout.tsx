// src/components/layouts/PageLayout.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
  fluid?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  showFooter = true,
  fluid = false
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className={cn(
        "flex-1",
        !fluid && "container mx-auto px-4",
        className
      )}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};