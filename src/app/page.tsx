import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to BlogPlatform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern blogging platform built with Next.js, tRPC, and PostgreSQL.
            Create, manage, and share your stories with the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/blog">
              <Button size="lg">Explore Posts</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">Start Writing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold mb-2">Markdown Support</h3>
              <p className="text-gray-600">
                Write your posts in Markdown with live preview
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold mb-2">Category Management</h3>
              <p className="text-gray-600">
                Organize posts with flexible category system
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Type-Safe API</h3>
              <p className="text-gray-600">
                Built with tRPC for end-to-end type safety
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 BlogPlatform. Built with Next.js and tRPC.</p>
        </div>
      </footer>
    </>
  );
}
