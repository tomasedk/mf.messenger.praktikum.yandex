import {compile} from 'handlebars';
import {Block, IBlockProps, IMeta} from '../../../core/Block';
import {templateString} from './Input.template';

interface IProps extends IBlockProps {
    id: string;
    type: string;
    label: string;
    additionalClasses?: string;
    error?: string;
}

interface IContextTemplate {
    additionalClasses: string;
    id: string;
    type: string;
    label: string;
    error?: string;
}

export class Input extends Block<IProps> {
    constructor(meta: IMeta, props: IProps) {
        super({tagName: 'div', className: meta.className || ''}, props);
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            additionalClasses: this.props.additionalClasses || '',
            id: this.props.id,
            type: this.props.type,
            label: this.props.label,
            error: this.props.error,
        });
    }
}
