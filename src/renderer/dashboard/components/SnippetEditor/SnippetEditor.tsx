/* eslint-disable react/jsx-props-no-spreading */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import themeConstants from '@constants/theme';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grow,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@UILibrary';
import { Controller, useForm } from 'react-hook-form';
import { CodeSnippet, CodeTypes } from '@customTypes/codesnippet';
import codeTypes from '@constants/codeTypes';
import { useCallback } from 'react';
import CodeHighlighter from './CodeHighlighter';

const schema = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required('Title is required'),
  code: yup.string().required('Code is required'),
  description: yup.string().required('Description is required'),
  type: yup.string<CodeTypes>().required(),
});

export default function SnippetEditor() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<CodeSnippet>({
    resolver: yupResolver<CodeSnippet>(schema),
  });

  const [code, type] = watch(['code', 'type']);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_: CodeSnippet) => {};

  const onDiscard = useCallback(() => {}, []);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        position: 'relative',
        mt: 0,
        height: `calc(100vh - ${themeConstants.headerHeight} - 1rem)`,
      }}
      variant="outlined"
    >
      <Box sx={{ p: 2, height: '64px', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" component="div">
          New Snippet
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grow in={isDirty}>
          <Alert
            severity="info"
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              height: '64px',
              alignItems: 'center',
            }}
            action={
              <>
                <Button color="inherit" size="small" onClick={onDiscard}>
                  Discard
                </Button>
                <Button type="submit" color="primary" size="small">
                  Save
                </Button>
              </>
            }
          >
            Your content has changed.
          </Alert>
        </Grow>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth error={errors?.title !== undefined}>
              <FormLabel>Title: </FormLabel>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField fullWidth {...field} />}
              />
              <FormHelperText>{errors?.title?.message}</FormHelperText>
            </FormControl>
            <FormControl sx={{ width: '160px', flexShrink: 0 }}>
              <FormLabel>Type:</FormLabel>
              <Controller
                name="type"
                control={control}
                defaultValue="javascript"
                render={({ field }) => (
                  <Select {...field}>
                    {Object.keys(codeTypes).map((key) => (
                      <MenuItem key={key} value={key} selected>
                        {codeTypes[key as CodeTypes]}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <FormControl fullWidth error={errors?.code !== undefined}>
            <FormLabel>Code: </FormLabel>
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CodeHighlighter
                  code={code}
                  type={type}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '120px',
                    overflowY: 'auto',
                    height: `calc(100vh - ${themeConstants.headerHeight} - 400px)`,
                  }}
                  field={field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth error={errors?.description !== undefined}>
            <FormLabel>Description: </FormLabel>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField multiline rows={3} fullWidth {...field} />
              )}
            />
            <FormHelperText>{errors?.description?.message}</FormHelperText>
          </FormControl>
        </Box>
      </form>
    </Paper>
  );
}
