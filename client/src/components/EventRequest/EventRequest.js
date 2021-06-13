import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './styles'

const EventRequest = () => {
    const css = useStyles();
    const dispatch = useDispatch();


    return (
        <>
            Event Request
        </>
    )
}

export default EventRequest;