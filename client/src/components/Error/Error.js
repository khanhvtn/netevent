import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import React from 'react';
import makeStyles from './styles';

const Error = () => {
    const css = makeStyles();
    return (
        <>
            <Box className={css.errorBox} >
                <Typography
                    align="center"
                    variant="caption"
                >
                    404: Page Not Found...
                </Typography>
            </Box>
        </>
    );
};

export default Error;