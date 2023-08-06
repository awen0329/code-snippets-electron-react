/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

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
import { CodeSnippet, CodeTypes } from '@customTypes/CodeSnippetTypes';
import codeTypes from '@constants/codeTypes';
import useSnippetForm from '@hooks/useSnippetForm';
import useSnippets from '@hooks/useSnippets';
import CodeHighlighter from './CodeHighlighter';
import SaveModal from '../modals/SaveModal';

const newSnippet: () => CodeSnippet = () => ({
  id: uuidv4(),
  type: 'javascript',
  title: '',
  description: '',
  code: '',
});

export default function SnippetEditor() {
  const {
    currentSnippet,
    nextSnippet,
    setDirty,
    setCurrentSnippet,
    setNextSnippet,
    saveSnippet,
  } = useSnippets();

  const formRef = useRef<HTMLFormElement | null>(null);

  const { watch, control, handleSubmit, reset, errors, isValid, isDirty } =
    useSnippetForm();

  useEffect(() => {
    reset(currentSnippet ?? newSnippet());
  }, [currentSnippet, reset]);

  useEffect(() => {
    setDirty(isDirty);
  }, [isDirty, setDirty]);

  const [code, type] = watch(['code', 'type']);

  const onSubmit = useCallback(
    (snippet: CodeSnippet) => {
      if (isValid) {
        saveSnippet(snippet);

        if (nextSnippet) {
          setCurrentSnippet(nextSnippet);
          setNextSnippet(undefined);
        } else {
          setCurrentSnippet(snippet);
        }
      }
    },
    [isValid, nextSnippet, saveSnippet, setCurrentSnippet, setNextSnippet]
  );

  const onDiscard = useCallback(() => {
    if (nextSnippet) {
      setCurrentSnippet(nextSnippet);
      setNextSnippet(undefined);
    } else {
      reset(currentSnippet ?? newSnippet());
    }
  }, [nextSnippet, setCurrentSnippet, setNextSnippet, reset, currentSnippet]);

  const onSave = () => {
    formRef.current?.requestSubmit();
    if (!isValid) {
      setNextSnippet(undefined);
    }
  };

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
          {currentSnippet ? currentSnippet.title : 'New Snippet'}
        </Typography>
      </Box>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
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
      <SaveModal open={!!nextSnippet} onSave={onSave} onDiscard={onDiscard} />
    </Paper>
  );
}
