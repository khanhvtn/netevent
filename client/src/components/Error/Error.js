import { Box, Container, Hidden, Typography } from '@material-ui/core';
import React from 'react';
import makeStyles from './styles';

const Error = () => {
    const css = makeStyles();
    return (
        <>
            <Box className={css.errorBox} >
                <Container maxWidth="md">
                    <Typography
                        className={css.pnf}
                        align="center"
                        color="textPrimary"
                        variant="h1"
                    >
                        404: Page Not Found
                    </Typography>
                    {/* <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography> */}
                    <Box className={css.imageAlign}>
                        <img
                            alt="Under development"
                            src="/static/images/undraw_page_not_found_su7k.svg"
                            className={css.handleImage}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Error;
