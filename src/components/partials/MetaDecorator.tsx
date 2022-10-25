import { Helmet } from "react-helmet";

interface MetaDecoratorProps {
    title: string,
    description: string,
}

export default function MetaDecorator(props: MetaDecoratorProps) {
    return (
        <Helmet>
            <title>{`${props.title} - stage4`}</title>
            <meta name="description" content={props.description} />
        </Helmet>
    );
}