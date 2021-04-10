import {compile} from 'handlebars';
import {Block, IBlockProps} from '../../../core/Block';
import {templateString} from './Modal.template';
import {Form} from '../form/Form';

interface IProps extends IBlockProps {
    title: string;
    additionalClasses: string;
    children: [Form?];
}

interface IContextTemplate {
    additionalClasses: string;
    title: string;
    form?: string;
}

export class Modal extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div'}, props);
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            title: this.props.title,
            additionalClasses: this.props.additionalClasses,
            form: this.props.children?.[0]?.getId(),
        });
    }
}
