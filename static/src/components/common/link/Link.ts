import {Block, IMeta} from "../element/Block.js";
import {templateString} from './Link.template.js'

interface IProps {
    additionalClasses: string,
    href: string,
    text: string,
}

export class Link extends Block<IProps> {
    constructor(meta: IMeta,props: IProps) {
        super({tagName: "div", className: meta.className || ''}, props);
    }

    render() {
        const {additionalClasses, href, text} = this.props;
        const template = (window as any).Handlebars.compile(templateString);
        const context = {additionalClasses, href, text};

        return template(context);
    }
}