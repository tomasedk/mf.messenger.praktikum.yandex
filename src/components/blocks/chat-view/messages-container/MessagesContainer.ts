import {Block, IBlockProps} from "../../../../core/Block";
import {templateString} from './MessagesContainer.template';
import {Message} from "./message/Message";
// import {IChat} from "../../../../models";
// import {AsideBlock} from "../../aside/AsideBlock";
// import {Modal} from "../../../common/modal/Modal";
// import {ChatViewBlock} from "../ChatViewBlock";
// import {Store} from "../../../../utils/Store";
import {PhotoBlock} from "../../../common/photo/PhotoBlock";
import {Store} from "../../../../core/Store";
import {compile} from "handlebars";

export interface IProps extends IBlockProps {
    children?: Message[];
    chatId?: number;
}

interface IContextTemplate {
    messages?: string[];
}

const store = new Store();

export class MessagesContainer extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div", className: "messages-container"}, props);
    }

    componentDidMount() {
        store.subscribe((messages: any[]) => {
            if (messages) {
                this.props.children = messages.map(message => new Message({
                    isYourMsg: message.isYourMsg,
                    msgText: message.msgText,
                    msgDate: message.msgDate,
                    isRead: message.isRead,
                    attachedImg: false,
                    children: [new PhotoBlock({
                        initials: 'F D',
                        additionalClasses: 'chat__user-photo'
                    })],
                }));
            }
        }, 'messages');
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            messages: this.props.children?.map(child => child.getId())
        });
    }
}
