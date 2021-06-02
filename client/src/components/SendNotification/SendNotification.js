import React, { useState } from 'react'
import useStyles from './styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import RichTextEditor from './RichTextEditor/RichTextEditor'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const initialState = {
    eventID: '',
    title: '',
    description: ''
}

const SendNotification = () => {
    const css = useStyles();
    const [state, setState] = useState(initialState)

    const handleSend = (e) => {
        e.preventDefault()
        console.log(state)
    }

    return (
        <div className={css.grow}>
            <Paper className={css.paper} color="inherit">
                <div className={css.grow}>
                    <FormControl className={css.formControl} variant="outlined" fullWidth onClick={handleSend}>
                        <Grid container spacing={2} direction="row"
                            justify="flex-start"
                            alignItems="flex-start">
                            <Grid item xs={6} md={6} lg={6}>
                                <InputLabel id="demo-simple-select-outlined-label">Select Event</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={state.eventID}
                                    onChange={(e) => setState({ ...state, eventID: e.target.value })}
                                    label="Select Event"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={6} md={6} lg={6} >
                                <TextField id="filled-basic" label="Title" value={state.title} fullWidth
                                    onChange={(e) => setState({ ...state, title: e.target.value })} />
                            </Grid>

                        </Grid>

                        <Grid container spacing={2} direction="row" justify="flex-start" className={css.notificationDescription}
                            alignItems="flex-start">
                            <Grid item xs={12} md={12} lg={12} align="left">
                                <Typography align="left">
                                    Description
                                </Typography>
                                <RichTextEditor
                                    disabled={false}
                                    setState={setState} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} direction="row" justify="start-end" alignItems="start-end" className={css.buttonSend}>
                            <Grid item xs={12} md={12} lg={12} align="right">
                                <Button variant="contained" color="primary" className={css.buttonSend1}>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </div>
            </Paper>

        </div>
    )
}

export default SendNotification;
