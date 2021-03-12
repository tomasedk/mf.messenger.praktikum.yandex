import {Block, IBlockProps, IMeta} from "../../common/block/Block.js";
import {templateString} from './FieldsBlock.template.js'

interface IContextTemplate {
    fields?: string[];
}

export class FieldsBlock extends Block<IBlockProps> {
    constructor(meta: IMeta, props: IBlockProps) {
        super({tagName: "div", className: meta.className || ''}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            fields: this.props.children?.map((child: Block<IBlockProps>) => child.getId()),
        }
        return template(context);
    }
}