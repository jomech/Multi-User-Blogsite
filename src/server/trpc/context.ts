import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createContext(opts?: FetchCreateContextFnOptions) {
  return {
    // Add context properties here if needed (e.g., session, user)
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
