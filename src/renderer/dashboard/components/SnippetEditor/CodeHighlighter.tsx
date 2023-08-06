import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ControllerRenderProps } from 'react-hook-form';

import { KeyboardEventHandler, useCallback, useRef } from 'react';
import { Box, SxProps, TextField } from '@UILibrary';
import { CodeSnippet } from '@customTypes/CodeSnippetTypes';

export default function CodeHighlighter({
  code,
  type,
  sx,
  field,
}: Partial<CodeSnippet> & {
  sx: SxProps;
  field: ControllerRenderProps<CodeSnippet, 'code'>;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const onKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();

        const area = textAreaRef.current!;
        const start = area.selectionStart;
        const end = area.selectionEnd;

        area.value = `${area.value.substring(0, start)}\t${area.value.substring(
          end
        )}`;

        field.onChange(area.value);
        // eslint-disable-next-line no-multi-assign
        area.selectionStart = area.selectionEnd = start + 1;
      }
    },
    [field]
  );

  return (
    <Box
      onClick={() => {
        textAreaRef.current?.focus();
      }}
      sx={{
        position: 'relative',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '0.3rem',
        '&>pre, &>div': {
          background: 'transparent !important',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '16.5px 14px !important',
          margin: 0,
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: 0,

          '& span': {
            fontWeight: 'normal !important',
          },
        },
        ...sx,
      }}
    >
      <SyntaxHighlighter language={type} style={docco}>
        {code!}
      </SyntaxHighlighter>
      <TextField
        multiline
        {...field}
        spellCheck={false}
        sx={{
          '& textarea': {
            caretColor: 'black',
            lineHeight: '1.25rem',
            whiteSpace: 'pre',
            letterSpacing: 0,
            color: 'transparent',
          },
          '& .MuiInputBase-root': {
            padding: 0,
          },
          '& fieldset': {
            border: 'none',
          },
        }}
        inputRef={(input) => {
          textAreaRef.current = input;
        }}
        onKeyDown={onKeyDown}
      />
    </Box>
  );
}
