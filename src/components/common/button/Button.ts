import {compile} from 'handlebars';
import {Block, IBlockProps, IMeta} from '../../../core/Block';
import {templateString} from './Button.template';

interface IProps extends IBlockProps {
    value: string;
}

interface IContextTemplate {
    value: string;
}

export class Button extends Block<IProps> {
    constructor(meta: IMeta, props: IProps) {
        super({tagName: 'div', className: meta.className}, props);
    }

    render() {
        const {value} = this.props;

        return compile<IContextTemplate>(templateString)({value});
    }
}
