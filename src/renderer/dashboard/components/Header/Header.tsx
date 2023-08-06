import { Autocomplete, Box, TextField, SearchIcon } from '@UILibrary';
import themeConstants from '@constants/theme';
import defaultSnippets from '@constants/defaultSnippets';

export default function Header() {
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
        <Autocomplete
          disableClearable
          sx={{ width: { md: 500, xs: '100%' } }}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
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
          options={defaultSnippets.map((snippet) => snippet.title)}
        />
      </Box>
    </Box>
  );
}
