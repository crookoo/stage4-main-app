import '../../scss/spinner.scss';

export default function Spinner(): JSX.Element {
    return (
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
    )
}

// Quelle Spinner: https://tobiasahlin.com/spinkit/