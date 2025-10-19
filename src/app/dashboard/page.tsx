'use client';

import { useState } from 'react';
import { trpc } from '@/lib/client';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MarkdownEditor } from '@/components/editor/markdown-editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEditorStore } from '@/store/useEditorStore';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const utils = trpc.useUtils();
  
  const { 
    content, title, selectedCategories, isPublished,
    setContent, setTitle, setSelectedCategories, setIsPublished, reset 
  } = useEditorStore();

  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const { data: posts } = trpc.post.getAll.useQuery({ published: undefined });
  const { data: categories } = trpc.category.getAll.useQuery();

  const createPost = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
      reset();
      alert('Post created successfully!');
    },
  });

  const updatePost = trpc.post.update.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
      setEditingPostId(null);
      reset();
      alert('Post updated successfully!');
    },
  });

  const deletePost = trpc.post.delete.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPostId) {
      updatePost.mutate({
        id: editingPostId,
        title,
        content,
        published: isPublished,
        categoryIds: selectedCategories,
      });
    } else {
      createPost.mutate({
        title,
        content,
        published: isPublished,
        categoryIds: selectedCategories,
      });
    }
  };

  const handleEdit = (post: any) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setIsPublished(post.published);
    setSelectedCategories(post.postCategories.map((pc: any) => pc.category.id));
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost.mutate({ id });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingPostId ? 'Edit Post' : 'Create New Post'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  <div>
                    <Label>Categories</Label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {categories?.map((cat) => (
                        <div key={cat.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cat-${cat.id}`}
                            checked={selectedCategories.includes(cat.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, cat.id]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(id => id !== cat.id)
                                );
                              }
                            }}
                          />
                          <label htmlFor={`cat-${cat.id}`}>{cat.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <MarkdownEditor value={content} onChange={setContent} />

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={isPublished}
                      onCheckedChange={(checked) => setIsPublished(checked as boolean)}
                    />
                    <label htmlFor="published">Publish immediately</label>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit">
                      {editingPostId ? 'Update Post' : 'Create Post'}
                    </Button>
                    {editingPostId && (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setEditingPostId(null);
                          reset();
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Posts List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {posts?.map((post) => (
                  <div 
                    key={post.id} 
                    className="p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <h3 className="font-semibold mb-2">{post.title}</h3>
                    <div className="flex gap-2 mb-2">
                      {post.postCategories.map((pc) => (
                        <Badge key={pc.category.id} variant="secondary" className="text-xs">
                          {pc.category.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
