
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";


const baseAPI = createApi({
  reducerPath: "advice-revo-test",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.api.cfs.advicerevolution.com.au",
  }),
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
});

export default baseAPI;
