import {Block, IBlockProps} from "../../../core/Block";
import {templateString} from './AsideBlock.template';
import {ChatsContainer} from "./chats-container/ChatsContainer";
import {Link} from "../../common/link/Link";
import {WebchatController} from "../../../controllers/webchatController";
import {compile} from "handlebars";

export interface IProps extends IBlockProps {
    children: [Link, ChatsContainer];
}

interface IContextTemplate {
    body: string;
    profileLink: string;
}

const webchatController = new WebchatController();

export class AsideBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'aside', className: 'sidebar'}, props);
    }

    componentDidMount() {
        this.props.events = {
            click: function (e: Event) {
                const addChatButton = (e.target as Element).closest('.round-button__add');
                // TODO: Наименование нового чата берется из строки поиска
                const searchInput = this.querySelector('.search__input') as HTMLInputElement | undefined;

                /**
                 * Обработчик создания чата.
                 */
                if (searchInput && addChatButton && this.contains(addChatButton)) {
                    webchatController.createChat({title: searchInput.value || 'New chat'});
                }
            }
        }
    }

    render() {
        const context = {
            profileLink: this.props.children?.[0].getId(),
            body: this.props.children?.[1].getId(),
        }

        return compile<IContextTemplate>(templateString)(context);
    }
}
