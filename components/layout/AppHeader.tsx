'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface AppHeaderProps {
  variant?: 'marketing' | 'dashboard';
  children?: React.ReactNode;
  className?: string;
  showLogo?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  variant = 'marketing',
  children,
  className,
  showLogo = true,
}) => {
  const isMarketing = variant === 'marketing';
  
  return (
    <header
      className={cn(
        'shadow-lg',
        isMarketing ? 'bg-[#F5F1E8]' : 'bg-[#004E89] text-white',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-6 py-4 shadow-lg',
            isMarketing
              ? 'backdrop-blur-sm bg-white/30 border-2 border-[#d4c9b8]'
              : 'bg-transparent'
          )}
        >
          <div className="flex items-center gap-3">
            {showLogo && (
              <>
                <div className="relative">
                  {isMarketing && (
                    <div className="absolute inset-0 bg-[#004E89] blur-xl opacity-20 rounded-full"></div>
                  )}
                  <Image
                    src="/logo.png"
                    alt="Youspeak Logo"
                    width={50}
                    height={50}
                    priority
                    className={cn(
                      'relative',
                      isMarketing ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10 rounded-lg'
                    )}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <div>
                  <Link href="/">
                    <span
                      className={cn(
                        'text-2xl sm:text-3xl font-bold',
                        isMarketing ? 'text-black' : 'text-white'
                      )}
                    >
                      Youspeak
                    </span>
                  </Link>
                  {isMarketing && (
                    <p className="text-xs text-gray-700">Master English Today</p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex gap-3 items-center">{children}</div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
