import {
  Autocomplete,
  Box,
  TextField,
  SearchIcon,
  Button,
  ViewSidebarOutlinedIcon,
} from '@UILibrary';
import themeConstants from '@constants/theme';
import { CodeSnippet } from '@customTypes/CodeSnippetTypes';
import useSnippets from '@hooks/useSnippets';

export default function Header({ onOpen }: { onOpen?: () => void }) {
  const { snippets, setNextSnippet } = useSnippets();

  const onChange = (_: any, snippet: CodeSnippet) => {
    setNextSnippet(snippet);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: themeConstants.headerHeight,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 2,
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Button
          variant="outlined"
          sx={{ display: { md: 'none', xs: 'inline-flex' } }}
          onClick={() => onOpen && onOpen()}
        >
          <ViewSidebarOutlinedIcon />
        </Button>
        <Autocomplete
          disableClearable
          sx={{ width: { md: 500, xs: '100%' } }}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SearchIcon />
                  Search Snippets
                </Box>
              }
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
          getOptionLabel={(option) => option.title}
          options={snippets}
          filterOptions={(options, state) => {
            const key = state.inputValue.toLowerCase();
            return options.filter(
              (snippet) =>
                snippet.title.toLowerCase().includes(key) ||
                snippet.description.toLowerCase().includes(key)
            );
          }}
        />
      </Box>
    </Box>
  );
}
