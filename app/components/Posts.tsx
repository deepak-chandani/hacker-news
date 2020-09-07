import * as React from 'react'
import {useFetchPost} from '../hooks'
import Loading from './Loading'
import PostsList from './PostsList'
import {FetchPostType} from "../types/common";

type Props = FetchPostType;

const Posts: React.FC<Props> = (props) => {
  const { posts, error, loading } = useFetchPost(props.type);

  if (loading === true) {
    return <Loading />
  }

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return <PostsList posts={posts} />
};

export default Posts;
