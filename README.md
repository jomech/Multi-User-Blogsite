This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, Clone the Repo and run npm install
create a .env file and setup environmental variables
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

Sync the Database Schema - npx drizzle-kit push

Seed the Database - npm run seed

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

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


