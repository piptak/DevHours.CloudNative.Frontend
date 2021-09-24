import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useRef, useState } from "react";
import './floating-button.scss'

export interface IFloatingButtonProps {
    onClick: () => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any,
    text: string
}

const FloatingButton: React.FC<IFloatingButtonProps> = (props) => {
    const elementRef = useRef<HTMLDivElement>();
    const [right, setRight] = useState<number>(3000);
    const buttonPaddingOffset = 8;

    useEffect(() => {
        if (elementRef.current) {
            setRight(elementRef.current.offsetWidth + buttonPaddingOffset);
        }
    }, [elementRef, right]);

    return (
        <Button 
        onClick={props.onClick}
        className="floating-button"
        style={
                {right: `${right * -1}px`}
            }>
            <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
                <Grid item>
                    <props.icon/>
                </Grid>
                <Grid item ref={elementRef}>
                    <Typography>{props.text}</Typography>
                </Grid>
            </Grid>
        </Button>
    )
}

export default FloatingButton;