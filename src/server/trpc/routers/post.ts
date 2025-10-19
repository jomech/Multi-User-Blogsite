import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../../db';
import { posts, categories, postCategories } from '../../db/schema';
import { eq, desc, sql, ilike } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    + '-' + Date.now();
}

export const postRouter = router({
  // Get all posts with categories
  getAll: publicProcedure
    .input(
      z.object({
        published: z.boolean().optional(),
        categoryId: z.number().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const allPosts = await db.query.posts.findMany({
        where: input?.published !== undefined 
          ? eq(posts.published, input.published)
          : undefined,
        orderBy: [desc(posts.createdAt)],
        with: {
          postCategories: {
            with: {
              category: true,
            },
          },
        },
      });

      // Filter by category if specified
      if (input?.categoryId) {
        return allPosts.filter(post => 
          post.postCategories.some(pc => pc.category.id === input.categoryId)
        );
      }

      return allPosts;
    }),

  // Get single post by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await db.query.posts.findFirst({
        where: eq(posts.slug, input.slug),
        with: {
          postCategories: {
            with: {
              category: true,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      return post;
    }),

  // Create new post
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, 'Title is required'),
        content: z.string().min(1, 'Content is required'),
        published: z.boolean().default(false),
        categoryIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const slug = generateSlug(input.title);

      // Create post
      const [newPost] = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          slug,
          published: input.published,
        })
        .returning();

      // Add categories if provided
      if (input.categoryIds && input.categoryIds.length > 0) {
        await db.insert(postCategories).values(
          input.categoryIds.map(categoryId => ({
            postId: newPost.id,
            categoryId,
          }))
        );
      }

      return newPost;
    }),

  // Update post
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        published: z.boolean().optional(),
        categoryIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, categoryIds, ...updateData } = input;

      // Update post
      const [updatedPost] = await db
        .update(posts)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, id))
        .returning();

      // Update categories if provided
      if (categoryIds !== undefined) {
        // Remove existing categories
        await db.delete(postCategories).where(eq(postCategories.postId, id));

        // Add new categories
        if (categoryIds.length > 0) {
          await db.insert(postCategories).values(
            categoryIds.map(categoryId => ({
              postId: id,
              categoryId,
            }))
          );
        }
      }

      return updatedPost;
    }),

  // Delete post
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(posts).where(eq(posts.id, input.id));
      return { success: true };
    }),
});