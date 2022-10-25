export default class Post {
    id: number = -1;
    title: string = '';
    excerpt: string = '';
    content: string = '';
    date: Date = new Date();
    categories: Array<number> = [];
    slug: string = '';
    icon: string = '';
    prev: number = -1;
    next: number = -1;
}