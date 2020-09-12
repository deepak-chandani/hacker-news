import * as React from 'react';
import {useEffect} from "react";
import {Comment, Post} from "../types/common";
import { fetchItem, fetchComments } from '../utils/api'


type State = {
  post: Post | null;
  loadingPost: boolean;
  comments: Comment[];
  loadingComments: boolean;
  error: string | null;
};

type Action = { type: 'FETCH_POST_REQUEST'}
    | {type: "FETCH_POST_SUCCESS"; post: Post}
    | {type: "ERROR"; error: string}
    | {type: "FETCH_COMMENTS_REQUEST"}
    | {type: "FETCH_COMMENTS_SUCCESS"; comments: Comment[]}

const postReducer: React.Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case "FETCH_POST_REQUEST":
            return {
                ...state,
                loadingPost: true,
                loadingComments: true,
                error: null,
            };
        case "FETCH_POST_SUCCESS":
            return {
                ...state,
                post: action.post,
                loadingPost: false,
                loadingComments: true,
                error: null,
            };
        case "FETCH_COMMENTS_REQUEST":
            return {
                ...state,
                loadingComments: true,
                error: null,
            };
        case "FETCH_COMMENTS_SUCCESS":
            return {
                ...state,
                comments: action.comments,
                loadingPost: false,
                loadingComments: false,
                error: null,
            };
        case "ERROR":
            return {
                ...state,
                loadingPost: false,
                loadingComments: false,
                error: action.error,
            };
    }
}

const initialState: State = {
    post: null,
    loadingPost: true,
    comments: [],
    loadingComments: true,
    error: null,
};

const useFetchPost = (postId: number): State  => {
    const [state, dispatch] = React.useReducer(postReducer, initialState);

    useEffect(() => {

        dispatch({type: "FETCH_POST_REQUEST"});

        fetchItem(postId)
            .then((post) => {
                dispatch({type: "FETCH_POST_SUCCESS", post})

                return fetchComments(post.kids || [])
            })
            .then((comments) => dispatch({type: 'FETCH_COMMENTS_SUCCESS', comments}))
            .catch(({ message }) => dispatch({type: 'ERROR', error: message}));

    }, [postId]);

    return {...state};
};


export default useFetchPost;
