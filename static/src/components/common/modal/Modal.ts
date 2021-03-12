import {Block, IBlockProps} from "../block/Block.js";
import {templateString} from './Modal.template.js'
import {Button} from "../button/Button.js";
import {Input} from "../input/Input.js";
import {ModalBody} from "../../../pages/profile/edit/change-photo/modal-body/ModalBody.js";

interface IProps extends IBlockProps {
    title: string;
    formClass: string;
    additionalClasses: string;
    children: [Button, Input | ModalBody];
}

interface IContextTemplate {
    additionalClasses: string;
    title: string;
    footer: string;
    body: string;
    formClass: string;
}

export class Modal extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div'}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            additionalClasses: this.props.additionalClasses,
            footer: this.props.children?.[0].getId(),
            body: this.props.children?.[1].getId(),
            title: this.props.title,
            formClass: this.props.formClass,
        }
        return template(context);
    }
}