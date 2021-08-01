import React, { useMemo, useState } from "react";

//styles
import './RoomsTable.scss'

//Maretiral UI
import { Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@material-ui/core";

//Types
import { RoomDto } from '../../types/Room';
import faker from "faker";

import moment from "moment";

const createFakeRooms = (): RoomDto[] => {
    const fakeRooms: RoomDto[] = [];

    for (let i = 0; i < 14; i++) {
        fakeRooms[i] = {
            id: i,
            description: faker.commerce.productDescription(),
            createdAt: faker.date.past()
        }
    }

    return fakeRooms;
}

const RoomsTable: React.FC = () => {
    const [rooms, setRooms] = useState<RoomDto[]>(createFakeRooms());
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <>
            <Paper className="paper">
                <Grid container alignContent="space-between" spacing={1} className="abc">
                    <Grid item xs={12}>
                        <TableContainer component={Paper} className="rooms-table-container">
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right" className="table-header-cell">Id</TableCell>
                                        <TableCell align="right" className="table-header-cell">Description</TableCell>
                                        <TableCell align="right" className="table-header-cell">Created at</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rooms.slice(page * pageSize, page * pageSize + pageSize).map((row: RoomDto) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="right">{row.id}</TableCell>
                                            <TableCell align="right">{row.description}</TableCell>
                                            <TableCell align="right">{moment(row.createdAt).format('DD-MM-YYYY hh:mm')}</TableCell>
                                        </TableRow>
                                    )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rooms.length}
                            rowsPerPage={pageSize}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangePageSize}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default RoomsTable