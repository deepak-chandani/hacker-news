import {Comment, FetchPostType, User, ModelType, Post, Id} from "../types/common";

const api = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

type RecordType = Post | Comment;

function removeDead (posts: RecordType[]) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true)
}

function removeDeleted (posts: RecordType[]) {
  return posts.filter(({ deleted }) => deleted !== true)
}

function isComment(model: RecordType): model is Comment {
    return model.type === ModelType.COMMENT;
}

function onlyComments (posts: RecordType[]) {
  return posts.filter(isComment);
}

function isPost(model: RecordType): model is Post{
    return model.type === ModelType.POST;
}

function onlyPosts (posts: RecordType[]) {
  return posts.filter(isPost)
}

export function fetchItem (id: Id): Promise<RecordType> {
  return fetch(`${api}/item/${id}${json}`)
    .then((res) => res.json())
}

export function fetchComments (ids: Id[]) {
  return Promise.all(ids.map(fetchItem))
    .then((comments) => {
        return onlyComments(removeDeleted(removeDead(comments)));
    })
}

export function fetchMainPosts (type: FetchPostType["type"]) {
  return fetch(`${api}/${type}stories${json}`)
    .then((res) => res.json())
    .then((ids: Id[] | null) => {
      if (!ids) {
        throw new Error(`There was an error fetching the ${type} posts.`)
      }

      return ids.slice(0, 50)
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
    .then((posts: RecordType[]) => onlyPosts(removeDeleted(removeDead(posts))))
}

export function fetchUser (id: Id): Promise<User> {
  return fetch(`${api}/user/${id}${json}`)
    .then((res) => res.json())
}

export function fetchPosts (ids: Id[]) {
  return Promise.all(ids.map(fetchItem))
    .then((posts: RecordType[]) => onlyPosts(removeDeleted(removeDead(posts))))
}
