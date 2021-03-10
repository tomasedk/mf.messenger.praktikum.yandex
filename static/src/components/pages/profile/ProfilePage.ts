import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './ProfilePage.template.js'
import {FieldsBlock} from "../../blocks/fields/FieldsBlock.js";
import {PhotoBlock} from "../../common/photo/PhotoBlock.js";
import {PhotoHover} from "../../../pages/profile/edit/change-photo/photo-hover/PhotoHover.js";
import {Link} from "../../common/link/Link.js";
import {Modal} from "../../common/modal/Modal.js";

export interface IProps extends IBlockProps {
    isEdit: boolean,
    username: string,
    children: [FieldsBlock, PhotoBlock | PhotoHover, Link, FieldsBlock, Modal?]
}

export class ProfilePage extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div", className: "profile-page"}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            username: this.props.username,
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
