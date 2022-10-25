import { Link } from 'react-router-dom';
import Props from '../model/IProps';
import Category from '../model/Category';
import Parser from './partials/Parser';
import HomeSlider from './partials/HomeSlider';
import Hero from './partials/Hero';

export default function Home(props: Props): JSX.Element {
    const hero = props.data.getFromPages('hero');
    const categories = props.data.getAllCategories();

    return (
        <div>
            {
                hero ?
                    <Hero content={hero} /> :
                    <div>No hero content available</div>
            }

            <div className="category-container container py-5" id="content">
                <div className="row">
                    <div className="col-xl-8 offset-xl-2">
                        {
                            categories ? (
                                categories.map((category: Category) => (
                                    <div key={category.id} className="category-wrapper">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex justify-content-start">
                                                <h2 className="my-3 me-3">{category.name}</h2>
                                                <div className="d-flex align-items-center">
                                                    <span className="badge rounded-pill"
                                                        style={{ backgroundColor: category.color }}>
                                                        {category.posts.length} Features
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="d-flex align-items-center">
                                                <Link to={`/${category.slug}`}>mehr</Link>
                                            </span>
                                        </div>
                                        <div className="category-description mb-4">
                                            <Parser code={category.description} />
                                        </div>
                                        <HomeSlider category={category} />
                                    </div>
                                ))
                            ) : (
                                <div>No categories available</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
