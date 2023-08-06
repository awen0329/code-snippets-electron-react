import {
  ADD_CODE_SNIPPET,
  CodeSnippetAction,
  REMOVE_CODE_SNIPPET,
  SET_CODE_SNIPPETS,
  SET_CURRENT_SNIPPET,
  SET_DIRTY,
  SET_NEXT_SNIPPET,
  UPDATE_CODE_SNIPPET,
} from '@actions/snippetActions';
import { CodeSnippetContextValuesType } from '@customTypes/CodeSnippetContextTypes';

function snippetReducer(
  state: CodeSnippetContextValuesType,
  { type, payload }: CodeSnippetAction
): CodeSnippetContextValuesType {
  switch (type) {
    case SET_CODE_SNIPPETS:
      return { snippets: payload, isDirty: false };
    case ADD_CODE_SNIPPET:
      return { ...state, snippets: [...state.snippets, payload] };
    case UPDATE_CODE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          snippet.id === payload.id ? payload : snippet
        ),
      };
    case REMOVE_CODE_SNIPPET:
      return {
        ...state,
        snippets: state.snippets.filter((snippet) => snippet.id !== payload),
      };
    case SET_CURRENT_SNIPPET:
      return {
        ...state,
        currentSnippet: payload,
      };
    case SET_NEXT_SNIPPET:
      return {
        ...state,
        nextSnippet: payload,
      };
    case SET_DIRTY:
      return {
        ...state,
        isDirty: payload,
      };
    default:
      return state;
  }
}

export default snippetReducer;
