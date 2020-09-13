import * as React from 'react';
import {useCallback, useEffect} from "react";

enum ActionTypes {
  REQUEST = 'REQUEST',
  SUCCESS  = 'SUCCESS',
  ERROR  = 'ERROR',
}

enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

type State = {
  status: string;
  value: string | object | null;
  error: object | null;
}

type Action = {type: ActionTypes.REQUEST}
| {type: ActionTypes.SUCCESS, value: object}
| {type: ActionTypes.ERROR, error: object}


const asyncReducer: React.Reducer<State, Action> = (state:State, action:Action) => {
  switch(action.type){
    case ActionTypes.REQUEST:
      return {
        ...state,
        status: Status.PENDING,
      };
    case ActionTypes.SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        value: action.value,
        error: null,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        status: Status.ERROR,
        value: null,
        error: action.error,
      };
    default:
      return state;
  }
};

const initialState: State = {
  status: Status.IDLE,
  value: null,
  error: null,
};

type Fetcher<T> = () => Promise<T>;

function useAsync<T extends object>(fetcher: Fetcher<T>, immediate = true) {
  const [state, dispatch] = React.useReducer(asyncReducer, initialState);

  const execute = useCallback(async () => {
    dispatch({type: ActionTypes.REQUEST});

    try {
      const response = await fetcher();
      dispatch({type: ActionTypes.SUCCESS, value: response})
    } catch(error) {
      dispatch({type: ActionTypes.ERROR, error})
    }

  }, [fetcher]);

  useEffect(() => {
    if(immediate){
      execute();
    }
  }, [execute, immediate]);

  return {execute, ...state};
}


export default useAsync;
export {
  Status,
}
