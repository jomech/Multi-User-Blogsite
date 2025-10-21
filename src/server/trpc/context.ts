import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

// REMOVED: The unused 'opts' parameter from the function definition
export async function createContext(_opts?: FetchCreateContextFnOptions) {
  return {
    // Add context properties here if needed (e.g., session, user)
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
