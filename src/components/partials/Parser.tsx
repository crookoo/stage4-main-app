import { useEffect } from "react";
import parse, { DOMNode, Element } from "html-react-parser";
import Prism from "prismjs";

interface ParserProps {
    code: string;
}

export default function Parser(props: ParserProps): JSX.Element {

    useEffect(() => {
        Prism.highlightAll();
    }, [props.code]);

    return (
        <>
            {parse(props.code, {
                replace: (node: DOMNode) => {
                    if (node instanceof Element && node.name === 'table') {
                        node.attribs.class = "table table-bordered";
                    }
                    if (node instanceof Element && node.name === "pre") {
                        node.attribs.class = "language-js";
                    }
                }
            })}
        </>
    )
}