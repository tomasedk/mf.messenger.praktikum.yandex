import {Block, IBlockProps, IMeta} from "../block/Block";
import {templateString} from './Form.template';
import {Button} from "../button/Button";
import {Input} from "../input/Input";
import {ModalBody} from "../../blocks/change-photo/modal-body/ModalBody";
import {compile} from "handlebars";

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
        return compile<IContextTemplate>(templateString)({
            footer: this.props.children?.[0].getId(),
            body: this.props.children?.[1].getId(),
        });
    }
}
