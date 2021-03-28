import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './ProfilePage.template.js'
import {FieldsBlock} from "../../blocks/fields/FieldsBlock.js";
import {PhotoBlock} from "../../common/photo/PhotoBlock.js";
import {PhotoHover} from "../../blocks/change-photo/photo-hover/PhotoHover.js";
import {Link} from "../../common/link/Link.js";
import {Modal} from "../../common/modal/Modal.js";
import {IUser} from "../../../models.js";
import {Store} from "../../../utils/Store.js";

export interface IProps extends IBlockProps {
    isEdit: boolean;
    username?: string;
    children: [FieldsBlock, PhotoBlock | PhotoHover, Link, FieldsBlock, Modal?];
}

interface IContextTemplate {
    username: string;
    isEdit: boolean;
    backlink: string;
    photo: string;
    fields: string;
    actions: string;
    modal?: string;
}

const store = new Store();

export class ProfilePage extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div", className: "profile-page"}, props);
    }

    componentDidMount() {
        const user = store.getValue('user');

        if (user?.first_name && user?.second_name) {
            this.props.username = `${user.first_name} ${user.second_name[0]}`;
        }

        store.subscribe((user: IUser) => {
            if (user?.first_name && user?.second_name) {
                this.props.username = `${user.first_name} ${user.second_name[0]}`;
            }
        }, 'user');
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            username: this.props.username || '',
            isEdit: this.props.isEdit,
            backlink: this.props.children[2]?.getId(),
            photo: this.props.children[1]?.getId(),
            fields: this.props.children[0]?.getId(),
            actions: this.props.children[3]?.getId(),
            modal: this.props.children[4]?.getId(),
        }
        return template(context);
    }
}
