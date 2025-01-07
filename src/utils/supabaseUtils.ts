import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

export async function executeWithRetry<T>(
  operation: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  retryCount = 0
): Promise<{ data: T | null; error: PostgrestError | null }> {
  try {
    const result = await operation();

    if (result.error?.message?.includes('deadlock detected')) {
      if (retryCount < MAX_RETRIES) {
        const delay = BASE_DELAY * Math.pow(2, retryCount) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return executeWithRetry(operation, retryCount + 1);
      }
    }

    return result;
  } catch (error) {
    return { data: null, error: error as PostgrestError };
  }
}

// Example usage:
export async function safeQuery<T>(table: string, query: any) {
  return executeWithRetry(() => query);
}