import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import useStyles from './styles';

const CustomizeForm = ({ control, fieldList, errors }) => {
    const css = useStyles();
    const renderForm = fieldList.map((target, index) => {
        switch (target.type) {
            case 'Text':
                return (
                    <Controller
                        key={index}
                        control={control}
                        name={target.title}
                        rules={{ required: target.isRequired }}
                        render={({ field }) => (
                            <TextField
                                required={target.isRequired}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                margin="none"
                                label={field.name}
                                variant="outlined"
                                {...field}
                                fullWidth
                                className={css.textField}
                                error={
                                    target.isRequired && errors[target.title]
                                        ? true
                                        : false
                                }
                                helperText={
                                    target.isRequired &&
                                    errors[target.title] &&
                                    `This field can not be blanked`
                                }
                            />
                        )}
                    />
                );
            case 'Number':
                return (
                    <Controller
                        key={index}
                        control={control}
                        name={target.title}
                        rules={{ required: target.isRequired }}
                        render={({ field }) => (
                            <TextField
                                required={target.isRequired}
                                label={field.name}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                margin="none"
                                type="number"
                                variant="outlined"
                                fullWidth
                                className={css.textField}
                                error={
                                    target.isRequired && errors[target.title]
                                        ? true
                                        : false
                                }
                                helperText={
                                    target.isRequired &&
                                    errors[target.title] &&
                                    `This field can not be blanked`
                                }
                                {...field}
                            />
                        )}
                    />
                );
            case 'Checkbox':
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
            default:
                return (
                    <Controller
                        key={index}
                        control={control}
                        name={target.title}
                        rules={{ required: target.isRequire }}
                        render={({ field }) => (
                            <TextField
                                required={target.isRequired}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                margin="none"
                                variant="outlined"
                                fullWidth
                                className={css.textField}
                                error={
                                    target.isRequired && errors[target.title]
                                        ? true
                                        : false
                                }
                                helperText={
                                    target.isRequired &&
                                    errors[target.title] &&
                                    `This field can not be blanked`
                                }
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
