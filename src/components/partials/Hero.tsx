import Page from "../../model/Page";
import parseHTML from 'html-react-parser';
import MetaDecorator from "./MetaDecorator";

interface HeroProps {
    content: Page,
}

export default function Hero(props: HeroProps) {
    return (
        <div className="py-5 px-4 text-center w-100 hero">
            <MetaDecorator title={props.content.metaTitle} description={props.content.metaDescription} />
            {parseHTML(props.content.content)}
        </div>
    )
}