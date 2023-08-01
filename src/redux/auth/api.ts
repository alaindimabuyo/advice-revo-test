import baseAPI from '../baseApi';
import type { Auth } from './types'

export const authenticationApi = baseAPI.injectEndpoints({
  endpoints: build => ({
    registerUser: build.mutation<Auth, Partial<Auth>>({
      query(body) {
        return {
          url: `/auth/users`,
          method: 'POST',
          body,
        }
      },
    }),
    loginUser: build.mutation<Auth, Partial<Auth>>({
      query(body) {
        return {
          url: `/auth/users/login`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
useLoginUserMutation,
useRegisterUserMutation
} = authenticationApi;
