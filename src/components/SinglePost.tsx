import { Link, useParams } from 'react-router-dom';
import Category from '../model/Category';
import Props from '../model/IProps';
import Post from '../model/Post';
import Icon from './partials/Icon';
import Parser from './partials/Parser';
import PaginationButton from './partials/PaginationButton';
import MetaDecorator from './partials/MetaDecorator';
import NotFound from './NotFound';
import React, { Suspense } from 'react';
import ErrorBoundary from './partials/ErrorBoundary';

const RemoteApp = React.lazy(() => import("app2/App"));

export default function SinglePost(props: Props): JSX.Element {
    const { categorySlug, postSlug } = useParams();
    const post: Post | undefined = props.data.getFromPosts(postSlug!);
    const category: Category | undefined = props.data.getFromCategories(categorySlug!);

    if (post && category) {
        const prevPost: Post | undefined = props.data.getFromPostsViaId(post.prev);
        const nextPost: Post | undefined = props.data.getFromPostsViaId(post.next);

        return (
            <div className="pb-4 single-post">
                <MetaDecorator title={`${post.title} - ${category.name}`} description={post.excerpt} />
                <div className="post-icon-stage">
                    <div className="container">
                        <div className="row">
                            <div className="offset-xl-2 col">
                                <Icon icon={post.icon} color={category.color} className="post-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2">
                            <h3 className="fs-6">
                                <Link to={`/${category.slug}`}
                                    className="badge rounded-pill text-dark"
                                    style={{ backgroundColor: category.color }}>
                                    {category.name}
                                </Link>
                            </h3>
                            <h1 className="mb-3 text-break">{post.title}</h1>
                            <h2 className="fs-5"><Parser code={post.excerpt} /></h2>
                            <div className="hr-short" style={{ backgroundColor: category.color }} />
                            <div className="content mb-5">
                                <Parser code={post.content} />
                            </div>
                            <div className="row mb-3 gy-3">
                                <div className="col-md-6">
                                    <PaginationButton post={prevPost} data={props.data} prev={true} />
                                </div>
                                <div className="col-md-6">
                                    <PaginationButton post={nextPost} data={props.data} prev={false} />
                                </div>
                            </div>
                            <div>Kommentarapp {post.id}</div>
                            <ErrorBoundary>
                                <Suspense fallback={'Loading ...'}>
                                    <RemoteApp postId={post.id} />
                                </Suspense>
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <NotFound referrer="SinglePost" />
        )
    }
}