import { Dispatch, SetStateAction } from "react";
import iconSet from "../assets/selection.json";
import { iconList } from 'icomoon-react';
import Category from "../model/Category";
import Page from "../model/Page";
import Post from "../model/Post";

export default class DataService {
    private posts: Map<number, Post> = new Map();
    private categories: Map<number, Category> = new Map();
    private pages: Map<number, Page> = new Map();

    private readonly url: string = process.env.NODE_ENV === 'development' ?
        'https://ddev-wordpress.ddev.site/' :
        'https://stage4.michaelzimmermann.com/';

    async loadDataFromServer(setIsLoading: Dispatch<SetStateAction<boolean>>, setData: Dispatch<SetStateAction<DataService>>) {
        setIsLoading(true);

        const [rawCategories, rawPosts, rawPages] = await Promise.all([
            fetch(`${this.url}/wp-json/wp/v2/categories`).then(rawData => rawData.json()),
            fetch(`${this.url}/wp-json/wp/v2/posts?per_page=100`).then(rawData => rawData.json()),
            fetch(`${this.url}/wp-json/wp/v2/pages`).then(rawData => rawData.json()),
        ]);

        this.handleCategories(rawCategories);
        this.handlePosts(rawPosts);
        this.handlePages(rawPages);

        setData(this);
        setIsLoading(false);
    }

    handleCategories(data: any): void {
        for (const dataEntry of data) {
            if (dataEntry.count > 0) {
                let category = new Category();
                category.id = dataEntry.id;
                category.name = dataEntry.name;
                category.description = dataEntry.description;
                category.count = dataEntry.count;
                category.parent = dataEntry.parent;
                category.slug = dataEntry.slug;
                category.color = dataEntry.acf.iconcolor;
                this.categories.set(category.id, category);
            }
        }
    }

    handlePosts(data: any): void {
        data.forEach((dataEntry: any, i: number, thisArray: Array<any>) => {
            let post = new Post();
            post.id = dataEntry.id;
            post.title = dataEntry.title.rendered;
            post.content = dataEntry.content.rendered;
            post.excerpt = dataEntry.excerpt.rendered;
            post.date = dataEntry.date;
            post.slug = dataEntry.slug;
            post.categories = dataEntry.categories;
            post.icon = dataEntry.acf.iconname && iconList(iconSet).indexOf(dataEntry.acf.iconname) > -1 ? dataEntry.acf.iconname : 'dummy';

            let currentPostCategory = this.categories.get(post.categories[0]);
            if (currentPostCategory) {
                currentPostCategory.posts.push(post);
                this.categories.set(post.categories[0], currentPostCategory);
            }

            post.prev = thisArray[i - 1]?.id || thisArray[thisArray.length - 1].id;
            post.next = thisArray[i + 1]?.id || thisArray[0].id;

            this.posts.set(post.id, post);
        });
    }

    handlePages(data: any): void {
        for (const dataEntry of data) {
            let page = new Page();
            page.id = dataEntry.id;
            page.title = dataEntry.title.rendered;
            page.content = dataEntry.content.rendered;
            page.excerpt = dataEntry.excerpt.rendered;
            page.date = dataEntry.date;
            page.slug = dataEntry.slug;
            page.metaDescription = dataEntry.acf.meta_description;
            page.metaTitle = dataEntry.acf.meta_title;
            this.pages.set(page.id, page);
        }
    }

    getAllPosts(): Post[] {
        const it = this.posts.values();
        return Array.from(it);
    }

    getFromPosts(slug: string): Post | undefined {
        return this.getAllPosts().find((post: Post) => post.slug === slug);
    }

    getFromPostsViaId(id: number): Post | undefined {
        return this.posts.get(id);
    }

    getAllCategories(): Category[] {
        const it = this.categories.values();
        return Array.from(it);
    }

    getFromCategories(slug: string): Category | undefined {
        return this.getAllCategories().find((category: Category) => category.slug === slug);
    }

    getFromCategoriesViaId(id: number): Category | undefined {
        return this.categories.get(id);
    }

    getFromPages(slug: string): Page | undefined {
        return Array.from(this.pages.values()).find((page: Page) => page.slug === slug);
    }

    generateSitemap(): string {
        const url: string = process.env.NODE_ENV === 'development' ?
            'http://localhost:3000/' :
            'https://stage4.netlify.app/';
        let sitemapString = '';
        const categories = this.getAllCategories();
        categories.forEach(category => {
            sitemapString += `${url}${category.slug}/<br />`;
            category.posts.forEach(post => sitemapString += `${url}${category.slug}/${post.slug}/<br />`);
        })
        return sitemapString;
    }

    generateXmlSitemap(): string {
        const url: string = process.env.NODE_ENV === 'development' ?
            'http://localhost:3000/' :
            'https://stage4.netlify.app/';
        let sitemapString = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        `;
        const categories = this.getAllCategories();
        categories.forEach(category => {
            sitemapString += `
    <url>
        <loc>${url}${category.slug}/</loc>
        <lastmod>2022-02-23</lastmod>
    </url>
            `;
            category.posts.forEach(post => sitemapString += `
    <url>
        <loc>${url}${category.slug}/${post.slug}/</loc>
        <lastmod>2022-02-23</lastmod>
    </url>
            `);
        })
        sitemapString += `
</urlset>
        `;
        return sitemapString;
    }

}