import React, { useState } from 'react'
import makeStyles from './styles';
import { Zoom, Paper, TextField, Button, CardMedia } from '@material-ui/core';
import logo from '../../images/logo.png'
import { Typography } from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import {userConfirm} from '../../actions/userActions'
const initialState = {
    password1: "",
    password2: ""
}

const Confirmation = () => {
    const css = makeStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [password, setPassword] = useState(initialState)
    const [errorPassword, setErrorPassword] = useState(false)
    const id = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password.password1 == password.password2 && password.password1 !== "" && password.password2 !== "") {
            dispatch(userConfirm(id.id, password.password2, history))

        } else {
            setErrorPassword(true)
        }
    }

    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <Zoom in>
                    <Paper>
                        <CardMedia
                            className={css.media}
                            image={logo}
                            title="Logo"
                        />
                        <form
                            className={css.form}
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <TextField
                                variant="outlined"
                                className={css.textField}
                                type="password"
                                label="Password"
                                value={password.password1}
                                name="password1"
                                fullWidth
                                onChange={(e) => setPassword({ ...password, password1: e.target.value })}

                            />

                            <TextField
                                variant="outlined"
                                className={css.textField}
                                type="password"
                                label="Confirmed Password"
                                value={password.password2}
                                name="password2"
                                fullWidth
                                onChange={(e) => setPassword({ ...password, password2: e.target.value })}
                            />

                            {errorPassword ? <Typography className={css.errorPasswordText}>Password must be matched and not empty</Typography> : <></>}
                            <Button
                                size="large"
                                variant="contained"
                                className={css.btnSubmit}
                                type="submit"
                                color="primary"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </Zoom>
            </div>
        </div>
    )
}

export default Confirmation;
