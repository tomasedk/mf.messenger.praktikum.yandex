import {Block, IBlockProps, IMeta} from "../block/Block.js";
import {templateString} from './Button.template.js'

interface IProps extends IBlockProps {
    value: string;
}

interface IContextTemplate {
    value: string;
}

export class Button extends Block<IProps> {
    constructor(meta: IMeta, props: IProps) {
        super({tagName: 'div', className: meta.className}, props);
    }

    render() {
        const {value} = this.props;
        const template = window.Handlebars.compile<IContextTemplate>(templateString);
        const context = {value};

        return template(context);
    }
}