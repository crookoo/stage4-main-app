import { Link } from "react-router-dom";

interface NotFoundProps {
    referrer: string,
}

export default function NotFound(props: NotFoundProps): JSX.Element {
    return (
        <div className="container pt-6 pb-4">
            <div className="row">
                <div className="col-xl-8 offset-xl-2">
                    <h1>404</h1>
                    <p>
                        Diese Seite wurde nicht gefunden.<br />
                        Inhaltselement: {props.referrer}
                    </p>
                    <p>
                        <Link to={'/'} className="btn btn-outline-primary">
                            Zur Startseite
                        </Link>
                    </p>
                </div>
            </div>
        </div >
    );
}