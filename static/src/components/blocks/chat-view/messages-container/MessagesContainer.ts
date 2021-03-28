import {Block, IBlockProps} from "../../../common/block/Block.js";
import {templateString} from './MessagesContainer.template.js'
import {Message} from "./message/Message.js";

export interface IProps extends IBlockProps {
    children?: Message[];
    chatId?: number;
}

interface IContextTemplate {
    messages?: string[];
}

export class MessagesContainer extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div"}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            messages: this.props.children?.map(child => child.getId())
        }
        return template(context);
    }
}