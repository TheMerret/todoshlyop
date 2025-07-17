'use client';

import { AuthResponse } from '@/queries/api.schemas';
import { updateTokenAuthUpdateTokenPost } from '@/queries/auth/auth';
import { queryKeys } from '@/queries/keys';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FC, ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export const QueryProvider: FC<Props> = function ({ children }) {
  const router = useRouter();
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30000, // 30 seconds
          retry: (failureCount, error) => {
            // Don't retry for certain error responses
            if (
              isAxiosError(error) &&
              (error?.response?.status === 400 ||
                error?.response?.status === 401)
            ) {
              return false;
            }

            // Retry others just once
            return failureCount <= 1;
          },
        },
      },
      queryCache: new QueryCache({
        onError(error) {
          if (isAxiosError(error)) {
            if (error.response?.status == 401) {
              console.log('test');
              updateTokenAuthUpdateTokenPost()
                .then((data) => {
                  client.invalidateQueries({
                    queryKey: queryKeys.users.whoami().queryKey
                  })
                  client.setQueryData<AuthResponse>(
                    queryKeys.users.whoami().queryKey,
                    data
                  );
                })
                .catch(() => {
                  router.push('/login');
                });
            }
          }
        },
      }),
    })
  );
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};
