import { Link } from "react-router-dom";
import Post from "../../model/Post";
import DataService from "../../service/DataService";

interface PaginationButtonProps {
    post: Post | undefined;
    data: DataService;
    prev: boolean;
}

export default function PaginationButton(props: PaginationButtonProps): JSX.Element {
    return (
        <div className="post-page-link p-3 px-4 rounded position-relative d-flex justify-content-between align-items-center">
            {props.prev ?
                <>
                    <div className="page-arrow left">‹</div>
                    <div className="text-end">
                        <div className="fw-light">
                            Vorheriges
                        </div>
                        <Link className="stretched-link"
                            to={`/${props.data.getFromCategoriesViaId(props.post?.categories[0] as number)?.slug}/${props.post?.slug}`}>
                            {props.post?.title}
                        </Link>
                    </div>
                </> :
                <>
                    <div className="text-start">
                        <div className="fw-light">
                            Nächstes
                        </div>
                        <Link className="stretched-link"
                            to={`/${props.data.getFromCategoriesViaId(props.post?.categories[0] as number)?.slug}/${props.post?.slug}`}>
                            {props.post?.title}
                        </Link>
                    </div>
                    <div className="page-arrow right">›</div>
                </>
            }
        </div>
    )
}