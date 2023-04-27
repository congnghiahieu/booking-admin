import { apiSlice } from './apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { QUERY } from '../../../utils/constants';

const transAdapter = createEntityAdapter({
    sortComparer: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
});

const initialState = transAdapter.getInitialState();

export const transApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTrans: builder.query({
            query: ({ page = QUERY.DEFAULT_PAGE, perPage = QUERY.DEFAULT_PER_PAGE }) =>
                `/v1/trans?page=${page}&per_page=${perPage}`,
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
                const translist = transAdapter.setAll(initialState, modifiedData);
                return {
                    ...translist,
                    total: response.total,
                    totalPages: response.total_page,
                    curTotal: response.cur_total,
                };
            },
            providesTags: (result, error, arg) => {
                return [
                    { type: 'Transaction', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'Transaction', id })),
                ];
            },
        }),
        getTransByUserId: builder.query({
            query: ({ userId, page = QUERY.DEFAULT_PAGE, perPage = QUERY.DEFAULT_PER_PAGE }) =>
                `/v1/trans?user_id=${userId}&page=${page}&per_page=${perPage}`,
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
                const translist = transAdapter.setAll(initialState, modifiedData);
                return {
                    ...translist,
                    total: response.total,
                    totalPages: response.total_page,
                    curTotal: response.cur_total,
                };
            },
            providesTags: (result, error, arg) => {
                return [
                    { type: 'Transaction', id: arg },
                    ...result.ids.map(id => ({ type: 'Transaction', id })),
                ];
            },
        }),
        deleteTransById: builder.mutation({
            query: id => ({
                url: `/v1/trans?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Transaction', id: arg }],
        }),
        deleteTransByUserId: builder.mutation({
            query: userId => ({
                url: `/v1/trans?user_id=${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Transaction', id: arg }],
        }),
    }),
});

export const {
    useGetAllTransQuery,
    useGetTransByUserIdQuery,
    useDeleteTransByIdMutation,
    useDeleteTransByUserIdMutation,
} = transApiSlice;
