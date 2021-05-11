import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import useStyles from './styles'

//Heading Name
const headCells = [
    { id: "name", numeric: false, disablePadding: true, label: "Facility" },
    { id: "code", numeric: false, disablePadding: false, label: "Code" },
    { id: "type", numeric: false, disablePadding: false, label: "Type" },
    { id: "createdAt", numeric: true, disablePadding: false, label: "Created At" },
    { id: "updatedAt", numeric: true, disablePadding: false, label: "Updated At" },
];

const FacilityTableHead = (props) => {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;

    const css = useStyles();

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/* Add Checkbox */}
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all users" }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={css.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

FacilityTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default FacilityTableHead;