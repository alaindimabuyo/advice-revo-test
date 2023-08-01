import baseAPI from '../baseApi';
import type { People } from './types'

export const peopleApi = baseAPI.injectEndpoints({
  endpoints: build => ({
    createPeopleEntry: build.mutation<People, Partial<People>>({
      query(body) {
        return {
          url: `/api/v1/people`,
          method: 'POST',
          body,
        }
      },
    }),
    deletePeopleEntry: build.mutation<People, Partial<People>>({
      query(id) {
        return {
          url: `/api/v1/people/${id}`,
          method: 'DELETE',
        }
      },
    }),
    getPost: build.query<People, number>({
      query: () => ({ url: `api/v1/people` }),
    }),
  }),
  overrideExisting: false,
});

export const {
useGetPostQuery,
useDeletePeopleEntryMutation,
useCreatePeopleEntryMutation
} = peopleApi;
