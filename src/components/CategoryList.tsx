import { useParams, Link } from 'react-router-dom';
import Props from '../model/IProps';
import Post from '../model/Post';
import Parser from './partials/Parser';
import Icon from './partials/Icon';
import MetaDecorator from './partials/MetaDecorator';
import NotFound from './NotFound';

export default function CategoryList(props: Props): JSX.Element {
    const { categorySlug } = useParams();
    const category = props.data.getFromCategories(categorySlug!);

    if (category) {
        return (
            <div className="container pt-6 pb-4 category-list">
                <MetaDecorator title={category.name} description={category.description} />
                <div className="row">
                    <div className="col-lg-5 col-xl-3 offset-xl-2">
                        <h1 className="my-3 fs-2">{category.name}</h1>
                        <div className="mb-4">
                            <Parser code={category.description} />
                        </div>
                    </div>
                    <div className="col-lg-7 col-xl-5">
                        {category.posts.map((post: Post, index: number) => (
                            <div key={post.id}
                                className={"row py-3 position-relative" + (index > 0 ? " border-top" : "")}>
                                <div className="col-3">
                                    <Icon icon={post.icon} color={category.color} className="img-fluid" />
                                </div>
                                <div className="col category-list-text">
                                    <h2 className="fs-4">
                                        <Link to={`/${category.slug}/${post.slug}`}
                                            className="stretched-link text-reset text-break">
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <Parser code={post.excerpt} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <NotFound referrer="CategoryList" />
        )
    }
}