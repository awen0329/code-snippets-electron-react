import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ControllerRenderProps } from 'react-hook-form';

import { Box, SxProps } from '@UILibrary';
import { CodeSnippet } from '@customTypes/codesnippet';

export default function CodeHighlighter({
  code,
  type,
  sx,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  field,
}: Partial<CodeSnippet> & {
  sx: SxProps;
  field: ControllerRenderProps<CodeSnippet, 'code'>;
}) {
  return (
    <Box sx={{ ...sx }}>
      <SyntaxHighlighter language={type} style={docco}>
        {code!}
      </SyntaxHighlighter>
    </Box>
  );
}
