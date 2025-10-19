'use client';

import { use } from 'react';
import { trpc } from '@/lib/client';
import { Navbar } from '@/components/layout/navbar';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: post, isLoading } = trpc.post.getBySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">Loading...</div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">Post not found</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">
            Published on {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
          </p>
          <div className="flex gap-2 flex-wrap">
            {post.postCategories.map((pc) => (
              <Badge key={pc.category.id}>
                {pc.category.name}
              </Badge>
            ))}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}