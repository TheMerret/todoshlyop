import assert from 'assert';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

assert(
  process.env.NEXT_PUBLIC_API_BASE_URL,
  'env variable not set: NEXT_PUBLIC_API_BASE_URL'
);

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
}); // use your own URL here or environment variable

// add a second `options` argument here if you want to pass extra options to each generated query
export const axiosInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE<T>({
    ...config,
    ...options,
    headers: {
      ...options?.headers,
    },
    withCredentials: true,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error because
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
