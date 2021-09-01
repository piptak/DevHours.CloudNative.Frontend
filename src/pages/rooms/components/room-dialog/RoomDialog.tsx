import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RoomDetails } from '../../../../types/RoomDetails';

export interface IRoomDetailsProps {
    open: boolean;
    dialogTitle: string;
    roomDitails: RoomDetails;
    isLoading: boolean;
    onCancel: () => void;
    onSave: (data: RoomDetails) => void;

}

const RoomDialog: React.FC<IRoomDetailsProps> = (props: IRoomDetailsProps) => {
    const {handleSubmit, control, setValue} = useForm<RoomDetails>();
    const handleSubmitRoomDetails = (data: RoomDetails) => {
        props.onSave(data);
    }

    useEffect(() => {
        setValue("description", props.roomDitails.description);
    }, [props.roomDitails, setValue]);

    return (
        <>
            <Dialog open={props.open} fullWidth={true}>
                {
                    props.isLoading ? <LinearProgress/> : null
                }
                <DialogTitle>
                    {props.dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <Controller
                        name="description"
                        control={control}
                        render={({field: {ref, ...rest}}) => (
                            <TextField
                                inputRef={ref}
                                fullWidth={true}
                                minRows={5}
                                label="Description"
                                variant="outlined"
                                {...rest}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onCancel}>Cancel</Button>
                    <Button onClick={handleSubmit(handleSubmitRoomDetails)}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RoomDialog;