// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
const baseAPI = createApi({
  reducerPath: "advice-revo-test",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.api.cfs.advicerevolution.com.au",
  }),
  endpoints: (build) => ({}),
});

export default baseAPI;
