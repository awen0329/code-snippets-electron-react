import { useState } from 'react';
import { Box, SwipeableDrawer } from '@UILibrary';
import themeConstants from '@constants/theme';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import SnippetEditor from './components/SnippetEditor/SnippetEditor';

export default function Dashboard() {
  const [showDrawer, setShowDrawer] = useState(false);

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
      <SwipeableDrawer
        variant="temporary"
        open={showDrawer}
        onOpen={() => {}}
        onClose={() => setShowDrawer(false)}
        sx={{ display: { md: 'none', xs: 'block' } }}
      >
        <Sidebar onSelect={() => setShowDrawer(false)} />
      </SwipeableDrawer>
      <Box
        sx={{
          ml: { md: `calc(${themeConstants.sidebarWidth} + 1rem)`, xs: 2 },
          mr: 2,
        }}
      >
        <Header onOpen={() => setShowDrawer(true)} />
        <SnippetEditor />
      </Box>
    </Box>
  );
}
