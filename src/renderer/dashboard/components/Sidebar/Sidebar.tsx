import { useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AddIcon,
  DeleteOutlineRoundedIcon,
} from '@UILibrary';
import { CodeSnippet } from '@customTypes/CodeSnippetTypes';
import useSnippets from '@hooks/useSnippets';
import themeConstants from '@constants/theme';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';

export default function Sidebar({ onSelect }: { onSelect?: () => void }) {
  const { snippets, currentSnippet, setNextSnippet, removeSnippet } =
    useSnippets();

  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(
    null
  );

  const onNewSnippet = () => {
    setNextSnippet(undefined);
    if (onSelect) onSelect();
  };

  const onClick = (snippet: CodeSnippet) => {
    setNextSnippet(snippet);
    if (onSelect) onSelect();
  };

  return (
    <Box sx={{ width: themeConstants.sidebarWidth }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Button
          disableElevation
          fullWidth
          variant="contained"
          onClick={() => {
            onNewSnippet();
          }}
          startIcon={<AddIcon />}
          sx={{ height: '42px', mb: 2 }}
        >
          New Snippet
        </Button>
        <List
          sx={{
            height: 'calc(100vh - 110px)',
            overflowY: 'auto',
          }}
        >
          {snippets.map((snippet) => (
            <ListItemButton
              key={snippet.id}
              selected={snippet === currentSnippet}
              onClick={() => {
                onClick(snippet);
              }}
              sx={{ borderRadius: 1 }}
            >
              <ListItemText primary={snippet.title} />
              <ListItemIcon
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  },
                  minWidth: '32px',
                }}
                onClick={(e) => {
                  setSelectedSnippet(snippet);
                  e.stopPropagation();
                }}
              >
                <DeleteOutlineRoundedIcon />
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <DeleteConfirmModal
        open={!!selectedSnippet}
        onOK={() => {
          if (selectedSnippet) removeSnippet(selectedSnippet);
          setSelectedSnippet(null);
        }}
        onCancel={() => {
          setSelectedSnippet(null);
        }}
      />
    </Box>
  );
}
