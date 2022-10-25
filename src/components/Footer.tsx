import { Link } from "react-router-dom";
import { useDarkMode } from "../service/useDarkMode";

export default function Footer() {
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <footer className="footer mt-auto py-3">
            <div className="container">
                <div className="row">
                    <div className="col col-xl-4 offset-xl-2">
                        <div className="form-check form-check-inline form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                defaultChecked={darkMode}
                                onClick={() => setDarkMode(previousValue => !previousValue)}></input>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Darkmode</label>
                        </div>
                    </div>
                    <div className="col col-xl-4 d-flex justify-content-end">
                        <Link to="/datenschutz">Datenschutz</Link>
                        <Link to="/impressum" className="ps-3">Impressum</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}