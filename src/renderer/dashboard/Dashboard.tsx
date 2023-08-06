import { Box, SwipeableDrawer } from '@UILibrary';
import themeConstants from '@constants/theme';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import SnippetEditor from './components/SnippetEditor/SnippetEditor';

export default function Dashboard() {
  return (
    <Box>
      <SwipeableDrawer
        variant="permanent"
        open
        onOpen={() => {}}
        onClose={() => {}}
        sx={{ display: { md: 'block', xs: 'none' } }}
      >
        <Sidebar />
      </SwipeableDrawer>
      <Box
        sx={{
          ml: { md: `calc(${themeConstants.sidebarWidth} + 1rem)`, xs: 2 },
          mr: 2,
        }}
      >
        <Header />
        <SnippetEditor />
      </Box>
    </Box>
  );
}
