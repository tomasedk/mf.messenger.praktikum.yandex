import {Block, IBlockProps} from "../../../common/block/Block.js";
import {templateString} from './ChatsContainer.template.js'
import {ChatBlock} from "./chat-preview/ChatBlock.js";

export interface IProps extends IBlockProps {
    children: ChatBlock[];
}

interface IContextTemplate {
    chats: string[];
}

export class ChatsContainer extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "ul", className: "sidebar__body"}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            chats: this.props.children?.map(child => child.getId())
        }
        return template(context);
    }
}