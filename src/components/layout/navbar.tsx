'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          BlogPlatform
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/blog">
            <Button variant="ghost">Blog</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="default">Dashboard</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
