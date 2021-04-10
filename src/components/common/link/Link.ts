import {Block, IBlockProps, IMeta} from "../../../core/Block";
import {templateString} from './Link.template';
import {compile} from "handlebars";

interface IProps extends IBlockProps {
    additionalClasses: string;
    text?: {
        className?: string;
        label: string
    };
    href?: string;
    img?: {
        alt?: string;
        className?: string;
        src?: string;
    };
}

interface IContextTemplate {
    additionalClasses: string;
    text?: {
        className?: string;
        label: string
    };
    href?: string;
    img?: {
        alt?: string;
        className?: string;
        src?: string;
    };
}

export class Link extends Block<IProps> {
    constructor(meta: IMeta, props: IProps) {
        super({tagName: "div", className: meta.className || ''}, props);
    }

    render() {
        const {additionalClasses, href, text, img} = this.props;

        return compile<IContextTemplate>(templateString)({
            additionalClasses,
            href,
            img,
            text,
        })
    }
}
