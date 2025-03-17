// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://storexbackend-production.up.railway.app/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `api/products`,
    }),
    getCategories: builder.query({
      query: () => `api/categories`,
    }),
    getOrder: builder.query({
      query: (id) => `api/orders/${id}`,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `api/orders`,
        method: "POST",
        body,
      }),
    }),
    getProduct: builder.query({
      query: (id) => `api/products/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
} = Api;

