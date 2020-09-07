
interface Post {
    id: string;
    url: string;
    title: string;
    by: string;
    time: number;
    descendants: number;
};

type FetchPostType = {
    type: 'top' | 'new';
}

export {
    Post,
    FetchPostType
}
