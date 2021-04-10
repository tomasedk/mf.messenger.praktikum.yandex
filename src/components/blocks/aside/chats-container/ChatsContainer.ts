import {compile} from 'handlebars';
import {Block, IBlockProps} from '../../../../core/Block';
import {templateString} from './ChatsContainer.template';
import {ChatBlock} from './chat-preview/ChatBlock';
import {PhotoBlock} from '../../../common/photo/PhotoBlock';
import {Store} from '../../../../core/Store';
import {IChat} from '../../../../models';

export interface IProps extends IBlockProps {
    children: ChatBlock[];
}

interface IContextTemplate {
    chats: string[];
}

const getChatblock = ({
    id,
    isSelected,
    newMsgsCount,
    msgDate,
    msgText,
    fullName,
}: IChat): ChatBlock => {
    const initialsArr = fullName.split(' ');
    const initials = (initialsArr.length > 1
        ? `${initialsArr[0][0]}${initialsArr[1][0]}`
        : initialsArr[0][0]
    ).toUpperCase();

    return new ChatBlock({
        isSelected,
        newMsgsCount,
        msgDate: msgDate || '',
        msgText: msgText || '',
        children: [
            new PhotoBlock({
                initials,
                additionalClasses: 'chat__user-photo',
            }),
        ],
        fullName,
        id,
    });
};

const store = new Store();

export class ChatsContainer extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'ul', className: 'sidebar__body'}, props);
    }

    componentDidMount() {
        store.subscribe((newChats: IChat[]) => {
            this.props.children = newChats.map((newChat) => getChatblock(newChat));
        }, 'chats');
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            chats: this.props.children?.map((child) => child.getId()),
        });
    }
}
