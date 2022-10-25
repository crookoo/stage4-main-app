import Props from "../model/IProps";
import Parser from "./partials/Parser";

export default function SitemapGenerator(props: Props) {
    return (
        <div className="category-container container py-5" id="content">
            <div className="row">
                <div className="col-xl-8 offset-xl-2 pt-5">
                    <Parser code={props.data.generateSitemap()} />
                </div>
            </div>
        </div>
    )
}