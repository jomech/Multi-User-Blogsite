'use client';

import { useState } from 'react';
import { trpc } from '@/lib/client';
import { PostCard } from '@/components/blog/post-card';
import { Navbar } from '@/components/layout/navbar';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  // This hook fetches only PUBLISHED posts for the public page
  const { data: posts, isLoading: postsLoading } = trpc.post.getAll.useQuery({
    published: true,
    categoryId: selectedCategory,
  });

  const { data: categories } = trpc.category.getAll.useQuery();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          
          {/* Category Filter */}
          <Select 
            value={selectedCategory?.toString() ?? 'all'} 
            onValueChange={(value) => setSelectedCategory(value === 'all' ? undefined : Number(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {postsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-16">No posts found for this category.</p>
        )}
      </div>
    </>
  );
}
