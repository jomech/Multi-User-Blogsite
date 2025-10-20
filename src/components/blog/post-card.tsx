'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string | null;
    slug: string;
    createdAt: Date;
    published: boolean;
    postCategories: {
      category: {
        id: number;
        name: string;
        slug: string;
      };
    }[];
  };
}

export function PostCard({ post }: PostCardProps) {
  const excerpt = post.content
    ? post.content.substring(0, 150) + '...'
    : 'No content preview available.';

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardHeader>
        <CardTitle>
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-gray-500">
          {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
        </p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-700">{excerpt}</p>
      </CardContent>
      
      <CardFooter>
        <div className="flex gap-2 flex-wrap">
          {post.postCategories.map((pc) => (
            <Badge key={pc.category.id} variant="secondary">
              {pc.category.name}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

