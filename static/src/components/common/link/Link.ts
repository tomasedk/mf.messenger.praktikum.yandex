import {Block, IMeta} from "../block/Block.js";
import {templateString} from './Link.template.js'

interface IProps {
    additionalClasses: string;
    href: string;
    text: string;
}

interface IContextTemplate {
    additionalClasses: string;
    href: string;
    text: string;
}

export class Link extends Block<IProps> {
    constructor(meta: IMeta,props: IProps) {
        super({tagName: "div", className: meta.className || ''}, props);
    }

    render() {
        const {additionalClasses, href, text} = this.props;
        const template = window.Handlebars.compile<IContextTemplate>(templateString);
        const context = {additionalClasses, href, text};

        return template(context);
    }
}