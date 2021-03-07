import {Block, IBlockProps} from "../../../common/element/Block.js";
import {templateString} from './ChatsContainer.template.js'
import {ChatBlock} from "./chat-preview/ChatBlock.js";

export interface IProps extends IBlockProps {
    children: ChatBlock[];
}

export class ChatsContainer extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "ul", className: "sidebar__body"}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            chats: this.props.children?.map(child => child.getId())
        }
        return template(context);
    }
}