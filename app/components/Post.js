import React from 'react'
import queryString from 'query-string'
import Loading from './Loading'
import PostMetaInfo from './PostMetaInfo'
import Title from './Title'
import Comment from './Comment'
import useFetchPost from "../hooks/useFetchPost";


const Post = (props) => {
  const { id } = queryString.parse(props.location.search);
  const {post, loadingPost, loadingComments, comments, error} = useFetchPost(id);

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return (
    <React.Fragment>
      {loadingPost === true
        ? <Loading text='Fetching post' />
        : <React.Fragment>
          <h1 className='header'>
            <Title url={post.url} title={post.title} id={post.id} />
          </h1>
          <PostMetaInfo
            by={post.by}
            time={post.time}
            id={post.id}
            descendants={post.descendants}
          />
          <p dangerouslySetInnerHTML={{__html: post.text}} />
        </React.Fragment>}
      {loadingComments === true
        ? loadingPost === false && <Loading text='Fetching comments' />
        : <React.Fragment>
          {comments.map((comment) =>
            <Comment
              key={comment.id}
              comment={comment}
            />
          )}
        </React.Fragment>}
    </React.Fragment>
  );

};


export default Post;
