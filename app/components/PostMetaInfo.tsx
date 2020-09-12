import * as React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import {useTheme} from '../contexts/theme'
import {Post} from "../types/common";

type Props = Omit<Post, 'url' | 'title'> & {comment: boolean};

const PostMetaInfo:React.FC<Props> = ({ by, time, id, descendants }) => {
  const {theme} = useTheme();

  return (
      <div className={`meta-info-${theme}`}>
        <span>by <Link to={`/user?id=${by}`}>{by}</Link></span>
        <span>on {formatDate(time)}</span>
        {typeof descendants === 'number' && (
          <span>
            with <Link to={`/post?id=${id}`}>{descendants}</Link> comments
          </span>
        )}
      </div>
  )
};


export default PostMetaInfo;
