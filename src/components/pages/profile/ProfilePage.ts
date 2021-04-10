import {Block, IBlockProps} from "../../../core/Block";
import {templateString} from './ProfilePage.template';
import {FieldsBlock} from "../../blocks/fields/FieldsBlock";
import {PhotoBlock} from "../../common/photo/PhotoBlock";
import {PhotoHover} from "../../blocks/change-photo/photo-hover/PhotoHover";
import {Link} from "../../common/link/Link";
import {Modal} from "../../common/modal/Modal";
import {IUser} from "../../../models";
import {Store} from "../../../core/Store";
import {compile} from "handlebars";

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
        return compile<IContextTemplate>(templateString)({
            username: this.props.username || '',
            isEdit: this.props.isEdit,
            backlink: this.props.children[2]?.getId(),
            photo: this.props.children[1]?.getId(),
            fields: this.props.children[0]?.getId(),
            actions: this.props.children[3]?.getId(),
            modal: this.props.children[4]?.getId(),
        });
    }
}
