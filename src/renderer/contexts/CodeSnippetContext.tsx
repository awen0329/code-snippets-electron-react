import React, {
  Reducer,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import { CodeSnippet } from '@customTypes/CodeSnippetTypes';
import {
  ADD_CODE_SNIPPET,
  CodeSnippetAction,
  REMOVE_CODE_SNIPPET,
  SET_CURRENT_SNIPPET,
  SET_DIRTY,
  SET_NEXT_SNIPPET,
  UPDATE_CODE_SNIPPET,
} from '@actions/snippetActions';

import snippetReducer from '@reducers/snippetReducers';
import defaultSnippets from '@constants/defaultSnippets';
import {
  CodeSnippetContextValuesType,
  CodeSnippetContextType,
} from '@customTypes/CodeSnippetContextTypes';

const initialState: CodeSnippetContextValuesType = {
  snippets: defaultSnippets,
  isDirty: false,
};

const CodeSnippetContext = createContext<CodeSnippetContextType>(
  {} as CodeSnippetContextType
);

function CodeSnippetProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer<
    Reducer<CodeSnippetContextValuesType, CodeSnippetAction>
  >(snippetReducer, initialState);

  const saveSnippet = useCallback(
    (snippet: CodeSnippet) => {
      dispatch({
        type: state.currentSnippet ? UPDATE_CODE_SNIPPET : ADD_CODE_SNIPPET,
        payload: snippet,
      });
    },
    [state.currentSnippet, dispatch]
  );

  const setNextSnippet = useCallback(
    (snippet?: CodeSnippet) => {
      if (state.isDirty) {
        dispatch({ type: SET_NEXT_SNIPPET, payload: snippet });
      } else {
        dispatch({ type: SET_CURRENT_SNIPPET, payload: snippet });
      }
    },
    [state.isDirty, dispatch]
  );

  const actions = useMemo(() => {
    return {
      removeSnippet: (snippet: CodeSnippet) => {
        dispatch({ type: REMOVE_CODE_SNIPPET, payload: snippet.id });
      },
      setCurrentSnippet: (snippet?: CodeSnippet) => {
        dispatch({ type: SET_CURRENT_SNIPPET, payload: snippet });
      },
      setDirty: (isDirty: boolean) => {
        dispatch({ type: SET_DIRTY, payload: isDirty });
      },
    };
  }, [dispatch]);

  const value = useMemo(
    () => ({
      ...state,
      ...actions,
      saveSnippet,
      setNextSnippet,
    }),
    [actions, saveSnippet, setNextSnippet, state]
  );

  return (
    <CodeSnippetContext.Provider value={value}>
      {children}
    </CodeSnippetContext.Provider>
  );
}

export { CodeSnippetContext, CodeSnippetProvider };
