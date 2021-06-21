import React from 'react';
import {
    CircularProgress,
    Button,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Collapse,
    DialogContentText,
    Slide,
    Chip
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';
//import useStyles in the last
import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const rolesDisplay = ['1', '2', '3', '4'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const UserDialog = ({
    openCreateAndUpdateDialog,
    handleToggleDialogCreateAndUpdate,
    isCreateMode,
    openAlert,
    handleChange,
    email,
    role,
    openDeleteDialog,
    handleCreateAndUpdate,
    handleToggleDialogDelete,
    handleDelete
}) => {
    const css = useStyles();
    const { isLoading, errors, isCreated } = useSelector((state) => ({
        isLoading: state.user.isLoading,
        errors: state.error.errors,
        isCreated: state.user.isCreated
    }));

    return (
        <div>
            {/* Dialog Create and Update */}
            <Dialog
                TransitionComponent={Transition}
                fullWidth
                open={openCreateAndUpdateDialog}
                className={css.dialogCreateUpdateUser}
                onClose={(e) => handleToggleDialogCreateAndUpdate(e)}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {isCreateMode ? 'Create New User' : 'Update a User'}
                </DialogTitle>
                <DialogContent>
                    <Collapse in={openAlert} className={css.textField}>
                        <Alert severity="success">
                            Create New User Success!
                        </Alert>
                    </Collapse>
                    <TextField
                        disabled={isLoading || isCreated ? true : false}
                        className={css.textField}
                        helperText={errors?.email ? errors?.email : ''}
                        error={errors?.email ? true : false}
                        variant="outlined"
                        onChange={handleChange}
                        id="email"
                        value={email}
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        fullWidth
                        disabled={isLoading || isCreated ? true : false}
                        className={css.textField}
                        select
                        name="role"
                        variant="outlined"
                        label="Role"
                        SelectProps={{
                            multiple: true,
                            value: role,
                            onChange: handleChange,
                            MenuProps: MenuProps,
                            renderValue: (selected) => (
                                <div className={css.chips}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={
                                                value === '1'
                                                    ? 'Admin'
                                                    : value === '2'
                                                    ? 'Reviewer'
                                                    : value === '3'
                                                    ? 'Creator'
                                                    : 'Team Member'
                                            }
                                            className={css.chip}
                                        />
                                    ))}
                                </div>
                            )
                        }}>
                        {rolesDisplay.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role === '1'
                                    ? 'Admin'
                                    : role === '2'
                                    ? 'Reviewer'
                                    : role === '3'
                                    ? 'Creator'
                                    : 'Team Member'}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={isLoading || isCreated ? true : false}
                        onClick={handleToggleDialogCreateAndUpdate}
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading || isCreated ? true : false}
                        variant="contained"
                        onClick={handleCreateAndUpdate}
                        color="primary">
                        {isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : isCreateMode ? (
                            'Create'
                        ) : (
                            'Update'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Confirm Delete */}
            <Dialog
                TransitionComponent={Transition}
                open={openDeleteDialog}
                className={css.dialogDeleteUser}
                fullWidth
                onClose={handleToggleDialogDelete}
                aria-labelledby="delete-dialog"
                aria-describedby="delete-dialog-description">
                <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure with your action ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={isLoading ? true : false}
                        onClick={handleToggleDialogDelete}
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading ? true : false}
                        variant="contained"
                        onClick={handleDelete}
                        color="secondary">
                        {isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserDialog;
