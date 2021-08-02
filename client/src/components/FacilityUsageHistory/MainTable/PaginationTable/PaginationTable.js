import React from 'react';
import { Typography, Select, MenuItem } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';

const PaginationTable = ({
    page,
    take,
    handleChangeRowsPerPage,
    handleChangePage,
    totalPages,
    isLoading
}) => {
    const css = useStyles();
    return (
        <div className={css.paginationWrapper}>
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
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
            </div>
            <div>
                <Pagination
                    disabled={isLoading}
                    page={page}
                    shape="rounded"
                    variant="text"
                    count={parseInt(totalPages)}
                    color="primary"
                    className={css.pagination}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
};

export default PaginationTable;
