
interface Post {
    id: string | number;
    url: string;
    title: string;
    text?: string;
    by: string;
    time: number;
    descendants: number;
    kids?: number[] | null;
};

interface Comment {
    id: number;
    by: string;
    time: number;
    text: string;
}

type FetchPostType = {
    type: 'top' | 'new';
}

export {
    Post,
    Comment,
    FetchPostType
}
