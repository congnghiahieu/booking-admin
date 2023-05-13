import { apiSlice } from './apiSlice';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { QUERY } from '../../../utils/constants';

const hotelsApdater = createEntityAdapter({
    sortComparer: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
});

const initialState = hotelsApdater.getInitialState();

export const hotelsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllHotels: builder.query({
            query: ({ page = QUERY.DEFAULT_PAGE, perPage = QUERY.DEFAULT_PER_PAGE, province }) =>
                `/v1/hotels?page=${page}&per_page=${perPage}&province=${province}`,
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
                const hotelList = hotelsApdater.setAll(initialState, modifiedData);

                return {
                    ...hotelList,
                    total: response.total,
                    totalPages: response.total_page,
                    curTotal: response.cur_total,
                };
            },
            providesTags: (result, error, arg) => {
                return [
                    { type: 'Hotel', id: 'LIST' },
                    ...result.ids.map(id => ({ type: 'Hotel', id })),
                ];
            },
        }),
        getHotelById: builder.query({
            query: hotelId => `/v1/hotels?hotel_id=${hotelId}`,
            keepUnusedDataFor: 0,
            transformResponse: response => {
                const modified = {
                    ...response,
                    id: response._id,
                };
                delete modified._id;
                return modified;
            },
            providesTags: (result, error, arg) => [{ type: 'Hotel', id: arg }],
        }),
        addHotel: builder.mutation({
            query: newHotelData => ({
                url: '/v1/hotels',
                method: 'POST',
                body: newHotelData,
            }),
            invalidatesTags: [{ type: 'Hotel', id: 'LIST' }],
        }),
        updateHotel: builder.mutation({
            query: hotelInfo => ({
                url: '/v1/hotels/update_info',
                method: 'PUT',
                body: {
                    ...hotelInfo,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Hotel', id: arg.id }],
        }),
        deleteHotel: builder.mutation({
            query: hotelId => ({
                url: `/v1/hotels`,
                method: 'DELETE',
                body: { id: hotelId },
            }),
            invalidatesTags: [{ type: 'Hotel', id: 'LIST' }],
        }),
        getHotelImgById: builder.query({
            query: hotelId => `/v1/hotels/images?hotel_id=${hotelId}`,
            providesTags: (result, error, arg) => {
                return [{ type: 'HotelImage', id: arg }];
            },
        }),
        addHotelImgById: builder.mutation({
            query: ({ hotelId, data }) => ({
                url: `/v1/hotels/images`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'HotelImage', id: arg.hotelId }],
        }),
        deleteHotelImgByImgId: builder.mutation({
            query: ({ hotelId, imageId }) => ({
                url: `/v1/hotels/images`,
                method: 'DELETE',
                body: { hotelId, imageId },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'HotelImage', id: arg.hotelId }],
        }),
        deleteAllHotelImg: builder.mutation({
            query: ({ hotelId, all }) => ({
                url: `/v1/hotels/images`,
                method: 'DELETE',
                body: {
                    hotelId,
                    all,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'HotelImage', id: arg.hotelId }],
        }),
    }),
});

export const {
    useGetAllHotelsQuery,
    useGetHotelByIdQuery,
    useAddHotelMutation,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
    useGetHotelImgByIdQuery,
    useAddHotelImgByIdMutation,
    useDeleteHotelImgByImgIdMutation,
    useDeleteAllHotelImgMutation,
} = hotelsApiSlice;
