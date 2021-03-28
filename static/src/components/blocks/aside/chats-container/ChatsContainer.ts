import {Block, IBlockProps} from "../../../common/block/Block.js";
import {templateString} from './ChatsContainer.template.js'
import {ChatBlock} from "./chat-preview/ChatBlock.js";
import {PhotoBlock} from "../../../common/photo/PhotoBlock.js";
import {Store} from "../../../../utils/Store.js";
import {IChat} from "../../../../models.js";

export interface IProps extends IBlockProps {
    children: ChatBlock[];
}

interface IContextTemplate {
    chats: string[];
}

const getChatblock = ({id, isSelected, newMsgsCount, msgDate, msgText, fullName}: IChat): ChatBlock => {
    const initialsArr = fullName.split(' ');
    const initials = (initialsArr.length > 1 ? `${initialsArr[0][0]}${initialsArr[1][0]}` : initialsArr[0][0]).toUpperCase();

    return new ChatBlock({
        isSelected,
        newMsgsCount,
        msgDate: msgDate || '',
        msgText: msgText || '',
        children: [
            new PhotoBlock({
                initials,
                additionalClasses: 'chat__user-photo'
            })
        ],
        fullName,
        id,
    })
}

let store = new Store();

export class ChatsContainer extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "ul", className: "sidebar__body"}, props);
    }

    componentDidMount() {
        store.subscribe((newChats: IChat[]) => {
            this.props.children = newChats.map(newChat => getChatblock(newChat));
        }, 'chats');
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            chats: this.props.children?.map(child => child.getId())
        }
        return template(context);
    }
}