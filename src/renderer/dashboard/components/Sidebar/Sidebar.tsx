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

export default function Sidebar() {
  const { snippets, setNextSnippet } = useSnippets();

  const onNewSnippet = () => {
    setNextSnippet(undefined);
  };

  const onClick = (snippet: CodeSnippet) => {
    setNextSnippet(snippet);
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
                  e.stopPropagation();
                }}
              >
                <DeleteOutlineRoundedIcon />
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}
