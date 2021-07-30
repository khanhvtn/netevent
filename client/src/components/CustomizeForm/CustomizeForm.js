import React from 'react';
import { Controller } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import {
    TextField,
    FormControlLabel,
    Checkbox,
    FormLabel,
    RadioGroup,
    Radio,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import useStyles from './styles';

const CustomizeForm = ({ control, fieldList, errors, getValues, disabled }) => {
    const css = useStyles();
    const handleCheck = (title, value) => {
        const values = getValues();
        const targetValues = values[title];
        const newValues = targetValues?.includes(value)
            ? targetValues?.filter((target) => target !== value)
            : [...(targetValues ?? []), value];
        return newValues;
    };

    const renderForm = fieldList.map((target, index) => {
        let defaultErrorOption = {
            error: target.isRequired && errors[target.title] ? true : false,
            helperText:
                target.isRequired &&
                errors[target.title] &&
                errors[target.title].message
        };
        switch (target.type) {
            case 'Email':
            case 'Number':
            case 'Text':
                let defaultValidation = {
                    checkNotEmpty: (value) =>
                        !!value || `This field can not be blanked`
                };
                if (target.type === 'Email') {
                    defaultValidation = {
                        ...defaultValidation,
                        isValidEmailForm: (email) => {
                            var re =
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                            return (
                                re.test(email) ||
                                'Please fill a valid email address'
                            );
                        }
                    };
                }
                return (
                    <Controller
                        defaultValue=""
                        key={index}
                        control={control}
                        name={target.title}
                        rules={{
                            validate: defaultValidation
                        }}
                        render={({ field }) => (
                            <TextField
                                disabled={disabled}
                                type={
                                    target.type === 'Text'
                                        ? 'text'
                                        : target.type === 'Number'
                                        ? 'number'
                                        : 'email'
                                }
                                required={target.isRequired}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                margin="none"
                                label={field.name}
                                variant="outlined"
                                {...field}
                                fullWidth
                                className={css.textField}
                                {...defaultErrorOption}
                            />
                        )}
                    />
                );
            case 'Checkbox':
                if (target.optionValues.length === 0) {
                    return (
                        <Controller
                            key={index}
                            control={control}
                            name={target.title}
                            rules={{ required: target.isRequire }}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disabled={disabled}
                                            required={target.isRequired}
                                            {...field}
                                            color="primary"
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                            value={field.value}
                                        />
                                    }
                                    label={target.title}
                                />
                            )}
                        />
                    );
                } else {
                    return (
                        <FormControl
                            key={index}
                            error={defaultErrorOption.error ? true : false}
                            className={css.textField}>
                            <FormLabel component="legend">
                                {target.title}
                            </FormLabel>
                            <Controller
                                defaultValue={[]}
                                rules={{
                                    validate: {
                                        isEmpty: (arrayValue) => {
                                            return (
                                                !!arrayValue.length ||
                                                `This field can not be blanked`
                                            );
                                        }
                                    }
                                }}
                                name={target.title}
                                render={({ field }) =>
                                    target.optionValues.map((value, index) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    disabled={disabled}
                                                    onChange={() =>
                                                        field.onChange(
                                                            handleCheck(
                                                                target.title,
                                                                value
                                                            )
                                                        )
                                                    }
                                                />
                                            }
                                            key={index}
                                            label={value}
                                        />
                                    ))
                                }
                                control={control}
                            />
                            <FormHelperText>
                                {defaultErrorOption.helperText}
                            </FormHelperText>
                        </FormControl>
                    );
                }

            case 'Radio':
                return (
                    <Controller
                        defaultValue={target.optionValues[0]}
                        key={index}
                        control={control}
                        name={target.title}
                        rules={{
                            validate: (targetValue) =>
                                !!targetValue ||
                                `${target.title} can not be blanked`
                        }}
                        render={({ field }) => (
                            <FormControl
                                required={target.isRequired}
                                className={css.textField}
                                error={defaultErrorOption.error ? true : false}>
                                <FormLabel component="legend">
                                    {target.title}
                                </FormLabel>
                                <RadioGroup
                                    {...field}
                                    aria-label={target.title}>
                                    {target.optionValues.map(
                                        (option, index) => {
                                            return (
                                                <FormControlLabel
                                                    disabled={disabled}
                                                    key={index}
                                                    value={option}
                                                    control={<Radio />}
                                                    label={option}
                                                />
                                            );
                                        }
                                    )}
                                </RadioGroup>
                                <FormHelperText>
                                    {defaultErrorOption.helperText}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                );
            case 'DateTime':
                return (
                    <MuiPickersUtilsProvider key={index} utils={DateFnsUtils}>
                        <Controller
                            defaultValue={Date.now()}
                            rules={{
                                validate: (targetValue) =>
                                    !!targetValue ||
                                    `${target.title} can not be blanked`
                            }}
                            name={target.title}
                            control={control}
                            render={({ field }) => {
                                delete field.ref;
                                return (
                                    <KeyboardDatePicker
                                        disabled={disabled}
                                        inputVariant="outlined"
                                        required={target.isRequired}
                                        className={css.textField}
                                        {...defaultErrorOption}
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label={field.name}
                                        format="dd/MM/yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date'
                                        }}
                                        {...field}
                                    />
                                );
                            }}
                        />
                    </MuiPickersUtilsProvider>
                );
            default:
                return (
                    <Controller
                        defaultValue=""
                        key={index}
                        control={control}
                        name={target.title}
                        rules={{ required: target.isRequire }}
                        render={({ field }) => (
                            <TextField
                                disabled={disabled}
                                required={target.isRequired}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                margin="none"
                                variant="outlined"
                                fullWidth
                                className={css.textField}
                                {...defaultErrorOption}
                                {...field}
                            />
                        )}
                    />
                );
        }
    });
    return <>{renderForm}</>;
};

export default CustomizeForm;
