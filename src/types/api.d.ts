/* eslint-disable @typescript-eslint/no-explicit-any */
interface RequestOptions {
  urlParams?: Record<string, string | number | undefined>;
  queryParams?: Record<string, string | string[] | number | number[] | undefined>;
  data?: Record<string, any | undefined>;
}
