import {Block, IBlockProps, IMeta} from "../element/Block.js";
import {templateString} from './Button.template.js'

interface IProps extends IBlockProps {
    value: string,
    additionalClasses?: string,
    name?: string,
}

export class Button extends Block<IProps> {
    constructor(meta: IMeta, props: IProps) {
        super({tagName: 'div', className: meta.className}, props);
    }

    render() {
        const {additionalClasses, name, value} = this.props;
        const template = (window as any).Handlebars.compile(templateString);
        const context = {additionalClasses, name, value};

        return template(context);
    }
}