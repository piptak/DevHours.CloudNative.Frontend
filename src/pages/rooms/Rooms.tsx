/* eslint-disable @typescript-eslint/no-unused-vars */

import TableContainer from '@material-ui/core/TableContainer';

import React, { useEffect, useState } from 'react';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import './Rooms.scss';
import { AccessTime, Add, Settings } from '@material-ui/icons';
import FloatingButton from '../../shared/components/floating-button/floating-button';
import RoomDialog from './components/room-dialog/RoomDialog';
import { Room } from '../../types/Room';
import { RoomDetails } from '../../types/RoomDetails';
import ErrorDialog from './../../shared/components/error-dialog/ErrorDialog';
import ApiError, { isApiError } from './../../types/ApiError';
import { Link } from 'react-router-dom';
import { useAddRoomMutation, useDeleteRoomMutation, useGetRoomsQuery, useUpdateRoomMutation } from '../../features/product-slice/api-slice/apiSlice';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const Rooms: React.FC = () => {
    const [pageSize, setPageSize] = useState(2);
    const [page, setPage] = useState(0);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [openAddNewRoomDialog, setOpenAddNewRoomDialog] = useState(false);
    const [openEditRoomDialog, setOpenEditRoomDialog] = useState(false);
    const [roomToEdit, setRoomToEdit] = useState<Room>(undefined);
    const [apiError, setApiError] = useState<ApiError>();
    const [isAnyQueryLoading, setIsAnyQueryLoading] = useState<boolean>();

    const {
        data: rooms = { values: [], totalCount: 0 },
        isLoading: isRoomsQueryLoading,
        isFetching,
        error: getRoomsError
    } = useGetRoomsQuery({ skip: pageSize * page, take: pageSize });

    const [
        addRoom,
        {
            isLoading: isAddNewRoomLoading,
            error: addNewRoomError
        }
    ] = useAddRoomMutation();

    const [
        updateRoom,
        {
            isLoading: isEditRoomLoading,
            error: editRoomError
        }
    ] = useUpdateRoomMutation();

    const [
        deleteRoom,
        {
            isLoading: isDeleteRoomLoading,
            error: deleteRoomError
        }
    ] = useDeleteRoomMutation();

    const handleSaveNewRoom = (newRoomDetails: RoomDetails) => {
        addRoom(newRoomDetails).then(() => setOpenAddNewRoomDialog(false));
    };

    const handleUpdateRoom = (roomDetails: RoomDetails) => {
        updateRoom({id: roomToEdit.id, ...roomDetails}).then(() => {
            setOpenEditRoomDialog(false);
        })
    }

    const handleDeleteRoom = (roomId: number) => {
        setPage(0);
        deleteRoom(roomId);
    }

    useEffect(() => {
        if (getRoomsError
            || addNewRoomError
            || editRoomError
            || deleteRoomError) {
            const error = getRoomsError ?? addNewRoomError ?? editRoomError ?? deleteRoomError;
            if (error) {
                if (isApiError(error)) {
                    setApiError(error);
                }
                else {
                    setApiError({ data: { message: undefined } });
                }
                setOpenErrorDialog(true);
                setOpenAddNewRoomDialog(false);
                setOpenEditRoomDialog(false);
            }
        }
    }, [getRoomsError, addNewRoomError, editRoomError, deleteRoomError,])


    useEffect(() => {
        const isLoading = isRoomsQueryLoading || isFetching || isDeleteRoomLoading;
        setIsAnyQueryLoading(isLoading);
    }, [
        isRoomsQueryLoading,
        isFetching,
        isDeleteRoomLoading,
    ]);

    const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); }
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => { setPageSize(parseInt(event.target.value)); }
    const handleCloseErrorDialogClicked = () => { setOpenErrorDialog(false) }
    const handleAddNewRoom = () => { setOpenAddNewRoomDialog(true); }
    const handleOnCancelNewRoomDialog = () => { setOpenAddNewRoomDialog(false); }

    const handleEditClicked = (room: Room) => {
        console.log(isEditRoomLoading);
        setRoomToEdit(room);
        setOpenEditRoomDialog(true);
    }
    const handleOnCancelEditRoom = () => {
        setRoomToEdit(undefined);
        setOpenEditRoomDialog(false);
    }


    return (
        <>
            {
                apiError ?
                    <ErrorDialog open={openErrorDialog} handleClose={handleCloseErrorDialogClicked} errorMessage={apiError.data.message} />
                    :
                    <>
                        {
                            isAnyQueryLoading ?
                                <LinearProgress style={{width: '100%'}}/>
                                :
                                <>
                                    <FloatingButton onClick={handleAddNewRoom} icon={Add} text="Add new room" />
                                    <RoomDialog
                                        open={openAddNewRoomDialog}
                                        onCancel={handleOnCancelNewRoomDialog}
                                        onSave={handleSaveNewRoom}
                                        isLoading={isAddNewRoomLoading}
                                        roomDitails={{ description: "Room description..." }}
                                        dialogTitle="Add new room"
                                    />
                                    <RoomDialog
                                        open={openEditRoomDialog}
                                        onCancel={handleOnCancelEditRoom}
                                        onSave={handleUpdateRoom}
                                        isLoading={isEditRoomLoading}
                                        roomDitails={{ ...roomToEdit }}
                                        dialogTitle="Edit room"
                                    />
                                    <Grid container
                                        direction="column"
                                        justifyContent="flex-start"
                                        className="rooms-table-container"
                                    >
                                        <Grid item>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <colgroup>
                                                        <col width="5%" />
                                                        <col width="80%" />
                                                        <col width="5%" />
                                                        <col width="5%" />
                                                        <col width="5%" />
                                                    </colgroup>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="rooms-table-cell">Id</TableCell>
                                                            <TableCell className="rooms-table-cell">Description</TableCell>
                                                            <TableCell className="rooms-table-cell" align="center">Bookings</TableCell>
                                                            <TableCell className="rooms-table-cell" align="center">Edit</TableCell>
                                                            <TableCell className="rooms-table-cell" align="center">Delete</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            rooms.values.map((room) => (
                                                                <TableRow key={room.id} className="romms-table-row">
                                                                    <TableCell>{room.id}</TableCell>
                                                                    <TableCell>{room.description}</TableCell>
                                                                    <TableCell align="center">
                                                                        <Link to={`rooms/${room.id}/reservations`}>
                                                                            <IconButton>
                                                                                <AccessTime />
                                                                            </IconButton>
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <IconButton onClick={() => handleEditClicked(room)}>
                                                                            <Settings />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <IconButton onClick={() => handleDeleteRoom(room.id)}>
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
                                        <Grid item>
                                            <Grid container justifyContent="flex-end">
                                                <Grid item>
                                                    <TablePagination
                                                        rowsPerPageOptions={[2, 3]}
                                                        component="div"
                                                        count={rooms.totalCount}
                                                        rowsPerPage={pageSize}
                                                        page={page}
                                                        onPageChange={handleChangePage}
                                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                        }
                    </>
            }
        </>
    );
}

export default Rooms;