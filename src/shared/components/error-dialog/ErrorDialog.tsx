import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React from 'react';

export interface IErrorDialogProps {
    open: boolean;
    handleClose: () => void;
    title?: string;
    errorMessage?: string;
}

const ErrorDialog: React.FC<IErrorDialogProps> = (props: IErrorDialogProps) => {
    const genericTitle = 'An error occured';
    const genericMessage = 'Please be advised that an error occured, contact with your system administrator.';
    return (
        <Dialog open={props.open} fullWidth={true}>
            <DialogTitle>
                {
                    props.title ?? genericTitle
                }
            </DialogTitle>
            <DialogContent>
                <Typography>
                {
                    props.errorMessage ?? genericMessage
                }
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorDialog;