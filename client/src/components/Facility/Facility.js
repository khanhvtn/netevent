import React from 'react';
import {
    Paper,
    AppBar,
    Toolbar,
    InputBase,
    IconButton,
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
//import makeStyles in the last
import makeStyles from './styles';

const Facility = () => {
    const css = makeStyles();
    return (
        <div className={css.grow}>
            <Paper style={{ margin: '20px', height: '1000px' }}>
                <div className={css.grow}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <div className={css.searchIcon}>
                                <SearchIcon />
                            </div>
                            <div className={css.search}>
                                <InputBase
                                    placeholder="Search…"
                                    css={{
                                        root: css.inputRoot,
                                        input: css.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <div className={css.grow} />
                            <IconButton color="inherit">
                                <FilterList />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </div>
            </Paper>
        </div>
    );
};

export default Facility;
