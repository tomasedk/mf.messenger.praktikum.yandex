import {Block, IBlockProps} from "../../common/element/Block.js";
import {templateString} from './AsideBlock.template.js'
import {ChatsContainer} from "./chats-container/ChatsContainer.js";

export interface IProps extends IBlockProps {
    children: [ChatsContainer];
}

export class AsideBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "aside", className: 'sidebar'}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            body: this.props.children?.[0].getId(),
        }
        return template(context);
    }
}