import baseAPI from '../baseApi';
import { Auth, Login} from './types'

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
    loginUser: build.mutation<Login, Partial<Login>>({
      query(body) {
        return {
          url: `/auth/users/login?appId=f655b265-91ac-4d2b-a742-b84275c5dfbb&redirectCode=false`,
          method: 'POST',
          body 
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
