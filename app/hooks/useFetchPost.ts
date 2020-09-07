import * as React from 'react'
import { fetchMainPosts } from '../utils/api'
import {FetchPostType, Post} from "../types/common";

type State = {
  posts: Post[] | null;
  error: string | null;
  loading: boolean;
};

type Action= {
  type: 'FETCH' | 'SUCCESS' | 'ERROR';
  posts?: Post[];
  error?: string;
}


const postReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        posts: action.posts
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

const initialState: State =  {
  posts: null,
  error: null,
  loading: true,
};
const useFetchPost = (type: FetchPostType) => {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(postReducer, initialState)

  const fetchPost = React.useCallback((type: FetchPostType) => {

    dispatch({
      type: 'FETCH'
    });
    fetchMainPosts(type)
      .then((posts) => dispatch({
        type: 'SUCCESS',
        posts
      }))
      .catch(({ message }) => dispatch({
        type: 'ERROR',
        error: message,
      }))

  }, [type]);

  React.useEffect(() => {
    fetchPost(type);
  }, [type]);

  return {
    ...state
  }
};


export {
  useFetchPost
};
