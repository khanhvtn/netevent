import React, { useRef } from 'react';
import MUIRichTextEditor from 'mui-rte';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
//customize theme for RichTextEditor
const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                minHeight: '500px'
            },
            editor: {
                // backgroundColor: '#ebebeb',
                padding: '0 20px',
                height: '100%'
            },
            placeHolder: {
                paddingLeft: '20px',
                width: `calc(100% - 20px)`,
                height: '400px'
            }
        }
    }
});

const RichTextEditor = ({ setState, disabled }) => {
    const richTextEditorRef = useRef(null);
    return (
        <Paper elevation={3}>
            <MuiThemeProvider theme={defaultTheme}>
                <MUIRichTextEditor
                    readOnly={disabled}
                    label="Type description here..."
                    onSave={(content) =>
                        setState((prevState) => ({
                            ...prevState,
                            description: content
                        }))
                    }
                    onChange={() => richTextEditorRef.current.save()}
                    inlineToolbar={true}
                    ref={richTextEditorRef}
                />
            </MuiThemeProvider>
        </Paper>
    );
};

export default RichTextEditor;
