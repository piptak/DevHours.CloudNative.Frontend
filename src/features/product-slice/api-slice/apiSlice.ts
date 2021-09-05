import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Booking } from '../../../types/Booking';
import { BookingDetails } from '../../../types/BookingDetails';
import { BookingsTable } from '../../../types/BookingsTable';
import { Room } from '../../../types/Room';
import { RoomDetails } from '../../../types/RoomDetails';
import RoomsTable from '../../../types/RoomsTable';

export const apiSlice = createApi({
    reducerPath: 'booking-api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:5001/api/'}),
    tagTypes: ['rooms', 'bookings'],
    endpoints: (build) => ({
        getRooms: build.query<RoomsTable, {skip: number, take: number}>({
            query: ({skip, take}) => ({
                url: `rooms?skip=${skip}&take=${take}`
            }),
            providesTags: [{type: 'rooms', id: 'LIST'}]
        }),
        addRoom: build.mutation<void, RoomDetails>({
            query: (body) => ({
                url: 'rooms',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'rooms', id: 'LIST'}]
        }),
        deleteRoom: build.mutation<void, number>({
            query: (roomId) => ({
                url: `rooms/${roomId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'rooms', id: 'LIST'}]
        }),
        updateRoom: build.mutation<void, Room>({
            query: (body) => ({
                url: `rooms/${body.id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: [{type: 'rooms', id: 'LIST'}]
        }),
        getBookings: build.query<BookingsTable, {roomId: number, skip: number, take: number}>({
            query: ({roomId, skip, take}) => ({
                url: `rooms/${roomId}/bookings?skip=${skip}&take=${take}`
            }),
            providesTags: [{type: 'bookings', id: 'LIST'}]
        }),
        addBooking: build.mutation<void, BookingDetails>({
            query: (body) => ({
                url: 'bookings',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'bookings', id: 'LIST'}]
        }),
        deleteBooking: build.mutation<void, number>({
            query: (bookingId) => ({
                url: `bookings/${bookingId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'bookings', id: 'LIST'}]
        }),
        updateBooking: build.mutation<void, Booking>({
            query: (body) => ({
                url: `bookings/${body.id}`,
                method: 'PUT',
                body
            })
        })
    })
});

export const { 
    useGetRoomsQuery,
    useAddRoomMutation,
    useDeleteRoomMutation,
    useUpdateRoomMutation,
    useGetBookingsQuery,
    useAddBookingMutation,
    useDeleteBookingMutation,
    useUpdateBookingMutation
} = apiSlice;