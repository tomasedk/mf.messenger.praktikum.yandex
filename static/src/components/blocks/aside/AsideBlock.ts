import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './AsideBlock.template.js'
import {ChatsContainer} from "./chats-container/ChatsContainer.js";
import {Link} from "../../common/link/Link.js";
import {WebchatController} from "../../../controllers/webchatController.js";

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
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            profileLink: this.props.children?.[0].getId(),
            body: this.props.children?.[1].getId(),
        }
        return template(context);
    }
}