import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DateTimePicker } from "@material-ui/pickers";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import moment from "moment";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BookingDetails } from "../../../../types/BookingDetails";

export interface IBookingDialogProps {
    open: boolean;
    bookingDetails: BookingDetails;
    dialogTitle: string;
    roomId: number;
    isLoading: boolean;
    handleClose: () => void;
    handleSave: (bookigDetails: BookingDetails) => void;
}

const BookingDialog: React.FC<IBookingDialogProps> = (props: IBookingDialogProps) => {
    const { handleSubmit, control, setValue } = useForm<BookingDetails>();

    useEffect(() => {
        setValue("startDate", props.bookingDetails.startDate);
        setValue("endDate", props.bookingDetails.endDate);        
    }, [props.bookingDetails, setValue]);

    const handleSubmitBookingDetails = (data: BookingDetails) => {
        data.startDate = moment(data.startDate).toISOString();
        data.endDate = moment(data.endDate).toISOString();
        props.handleSave(data);
    }

    return (
        <Dialog open={props.open}>
            {
                props.isLoading ? <LinearProgress/> : null
            }
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({ field: { ref, ...rest } }) => (
                                        <DateTimePicker
                                            disabled={props.isLoading}
                                            label="Start Date"
                                            inputRef={ref}
                                            {...rest}
                                            ampm={false}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Controller
                                    name="endDate"
                                    control={control}
                                    render={({ field: { ref, ...rest } }) => (
                                        <DateTimePicker
                                            disabled={props.isLoading}
                                            label="End Date"
                                            inputRef={ref}
                                            {...rest}
                                            ampm={false}
                                        />
                                    )}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(handleSubmitBookingDetails)} disabled={props.isLoading}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default BookingDialog;