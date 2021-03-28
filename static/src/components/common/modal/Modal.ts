import {Block, IBlockProps} from "../block/Block.js";
import {templateString} from './Modal.template.js'
import {Form} from "../form/Form.js";

interface IProps extends IBlockProps {
    title: string;
    additionalClasses: string;
    children: [Form?];
}

interface IContextTemplate {
    additionalClasses: string;
    title: string;
}

export class Modal extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div'}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            title: this.props.title,
            additionalClasses: this.props.additionalClasses,
            form: this.props.children?.[0]?.getId(),
        }
        return template(context);
    }
}