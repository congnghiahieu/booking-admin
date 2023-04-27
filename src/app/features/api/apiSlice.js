import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    refetchOnReconnect: true,
    tagTypes: [
        'Hotel',
        'HotelImage',
        'User',
        'Comment',
        'Transaction',
        'Book',
        'Service',
        'ServiceImage',
    ],
    endpoints: builder => ({}),
});
