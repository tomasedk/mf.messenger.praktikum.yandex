import {Block, IBlockProps} from "../../../../../core/Block";
import {templateString} from './ChatBlock.template';
import {PhotoBlock} from "../../../../common/photo/PhotoBlock";
import {Store} from "../../../../../core/Store";
import {IChat} from "../../../../../models";
import {compile} from "handlebars";

export interface IChatBlockProps extends IBlockProps {
    isSelected: boolean;
    newMsgsCount: number;
    msgDate: string;
    msgText: string;
    fullName: string;
    isYourLastMsg?: boolean;
    children: [PhotoBlock];
    id?: number;
}

interface IContextTemplate {
    isSelected: boolean;
    photo: string;
    fullName: string;
    isYourLastMsg?: boolean;
    msgDate: string;
    msgText: string;
    newMsgsCount: number;
    noNewMsgs: boolean;
}

let store = new Store();

export class ChatBlock extends Block<IChatBlockProps> {
    constructor(props: IChatBlockProps) {
        super({tagName: "li", className: props.isSelected ? 'chat chat_selected' : 'chat'}, props);
    }

    componentDidMount() {
        const that = this;
        this.props.events = {
            click: function (_e) {
                let chats: IChat[] = store.getValue('chats');

                chats.forEach(chat => {
                    chat.isSelected = chat.id === that.props.id;
                    return chat;
                });

                // TODO: Такой хак сделан для того, чтобы триггернуть событие уведомления подписчиков.
                store.setValue('chats', chats);
            }
        }
    }

    render() {
        const {
            isSelected,
            children,
            fullName,
            isYourLastMsg,
            msgText,
            msgDate,
            newMsgsCount
        } = this.props;

        return compile<IContextTemplate>(templateString)({
            isSelected,
            photo: children[0]?.getId(),
            fullName,
            isYourLastMsg,
            msgText,
            msgDate,
            newMsgsCount,
            noNewMsgs: newMsgsCount < 1
        });
    }
}
