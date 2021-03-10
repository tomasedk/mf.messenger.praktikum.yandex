import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './ChatViewBlock.template.js'
import {MessagesContainer} from "./messages-container/MessagesContainer.js";

interface IHeader {
    username: string,
    onlineTimeAgo: string
}

interface IProps extends IBlockProps {
    header: IHeader,
    children: [MessagesContainer],
}

export class ChatViewBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div"}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            header: this.props.header,
            messages: this.props.children?.[0].getId(),
        }
        return template(context);
    }
}