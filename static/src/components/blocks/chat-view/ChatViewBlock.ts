import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './ChatViewBlock.template.js'
import {MessagesContainer} from "./messages-container/MessagesContainer.js";

interface IHeader {
    username: string;
    onlineTimeAgo: string;
}

interface IProps extends IBlockProps {
    header: IHeader;
    children: [MessagesContainer];
}

interface IContextTemplate {
    header: IHeader;
    messages: string;
}

export class ChatViewBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div"}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            header: this.props.header,
            messages: this.props.children?.[0].getId(),
        }
        return template(context);
    }
}