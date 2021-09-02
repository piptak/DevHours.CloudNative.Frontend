import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Booking } from './../../types/Booking';
import { BookingsTable } from './../../types/BookingsTable';
import { Room } from './../../types/Room';
import { RoomDetails } from './../../types/RoomDetails';
import RoomsTable from './../../types/RoomsTable'

export const bookingApiSlice = createApi({
    reducerPath: 'booking-api',
    tagTypes: ['rooms', 'bookings'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:5001/api/' }),
    endpoints: (build) => ({
        getRooms: build.query<RoomsTable, {skip: number, take: number}>({
            query: ({skip, take}) => ({
                url: `rooms?skip=${skip}&take=${take}`
            }),
            providesTags: [{ type: 'rooms', id: 'LIST' }]
        }),
        addRoom: build.mutation<void, RoomDetails>({
            query: (body) => ({
                url: 'rooms',
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: 'rooms', id: 'LIST'}]
        }),
        updateRoom: build.mutation<void, Room>({
            query: ({id, description}) => ({
                url: `rooms/${id}`,
                method: 'PUT',
                body: {id, description}
            }),
            invalidatesTags: [{type: 'rooms', id: 'LIST'}]
        }),
        deleteRoom: build.mutation<void, {id: number}>({
            query: ({id}) => ({
                url: `rooms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'rooms', id: 'LIST'}]
        }),
        getBookings: build.query<BookingsTable, { roomId: number, skip: number, take: number }>({
            query: ({roomId, skip, take}) => `rooms/${roomId}/bookings?skip=${skip}&take=${take}`,
            providesTags: [{ type: 'bookings', id: 'List' }]
        }),
        addBooking: build.mutation<void, Partial<Booking>>({
            query: (body) => ({
                url: 'bookings',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'bookings', id: 'List' }]
        }),
        updateBooking: build.mutation<void, Booking>({
            query: (body) => ({
                url: `bookings/${body.id}`,
                method: 'PUT',
                body   
            }),
            invalidatesTags: [{ type: 'bookings', id: 'List' }]
        }),
        deleteBooking: build.mutation<void, number>({
            query: (id: number) => ({
                url: `bookings/${id}`,
                method: 'DELETE',     
            }),
            invalidatesTags: [{ type: 'bookings', id: 'List' }]
        })
    })
});

export const {
    useGetRoomsQuery,
    useAddRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useGetBookingsQuery,
    useAddBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation
} = bookingApiSlice;