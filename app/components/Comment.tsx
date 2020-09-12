import * as React from 'react';
import PostMetaInfo from './PostMetaInfo';
import {Comment as CommentType} from '../types/common';

type Props = {
  comment: CommentType;
};

export default function Comment ({ comment }: Props) {
  return (
    <div className='comment'>
      <PostMetaInfo
        comment={true}
        by={comment.by}
        time={comment.time}
        id={comment.id}
      />
      <p dangerouslySetInnerHTML={{__html: comment.text}} />
    </div>
  )
}
