
enum ModelType {
   POST = 'story',
   COMMENT = 'comment',
}

type Id = string | number;

interface Model {
    id: Id;
    dead: boolean;
    type: ModelType;
    deleted: boolean;
}

interface Post{
    id: Id;
    dead: boolean;
    type: ModelType;
    deleted: boolean;
    url: string;
    title: string;
    text?: string;
    by: string;
    time: number;
    descendants: number;
    kids?: number[] | null;
};

interface Comment {
    id: Id;
    dead: boolean;
    type: ModelType;
    deleted: boolean;
    by: string;
    time: number;
    text: string;
}

interface User {
    id: Id;
    about: string;
    created: string;
    karma: number;
}

type FetchPostType = {
    type: 'top' | 'new';
}

export {
    Post,
    Comment,
    FetchPostType,
    ModelType,
    User,
    Model,
    Id,
}
