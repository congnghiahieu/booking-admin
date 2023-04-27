import { apiSlice } from './apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { QUERY } from '../../../utils/constants';

const servicesAdapter = createEntityAdapter({
    sortComparer: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
});

const initialState = servicesAdapter.getInitialState();

export const servicesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllSerivces: builder.query({
            query: ({ page = QUERY.DEFAULT_PAGE, perPage = QUERY.DEFAULT_PER_PAGE }) =>
                `/v1/services?page=${page}&per_page=${perPage}`,
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
                const serviceList = servicesAdapter.setAll(initialState, modifiedData);

                return {
                    ...serviceList,
                    total: response.total,
                    totalPages: response.total_page,
                    curTotal: response.cur_total,
                };
            },
            providesTags: (result, error, arg) => {
                return [
                    { type: 'Service', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'Service', id })),
                ];
            },
        }),
        getServiceById: builder.query({
            query: serviceId => `/v1/services?id=${serviceId}`,
            keepUnusedDataFor: 0,
            transformResponse: response => {
                const modified = {
                    ...response,
                    id: response._id,
                };
                delete modified._id;
                return modified;
            },
            providesTags: (result, error, arg) => [{ type: 'Service', id: arg }],
        }),
        getServiceByHotelId: builder.query({
            query: ({ hotelId, page = QUERY.DEFAULT_PAGE, perPage = QUERY.DEFAULT_PER_PAGE }) =>
                `/v1/services?hotel_id=${hotelId}&page=${page}&per_page=${perPage}`,
            keepUnusedDataFor: 0,
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
                const serviceList = servicesAdapter.setAll(initialState, modifiedData);

                return {
                    ...serviceList,
                    total: response.total,
                    totalPages: response.total_page,
                    curTotal: response.cur_total,
                };
            },
            providesTags: (result, error, arg) => {
                return [
                    { type: 'Service', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'Service', id })),
                ];
            },
        }),
        addService: builder.mutation({
            query: newServiceData => ({
                url: '/v1/services',
                method: 'POST',
                body: newServiceData,
            }),
            invalidatesTags: [{ type: 'Service', id: 'LIST' }],
        }),
        updateSerivce: builder.mutation({
            query: serviceInfo => ({
                url: '/v1/services/update_info',
                method: 'PUT',
                body: {
                    ...serviceInfo,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Service', id: arg.id }],
        }),
        deleteServiceById: builder.mutation({
            query: id => ({
                url: `/v1/services?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Service', id: 'LIST' }],
        }),
        deleteServiceByHotelId: builder.mutation({
            query: hotelId => ({
                url: `/v1/services?hotel_id=${hotelId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Service', id: 'LIST' }],
        }),
        getServiceImgById: builder.query({
            query: id => `/v1/services/images/${id}`,
            providesTags: (result, error, arg) => {
                return [{ type: 'ServiceImage', id: arg }];
            },
        }),
        addServiceImgById: builder.mutation({
            query: ({ id, data }) => ({
                url: `/v1/services/images/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'ServiceImage', id: arg.id }],
        }),
        deleteServiceImgByName: builder.mutation({
            query: ({ id, imageName }) => ({
                url: `/v1/services/images/${id}?image_name=${imageName}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'ServiceImage', id: arg.id }],
        }),
        deleteAllServiceImg: builder.mutation({
            query: ({ id }) => ({
                url: `/v1/services/images/${id}?image_name=all`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'ServiceImage', id: arg.id }],
        }),
    }),
});

export const {
    useGetAllSerivcesQuery,
    useGetServiceByIdQuery,
    useGetServiceByHotelIdQuery,
    useAddServiceMutation,
    useUpdateSerivceMutation,
    useDeleteServiceByIdMutation,
    useDeleteServiceByHotelIdMutation,
    useGetServiceImgByIdQuery,
    useAddServiceImgByIdMutation,
    useDeleteServiceImgByNameMutation,
    useDeleteAllServiceImgMutation,
} = servicesApiSlice;
