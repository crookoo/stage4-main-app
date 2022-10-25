import Post from "./Post";

export default class Category {
    id: number = -1;
    description: string = '';
    name: string = '';
    count: number = 0;
    parent: number = 0;
    slug: string = '';
    posts: Array<Post> = [];
    color: string = '';
}