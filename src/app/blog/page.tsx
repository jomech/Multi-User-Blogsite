'use client';

import { trpc } from '@/lib/trpc';
import { PostCard } from '@/components/blog/post-card';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

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
            value={selectedCategory?.toString()} 
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
          <p>Loading posts...</p>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts found</p>
        )}
      </div>
    </>
  );
}
