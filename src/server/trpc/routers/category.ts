import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../../db';
import { categories } from '../../db/schema';
import { eq } from 'drizzle-orm';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const categoryRouter = router({
  // Get all categories
  getAll: publicProcedure.query(async () => {
    return await db.query.categories.findMany({
      with: {
        postCategories: {
          with: {
            post: true,
          },
        },
      },
    });
  }),

  // Create category
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required'),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const slug = generateSlug(input.name);

      const [newCategory] = await db
        .insert(categories)
        .values({
          name: input.name,
          description: input.description,
          slug,
        })
        .returning();

      return newCategory;
    }),

  // Update category
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      const [updatedCategory] = await db
        .update(categories)
        .set(updateData)
        .where(eq(categories.id, id))
        .returning();

      return updatedCategory;
    }),

  // Delete category
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(categories).where(eq(categories.id, input.id));
      return { success: true };
    }),
});
