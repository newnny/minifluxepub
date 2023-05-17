import React, { createContext, useReducer } from 'react';

//Context.tsx component is built for creating a global state that can be accessed by components + implementing multiple states using useReducer within a single context.
//'CreateContext' function is used to create a category object that allows you to share data between components
//'useContext' hook is used to access the current category value.
//'useReducer' is an alternative to useState that allows you to manage complex state logic in a more centralized way.
type FormattedCategoryState = {
  formattedCategories: []
}

type EntriesState = {
  total: number;
  entries: [];
}

type CategoryState = {
  category: [];
}

type TokenState = {
  userToken: string;
}

type UrlState = {
  userUrl: string | undefined;
}

type GlobalState = {
  formattedCategoryState: FormattedCategoryState;
  entriesState: EntriesState;
  categoryState: CategoryState;
  tokenState: TokenState;
  urlState: UrlState;
}

type Action =
  // the | symbol represents a union type and is used to define multiple possible types for a single variable or property. 
  | { type: 'GET_FORMATTED_CATEGORY'; payload: [] }
  | { type: 'GET_ENTRIES'; payload: [] }
  | { type: 'GET_CATEGORY'; payload: [] }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_USER_URL'; payload: string | undefined}


const initialState: GlobalState = {
  //The initialState represents the initial values of all three states. The reducer function handles the state updates based on the dispatched actions.
  formattedCategoryState: {
    formattedCategories: []
  },
  entriesState: {
    total: 0,
    entries: []
  },
  categoryState: {
    category: []
  },
  tokenState: {
    userToken: ''
  },
  urlState: {
    userUrl: ''
  }
}

const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'GET_FORMATTED_CATEGORY':
      return {
        ...state,
        formattedCategoryState: {
          ...state.formattedCategoryState,
          formattedCategories: action.payload
        }
      };
    case 'GET_ENTRIES':
      return {
        ...state,
        entriesState: {
          ...state.entriesState,
          entries: action.payload
        }
      };
    case 'GET_CATEGORY':
      return {
        ...state,
        categoryState: {
          ...state.categoryState,
          category: action.payload
        }
      };
    case 'SET_TOKEN':
      return {
        ...state,
        tokenState: {
          ...state.tokenState,
          userToken: action.payload
        }
      };
    case 'SET_USER_URL':
      return {
        ...state,
        urlState: {
          ...state.urlState,
          userUrl: action.payload
        }
      };
    default:
      return state;
  }
}

export const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => { },
});

type GlobalContextProviderProps = {
  children: React.ReactNode
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};