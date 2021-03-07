import {Block, IBlockProps, IMeta} from "../../common/element/Block.js";
import {templateString} from './FieldsBlock.template.js'

export class FieldsBlock extends Block<IBlockProps> {
    constructor(meta: IMeta, props: IBlockProps) {
        super({tagName: "div", className: meta.className || ''}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            fields: this.props.children?.map((child: Block<IBlockProps>) => child.getId()),
        }
        return template(context);
    }
}