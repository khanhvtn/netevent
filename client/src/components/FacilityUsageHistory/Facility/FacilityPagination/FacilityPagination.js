import React from 'react';
import { Typography, Select, MenuItem, Toolbar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';

const FacilityPagination = ({
    page,
    take,
    handleChangeRowsPerPage,
    handleChangePage
}) => {
    const css = useStyles();
    return (
        <Toolbar className={css.paginationWrapper}>
            <div className={css.selectRowNumWrapper}>
                <Typography>Rows per page: </Typography>
                <Select
                    disableUnderline
                    labelId="takeFilterLabel"
                    id="takeFiler"
                    className={css.selectRowNum}
                    variant="standard"
                    value={take}
                    name="take"
                    onChange={handleChangeRowsPerPage}>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </div>
            <div>
                <Pagination
                    page={page}
                    shape="rounded"
                    variant="text"
                    count={parseInt(totalPages)}
                    color="primary"
                    className={css.pagination}
                    onChange={handleChangePage}
                />
            </div>
        </Toolbar>
    );
};

export default FacilityPagination;
