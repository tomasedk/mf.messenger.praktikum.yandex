import {Block, IBlockProps, IMeta} from "../block/Block.js";
import {templateString} from './Link.template.js'

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
        const template = window.Handlebars.compile<IContextTemplate>(templateString);
        const context = {
            additionalClasses,
            href,
            img,
            text,
        };

        return template(context);
    }
}