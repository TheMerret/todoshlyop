import { useQueryClient } from "@tanstack/react-query";
import { AuthResponse } from "../api.schemas";
import { queryKeys } from "../keys";
import { AxiosRequestConfig } from "axios";

export function withAuthToken<T extends (...args: any[]) => any>(func: T) {
    return function useAuth(...args: Parameters<T>): ReturnType<T> {
      const queryClient = useQueryClient();
  
      // Get the auth data (token)
      const authData = queryClient.getQueryData<AuthResponse>(
        queryKeys.users.whoami().queryKey
      );
  
      // Add Authorization header if auth data exists
      const options: AxiosRequestConfig = authData
        ? {
            headers: {
              Authorization: `Bearer ${authData.access_token}`,
            },
          }
        : {};
  
      // Call the wrapped function with the options appended as the last argument
      return func(...args, options);
    };
  }
  