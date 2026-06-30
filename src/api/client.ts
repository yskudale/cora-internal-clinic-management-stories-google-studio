import ky from 'ky';
import { QueryClient } from '@tanstack/react-query';

const baseApiUrl = (import.meta.env.VITE_API_BASE_URL as string) || '/api';

export const apiClient = ky.create({
  prefix: baseApiUrl,
  credentials: 'include',
  hooks: {
    afterResponse: [
      async ({ request, response }) => {
        if (response.status === 401) {
          try {
            const url = new URL(request.url);
            // Avoid redirect loops on login endpoint
            if (url.pathname !== '/auth/login' && !url.pathname.endsWith('/auth/login')) {
              // Lazy import to avoid circular dependency
              const { authStore } = await import('../store/authStore');
              authStore.clearSession();

              const currentPath = window.location.pathname + window.location.search;
              window.location.href = `/login?returnTo=${encodeURIComponent(currentPath)}`;
            }
          } catch (e) {
            console.error('Failed to handle unauthorized session redirection:', e);
          }
        }
      },
    ],
  },
  retry: {
    limit: 3,
    statusCodes: [500, 502, 503, 504],
    methods: ['get', 'post', 'put', 'delete', 'patch'],
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // Handle custom status checking for react-query retries
        let status: number | undefined;
        if (error && typeof error === 'object') {
          const errObj = error as Record<string, unknown>;
          if ('response' in errObj && errObj.response instanceof Response) {
            status = errObj.response.status;
          } else if ('status' in errObj && (typeof errObj.status === 'number' || typeof errObj.status === 'string')) {
            status = Number(errObj.status);
          }
        }
        
        if (status !== undefined) {
          if (status >= 400 && status < 500) {
            return false; // 0 retries for 4xx
          }
          if (status >= 500) {
            return failureCount < 3; // up to 3 retries for 5xx
          }
        }
        
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
export type { QueryClient };
