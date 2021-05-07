import React from 'react';
import { Link } from 'react-router-dom';
import makeStyles from './style';

const NotFound = () => {

    const css = makeStyles();

    return (
        <div className={css.notfound}>
            <img
            src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
            alt="not-found"
            />
            <Link to="/" className={css.linkHome}>
            Go Home
            </Link>

        </div>
        )
};

export default NotFound;