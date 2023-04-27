import { apiSlice } from './apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { QUERY } from '../../../utils/constants';

const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: ({ page = QUERY.DEFAULT_PAGE, perPage = QUERY.DEFAULT_PER_PAGE }) =>
                `/v1/users?page=${page}&per_page=${perPage}`,
            transformResponse: response => {
                const modifiedData = response.data.map(dt => {
                    const modified = {
                        ...dt,
                        id: dt._id,
                    };
                    delete modified._id;
                    return modified;
                });

                // Normalizing data
                const userList = usersAdapter.setAll(initialState, modifiedData);

                return {
                    ...userList,
                    total: response.total,
                    totalPages: response.total_page,
                    curTotal: response.cur_total,
                };
            },
            providesTags: (result, error, arg) => {
                return [
                    { type: 'User', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'User', id })),
                ];
            },
        }),
        getUserById: builder.query({
            query: userId => `/v1/users?user_id=${userId}`,
            keepUnusedDataFor: 0,
            transformResponse: response => {
                const modified = {
                    ...response,
                    id: response._id,
                };
                delete modified._id;
                return modified;
            },
            providesTags: (result, error, arg) => [{ type: 'User', id: arg }],
        }),
        addUser: builder.mutation({
            query: newUser => ({
                url: '/v1/users',
                method: 'POST',
                body: {
                    ...newUser,
                },
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        updateUser: builder.mutation({
            query: userInfo => ({
                url: '/v1/users/update_info',
                method: 'PUT',
                body: {
                    ...userInfo,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/v1/users`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice;
