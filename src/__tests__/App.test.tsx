import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Channels } from 'main/preload';
import App from '../renderer/App';

// Mock electron store
const electronHandler = {
  ipcRenderer: {
    sendMessage: () => {},
    on: (channel: Channels, func: (...args: unknown[]) => void) => {
      if (channel === 'load')
        func([
          {
            id: '1',
            type: 'javascript',
            title: 'reactfc',
            description: 'Create a simple React FC.',
            code: 'import React from {react}',
          },
          {
            id: '2',
            type: 'python',
            title: 'deffn',
            description: 'Create a simple python function.',
            code: 'def func(): \n pass',
          },
        ]);
      return () => {};
    },
    once: () => {},
  },
};

describe('App', () => {
  beforeAll(() => {
    global.window.electron = electronHandler;
  });

  it('should render', () => {
    render(<App />);
    expect(screen).toBeTruthy();
  });
});

describe('Snippet Sidebar & Editor Test', () => {
  beforeAll(() => {
    global.window.electron = electronHandler;
  });

  let sidebars: HTMLElement[];

  beforeEach(async () => {
    render(<App />);

    sidebars = await screen.findAllByTestId('sidebar-snippet-list');
  });

  it('render all items in sidebar', async () => {
    expect(sidebars).toHaveLength(2);
    expect(sidebars[0].children).toHaveLength(2);
  });

  it('check the snippet editor status if user clicks an item in sidebar', async () => {
    const [sidebar] = sidebars;
    await act(() => {
      fireEvent.click(sidebar.children[0]);
    });

    expect(screen.getByTestId('snippet-form')).toHaveFormValues({
      type: 'javascript',
      title: 'reactfc',
      description: 'Create a simple React FC.',
      code: 'import React from {react}',
    });

    await act(() => {
      fireEvent.click(sidebar.children[1]);
    });

    expect(screen.getByTestId('snippet-form')).toHaveFormValues({
      type: 'python',
      title: 'deffn',
      description: 'Create a simple python function.',
      code: 'def func(): \n pass',
    });
  });
});

describe('Snippet Editor Dirty Test', () => {
  beforeAll(() => {
    global.window.electron = electronHandler;
  });

  let sidebar: HTMLElement;

  beforeEach(async () => {
    render(<App />);

    [sidebar] = await screen.findAllByTestId('sidebar-snippet-list');
  });

  it('confirm save modal status when user edit code and click other snippet without saving', async () => {
    const field = screen.getByTestId('snippet-title').querySelector('input');

    expect(field).toBeTruthy();

    await act(() => {
      fireEvent.change(field as HTMLElement, {
        target: { value: 'sample code' },
      });
    });

    expect(field?.value).toEqual('sample code');

    await act(() => {
      fireEvent.click(sidebar.children[0]);
    });

    expect(field?.value).toEqual('sample code');
  });

  it('remove dirty status and navigate to another snippet', async () => {
    const field = screen.getByTestId('snippet-title').querySelector('input');

    await act(() => {
      fireEvent.change(field as HTMLElement, {
        target: { value: 'sample code' },
      });
    });

    // Remove Dirty
    await act(() => {
      fireEvent.change(field as HTMLElement, {
        target: { value: '' },
      });
    });

    expect(field?.value).toEqual('');

    await act(() => {
      fireEvent.click(sidebar.children[0]);
    });

    expect(field?.value).toEqual('reactfc');
  });
});
