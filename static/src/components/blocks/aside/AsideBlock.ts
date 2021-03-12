import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './AsideBlock.template.js'
import {ChatsContainer} from "./chats-container/ChatsContainer.js";

export interface IProps extends IBlockProps {
    children: [ChatsContainer];
}

interface IContextTemplate {
    body: string;
}

export class AsideBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "aside", className: 'sidebar'}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            body: this.props.children?.[0].getId(),
        }
        return template(context);
    }
}