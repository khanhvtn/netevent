import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { convertToRaw } from 'draft-js';

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

const RichTextEditor = ({ setState, disabled, value }) => {
  return (
    <Paper elevation={3}>
      <MuiThemeProvider theme={defaultTheme}>
        <MUIRichTextEditor
          defaultValue={value}
          readOnly={disabled}
          label="Type description here..."
          onChange={(event) => {
            const content1 = JSON.stringify(
              convertToRaw(event.getCurrentContent())
            );
            setState((prevState) => ({
              ...prevState,
              description: content1
            }));
          }}
          inlineToolbar={true}
        />
      </MuiThemeProvider>
    </Paper>
  );
};

export default RichTextEditor;
