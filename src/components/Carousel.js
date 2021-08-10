import { React, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { MobileStepper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    carousel: {
        position: 'relative',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        marginTop: 20
    }
}))



const Carousel = ({ listImg }) => {
    const [currentData, setCurrentData] = useState(0);
    const classes = useStyles();
    const previousImg = () => {
        setCurrentData((prev) => {
            const newState = prev === 0 ? prev : prev - 1;
            return newState;
        });
    }

    const nextImg = () => {
        setCurrentData((prev) => {
            const newState = prev === listImg.length - 1 ? prev : prev + 1;
            return newState;
        });
    }

    return (
        <Container className={classes.carousel}>
            <div>
                <img src={listImg[currentData]} width='200px' height='200px' />
            </div>
            <MobileStepper position='static' steps={listImg.length} activeStep={currentData}
                backButton={<IconButton disabled={currentData === 0} variant='outlined' color="primary" onClick={previousImg}> <NavigateBeforeIcon /> </IconButton>}
                nextButton={<IconButton disabled={currentData === listImg.length - 1} variant='outlined' color="primary" onClick={nextImg}><NavigateNextIcon /></IconButton>}
            ></MobileStepper>
        </Container>
    );
};

export default Carousel;