import {Block, IBlockProps, IMeta} from "../../../core/Block";
import {templateString} from './FieldsBlock.template';
import {compile} from "handlebars";

interface IContextTemplate {
    fields?: string[];
}

export class FieldsBlock extends Block<IBlockProps> {
    constructor(meta: IMeta, props: IBlockProps) {
        super({tagName: "div", className: meta.className || ''}, props);
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            fields: this.props.children?.map((child: Block<IBlockProps>) => child.getId()),
        })
    }
}
