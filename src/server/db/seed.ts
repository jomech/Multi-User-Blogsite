import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const main = async () => {
    console.log('Seeding database...');
    const client = postgres(process.env.DATABASE_URL!, { max: 1 });
    const db = drizzle(client, { schema });

    // Delete all existing data
    await db.delete(schema.postCategories);
    await db.delete(schema.posts);
    await db.delete(schema.categories);

    console.log('Cleared existing data.');

    // Insert new categories
    const insertedCategories = await db.insert(schema.categories).values([
        { name: 'Technology', description: 'Articles about modern tech.', slug: 'technology' },
        { name: 'Lifestyle', description: 'Posts about daily life.', slug: 'lifestyle' },
        { name: 'Tutorials', description: 'Helpful how-to guides.', slug: 'tutorials' },
    ]).returning();
    console.log('Inserted categories.');


    // Insert new posts
    const insertedPosts = await db.insert(schema.posts).values([
        { title: 'Getting Started with Drizzle ORM', content: 'Drizzle ORM is a modern TypeScript ORM...', slug: 'getting-started-with-drizzle-orm', published: true },
        { title: 'A Guide to Healthy Living', content: 'Living a healthy lifestyle involves...', slug: 'a-guide-to-healthy-living', published: true },
        { title: 'How to Set Up a Next.js Project', content: 'Next.js is a popular React framework...', slug: 'how-to-set-up-a-nextjs-project', published: false },
    ]).returning();
    console.log('Inserted posts.');

    // Assign categories to posts
    await db.insert(schema.postCategories).values([
        { postId: insertedPosts[0].id, categoryId: insertedCategories[0].id }, // Drizzle -> Technology
        { postId: insertedPosts[1].id, categoryId: insertedCategories[1].id }, // Healthy Living -> Lifestyle
        { postId: insertedPosts[2].id, categoryId: insertedCategories[0].id }, // Next.js -> Technology
        { postId: insertedPosts[2].id, categoryId: insertedCategories[2].id }, // Next.js -> Tutorials
    ]);
    console.log('Assigned categories to posts.');

    console.log('✅ Database seeded successfully!');
    
    // Close the connection
    await client.end();
};

main().catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
});

/*import { db } from './index';
import { posts, categories, postCategories } from './schema';

async function seed() {
  console.log('Seeding database...');

  // Create categories
  const [tech, lifestyle, tutorial] = await db.insert(categories).values([
    { name: 'Technology', slug: 'technology', description: 'Tech articles' },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Lifestyle posts' },
    { name: 'Tutorial', slug: 'tutorial', description: 'How-to guides' },
  ]).returning();

  // Create sample posts
  const [post1, post2] = await db.insert(posts).values([
    {
      title: 'Getting Started with Next.js 15',
      slug: 'getting-started-nextjs-15',
      content: '# Introduction\n\nNext.js 15 brings amazing new features...',
      published: true,
    },
    {
      title: '10 Tips for Better Code',
      slug: '10-tips-better-code',
      content: '# Code Quality Matters\n\nHere are my top 10 tips...',
      published: true,
    },
  ]).returning();

  // Link posts to categories
  await db.insert(postCategories).values([
    { postId: post1.id, categoryId: tech.id },
    { postId: post1.id, categoryId: tutorial.id },
    { postId: post2.id, categoryId: tech.id },
  ]);

  console.log('Seed completed!');
}

seed().catch(console.error).finally(() => process.exit());*/
