import React, { useContext } from 'react';
import {
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    DialogContentText,
    Slide,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@material-ui/core';
//import useStyles in the last
import useStyles from './styles';
import { CreateEventInterface } from '../../Context';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const CustomizeFieldDialog = () => {
    const css = useStyles();
    const {
        customizeFieldState,
        handleToggleDialogCreateAndUpdateCustomizeField,
        handleChangeCustomizeField,
        handleCreateAndUpdateCustomizeField,
        handleToggleDialogDeleteCustomizeField,
        handleDeleteCustomizeField,
        errors
    } = useContext(CreateEventInterface);
    return (
        <div>
            {/* Dialog Create and Update */}
            <Dialog
                TransitionComponent={Transition}
                maxWidth="sm"
                open={
                    customizeFieldState.openCreateAndUpdateDialogCustomizeField
                }
                onClose={(e) =>
                    handleToggleDialogCreateAndUpdateCustomizeField(e)
                }
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {customizeFieldState.isCustomizeFieldCreateMode
                        ? 'Create New Customize Field'
                        : 'Update a Customize Field'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Title"
                        type="text"
                        value={customizeFieldState.title}
                        name="title"
                        onChange={handleChangeCustomizeField}
                        error={errors?.title ? true : false}
                        helperText={errors?.title ? errors.title : ''}
                    />
                    <FormControl
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={errors?.type ? true : false}>
                        <InputLabel id="select-label-type">Type</InputLabel>
                        <Select
                            labelId="select-label-type"
                            id="select-type"
                            name="type"
                            margin="normal"
                            value={customizeFieldState.type}
                            onChange={handleChangeCustomizeField}
                            label="Type">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            <MenuItem value={'Text'}>Text</MenuItem>
                            <MenuItem value={'Select'}>Select</MenuItem>
                            <MenuItem value={'Email'}>Email</MenuItem>
                            <MenuItem value={'Checkbox'}>Checkbox</MenuItem>
                            <MenuItem value={'Range'}>Range</MenuItem>
                            <MenuItem value={'Radio'}>Radio</MenuItem>
                            <MenuItem value={'Number'}>Number</MenuItem>
                            <MenuItem value={'TextArea'}>TextArea</MenuItem>
                            <MenuItem value={'DateTime'}>DateTime</MenuItem>
                        </Select>
                        <FormHelperText>
                            {errors?.type ? errors.type : ''}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={errors?.required ? true : false}>
                        <InputLabel id="select-label-type">Require</InputLabel>
                        <Select
                            labelId="select-label-type"
                            id="select-type"
                            name="required"
                            margin="normal"
                            value={customizeFieldState.required}
                            onChange={handleChangeCustomizeField}
                            label="Require">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            <MenuItem value={'Yes'}>Yes</MenuItem>
                            <MenuItem value={'No'}>No</MenuItem>
                        </Select>
                        <FormHelperText>
                            {errors?.required ? errors.required : ''}
                        </FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={
                            customizeFieldState.isLoading ||
                            customizeFieldState.taskCreatSuccess
                                ? true
                                : false
                        }
                        onClick={
                            handleToggleDialogCreateAndUpdateCustomizeField
                        }
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        disabled={
                            customizeFieldState.isLoading ||
                            customizeFieldState.customizeFieldCreatSuccess
                                ? true
                                : false
                        }
                        variant="contained"
                        onClick={handleCreateAndUpdateCustomizeField}
                        color="primary">
                        {customizeFieldState.isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : customizeFieldState.isCustomizeFieldCreateMode ? (
                            'Create'
                        ) : (
                            'Update'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Confirm Delete */}
            <Dialog
                fullWidth
                TransitionComponent={Transition}
                className={css.dialogDeleteTask}
                open={customizeFieldState.openDeleteDialogCustomizeField}
                onClose={handleToggleDialogDeleteCustomizeField}
                aria-labelledby="delete-dialog"
                aria-describedby="delete-dialog-task">
                <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-task">
                        Are you sure with your action ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={customizeFieldState.isLoading ? true : false}
                        onClick={handleToggleDialogDeleteCustomizeField}
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        disabled={customizeFieldState.isLoading ? true : false}
                        variant="contained"
                        onClick={handleDeleteCustomizeField}
                        color="secondary">
                        {customizeFieldState.isLoading ? (
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

export default CustomizeFieldDialog;
