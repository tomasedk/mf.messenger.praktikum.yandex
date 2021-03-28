import {Block, IBlockProps, IMeta} from "../block/Block.js";
import {templateString} from './Form.template.js';
import {Button} from "../button/Button.js";
import {Input} from "../input/Input.js";
import {ModalBody} from "../../blocks/change-photo/modal-body/ModalBody.js";

interface IProps extends IBlockProps {
    children: [Button, Input | ModalBody];
}

interface IContextTemplate {
    footer: string;
    body: string;
}

export class Form extends Block<IProps> {
    constructor(meta: IMeta, props: IProps) {
        super({
            tagName: 'form',
            className: meta.className,
            extraAttributes: {
                enctype: "multipart/form-data",
                action: "#",
            }
        }, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            footer: this.props.children?.[0].getId(),
            body: this.props.children?.[1].getId(),
        }
        return template(context);
    }
}