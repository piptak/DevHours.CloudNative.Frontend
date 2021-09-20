/* eslint-disable @typescript-eslint/no-unused-vars */

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import React, { useEffect, useState } from 'react';
import Add from '@material-ui/icons/Add';
import Settings from '@material-ui/icons/Settings';
import ApiError, { isApiError } from '../../types/ApiError';
import ErrorDialog from '../../shared/components/error-dialog/ErrorDialog';
import { Booking } from '../../types/Booking';
import BookingDialog from './components/booking-dialog/BookingDialog';
import { BookingDetails } from '../../types/BookingDetails';
import FloatingButton from '../../shared/components/floating-button/floating-button';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './Bookings.scss'
import { 
    useAddBookingMutation,
    useDeleteBookingMutation,
    useGetBookingsQuery,
    useUpdateBookingMutation 
} from '../../features/product-slice/api-slice/apiSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const Bookings: React.FC = () => {
    const urlParams = useParams<{ id: string }>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(2);
    const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
    const [isAnyQueryLoadingOrFetching, setIsAnyQueryLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<ApiError>();
    const [openBookingDialog, setOpenBookingDialog] = useState<boolean>(false);
    const [bookingIdToEdit, setBookingIdToEdit] = useState<number>();
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        roomId: 0,
        startDate: moment(new Date()).toISOString(),
        endDate: moment(new Date()).toISOString()
    });
    const [dialogTitle, setDialogTitle] = useState<string>();
    const [roomId, setRoomId] = useState<number>(parseInt(urlParams.id, 10));

    useEffect(() => {
        if (urlParams.id) {
            setRoomId(parseInt(urlParams.id, 10));
        }
    }, [urlParams])

    const {
        data: bookings = { values: [], totalCount: 0 },
        isLoading: isBookingsQueryLoading,
        isFetching: isBookingsQueryFetching,
        error: bookingsQueryError  
    } = useGetBookingsQuery({ roomId: roomId, skip: pageSize * pageNumber, take: pageSize });

    const [
        deleteBooking,
        {
            isLoading: isDeleteBookingMutationLoading,
            error: errorDeleteBookingMutation
        }
    ] = useDeleteBookingMutation();

    const [
        addBooking,
        {
            isLoading: isAddBookingMutationLoading,
            error: addBookingMutationError
        }
    ] = useAddBookingMutation();

    const [
        updateBooking,
        {
            isLoading: isUpdateBookingMutationLoading,
            error: updateBookingMutationError
        }
    ] = useUpdateBookingMutation();

    const [
        deleteBooking,
        {
            isLoading: isDeleteBookingMutationLoading,
            error: errorDeleteBookingMutation
        }
    ] = useDeleteBookingMutation();

    useEffect(() => {
        const error = bookingsQueryError
            ?? errorDeleteBookingMutation
            ?? addBookingMutationError
            ?? updateBookingMutationError;

        if (error) {
            if (isApiError(error)) {
                setApiError(error);
            } else {
                setApiError({ data: { message: undefined } })
            }
        }

        setOpenErrorDialog(error !== undefined);
    }, [
        bookingsQueryError,
        errorDeleteBookingMutation,
        addBookingMutationError,
        updateBookingMutationError,
    ]);

    useEffect(() => {
        const isLoading = isBookingsQueryLoading
            || isBookingsQueryFetching
            || isDeleteBookingMutationLoading
            || isAddBookingMutationLoading
            || isUpdateBookingMutationLoading;
        setIsAnyQueryLoading(isLoading);
    }, [
        isBookingsQueryLoading,
        isBookingsQueryFetching,
        isDeleteBookingMutationLoading,
        isAddBookingMutationLoading,
        isUpdateBookingMutationLoading,
    ]);

    const handleCloseErrorDialog = () => {
        setOpenErrorDialog(false);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageNumber(newPage);
    }
    const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNumber(0);
    }

    const handleDeleteBooking = (bookingId: number) => {
        setPageNumber(0);
        deleteBooking(bookingId);
    }

    const handleCloseDialog = () => {
        setBookingIdToEdit(undefined);
        setOpenBookingDialog(false);
    }

    const handleSaveDialog = (data: BookingDetails) => {
        if (bookingIdToEdit) {            
            const toUpdate: Booking = {id: bookingIdToEdit, roomId: roomId, ...data};
            updateBooking(toUpdate)
            .then(() => {
                setOpenBookingDialog(false);
            })
            return;
        }
        const bookingToAdd: Booking = { id: 0, roomId: roomId, ...data };
        addBooking(bookingToAdd).then(() => {
            setOpenBookingDialog(false);
        });
        
    }

    const handleEditBooking = (booking: Booking) => {
        setDialogTitle('Edit booking');
        setBookingIdToEdit(booking.id);
        setBookingDetails({
            startDate: booking.startDate,
            endDate: booking.endDate,
            roomId: booking.roomId
        });
        setOpenBookingDialog(true);
    }

    const handleAddNewBooking = () => {
        setDialogTitle('Add new booking');
        setBookingIdToEdit(undefined);
        setBookingDetails({ roomId: 0, startDate: moment(new Date()).toISOString(), endDate: moment(new Date()).toISOString() });
        setOpenBookingDialog(true);
    }

    return (
        <>
            {
                <>
                    {
                        isAnyQueryLoadingOrFetching ?
                            <LinearProgress style={{ width: '100%' }} />
                            :
                            <>
                                <ErrorDialog open={openErrorDialog} handleClose={handleCloseErrorDialog} errorMessage={apiError?.data?.message} />
                                <FloatingButton onClick={handleAddNewBooking} icon={Add} text="Add new booking" />
                                <BookingDialog
                                    open={openBookingDialog}
                                    bookingDetails={bookingDetails}
                                    roomId={roomId}
                                    dialogTitle={dialogTitle}
                                    handleClose={handleCloseDialog}
                                    handleSave={handleSaveDialog}
                                    isLoading={isAddBookingMutationLoading || isUpdateBookingMutationLoading}
                                />
                                <Grid container
                                    direction="column"
                                    justifyContent="flex-start"
                                    className="bookings-table-container">
                                    <Grid item>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <colgroup>
                                                    <col width="10%" />
                                                    <col width="40%" />
                                                    <col width="40%" />
                                                    <col width="5%" />
                                                    <col width="5%" />
                                                </colgroup>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Room Number</TableCell>
                                                        <TableCell>Start Date</TableCell>
                                                        <TableCell>End Date</TableCell>
                                                        <TableCell align="center">Edit</TableCell>
                                                        <TableCell align="center">Remove</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        bookings.values.map((booking) => (
                                                            <TableRow key={booking.id}>
                                                                <TableCell>{booking.roomId}</TableCell>
                                                                <TableCell>{moment(booking.startDate).format("YYYY-MM-DD hh:mm")}</TableCell>
                                                                <TableCell>{moment(booking.endDate).format("YYYY-MM-DD hh:mm")}</TableCell>
                                                                <TableCell align="center">
                                                                    <IconButton onClick={() => handleEditBooking(booking)}>
                                                                        <Settings />
                                                                    </IconButton>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <IconButton onClick={() => handleDeleteBooking(booking.id)}>
                                                                        <RemoveCircleOutlineIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item container justifyContent="flex-end">
                                        <TablePagination
                                            rowsPerPageOptions={[2, 3]}
                                            component="div"
                                            count={bookings.totalCount}
                                            rowsPerPage={pageSize}
                                            page={pageNumber}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangePageSize}
                                        />
                                    </Grid>
                                </Grid>
                            </>
                    }
                </>
            }
        </>
    );

};

export default Bookings;