This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, Clone the Repo and run npm install
create a .env file and setup environmental variables
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
Sync the Database Schema - npx drizzle-kit push
Seed the Database - npm run seed
run the development server: npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Tech Stack

This project leverages a modern, type-safe stack to ensure a robust and maintainable codebase:
Framework: Next.js 15 (with App Router)
Styling: Tailwind CSS with shadcn/ui
API Layer: tRPC
Database: PostgreSQL (hosted on Neon)
ORM: Drizzle ORM
Validation: Zod
Language: TypeScript
State Management: Zustand (for client-side state) & TanStack Query (via tRPC for server state)
Content: Markdown with react-markdown

Features Implemented

Blog post CRUD operations (create, read, update, delete)
● Category CRUD operations
● Assign one or more categories to posts
● Blog listing page showing all posts
● Individual post view page
● Category filtering on listing page

Time spent - 5 hours

Architecture
src/app/ (The Frontend - Routing and Pages)
This directory controls what users see. The folder names define the URL paths.

src/app/page.tsx: Your landing/home page.

src/app/blog/page.tsx: The Public Blog Listing. This page fetches and displays a list of all published posts for visitors to see.

src/app/blog/[slug]/page.tsx: The Single Post Page. This dynamic page uses the slug from the URL to fetch and display the content of one specific post.

src/app/dashboard/page.tsx: The Management Dashboard. This is the main control panel where a user can see all their posts (drafts and published) and create new ones.

src/app/layout.tsx: The main template for your entire application. It includes the basic HTML structure, fonts, and, most importantly, the TRPCProvider.

src/server/ (The Backend - API Logic and Database)
This is where all your server-side logic lives. The code here never runs in the user's browser.

src/server/db/schema.ts: The Database Blueprint. This is one of the most important files. It uses Drizzle to define the structure of your database tables (posts, categories, postCategories), their columns, and their relationships (many-to-many).

src/server/db/index.ts: Creates and exports the main database client that the rest of your backend uses to connect to PostgreSQL.

src/server/trpc/routers/post.ts: The Post API Logic. Contains all the backend procedures for posts: getAll, getBySlug, create, update, and delete. This is where you use Drizzle to interact with the database.

src/server/trpc/routers/_app.ts: The main tRPC router. It combines your postRouter and categoryRouter into a single, unified API.

src/components/ (Reusable UI Pieces)
src/components/providers/trpc-provider.tsx: A crucial "wrapper" component. It provides the tRPC client to all other components in your app, allowing them to make API calls. It's set up once in your main layout.tsx.

src/components/blog/post-card.tsx: A reusable component that displays a single post in a card format on your main blog page.

src/components/editor/markdown-editor.tsx: The component that provides the text area for writing Markdown content.


