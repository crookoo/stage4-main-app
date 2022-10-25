import { Link } from "react-router-dom";
import Slider from "react-slick";
import Category from "../../model/Category";
import Post from '../../model/Post';
import Icon from "./Icon";
import Parser from "./Parser";

interface HomeSliderProps {
    category: Category;
}

export default function HomeSlider(props: HomeSliderProps) {
    let settings = {
        infinite: false,
        slidesToShow: 5.5,
        slidesToScroll: 2,
        draggable: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 5.5,
                    draggable: false,
                    arrows: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4.5,
                    draggable: false,
                    arrows: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3.5,
                    arrows: false,
                    dots: false,
                    draggable: true,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2.5,
                    arrows: false,
                    dots: false,
                    draggable: true,
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {props.category.posts.map((post: Post) => (
                <div key={post.id} className="feature position-relative">
                    <Icon icon={post.icon} color={props.category.color} className="img-fluid mb-2" />
                    <h3 className="mb-1">
                        <Link to={`/${props.category.slug}/${post.slug}`}
                            className="text-reset text-break stretched-link">
                            {post.title}
                        </Link>
                    </h3>
                    <Parser code={post.excerpt} />
                </div>
            ))}
        </Slider>
    )
}