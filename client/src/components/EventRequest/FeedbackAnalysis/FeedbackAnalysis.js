import React from 'react';
import { Paper } from '@material-ui/core';
import useStyles from './styles';

const FeedbackAnalysis = () => {
    const css = useStyles();

    return (
        <>
            <Paper elevation={0} className={css.paper}>
                <div className={css.tmp} align="center">
                    Feedback Analysis
                </div>
            </Paper>
        </>
    );
};

export default FeedbackAnalysis;
