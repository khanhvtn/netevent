import React, { useRef } from 'react';
import MUIRichTextEditor from 'mui-rte';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
//import useStyles in the last
import useStyles from './styles';
import { Paper } from '@material-ui/core';
import { convertToRaw } from 'draft-js';

//customize theme for RichTextEditor
const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                minHeight: '500px',
            },
            editor: {
                // backgroundColor: '#ebebeb',
                padding: '0 20px',
                height: '100%',
            },
            placeHolder: {
                paddingLeft: '20px',
                width: `calc(100% - 20px)`,
                height: '400px',
            },
        },
    },
});



const RichTextEditor = ({ setState, disabled, value }) => {
    const css = useStyles();
    const richTextEditorRef = useRef(null);

    const handleOnChangeDescription = event => {
        const plainText = event.getCurrentContent().getPlainText();
        const rteContent = convertToRaw(event.getCurrentContent())
        setState((prevState) => ({
            ...prevState,
            description: JSON.stringify(rteContent)
        }))
    }
    
    return (
        <Paper elevation={3}>
            <MuiThemeProvider theme={defaultTheme}>
                <MUIRichTextEditor
                    readOnly={disabled}
                    label="Type description here..."
                    // value={value}
                    onChange={handleOnChangeDescription}
                    name="description"
                    inlineToolbar={true}
                    ref={richTextEditorRef}
                />
            </MuiThemeProvider>
        </Paper>
    );
};

export default RichTextEditor;
