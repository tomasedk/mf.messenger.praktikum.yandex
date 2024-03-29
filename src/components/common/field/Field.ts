import {compile} from 'handlebars';
import {Block} from '../../../core/Block';
import {templateString} from './Field.template';

interface IProps {
    name: string;
    value: string;
}

interface IContextTemplate {
    name: string;
    value: string;
}

export class Field extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div'}, props);
    }

    render() {
        const {name, value} = this.props;

        return compile<IContextTemplate>(templateString)({name, value});
    }
}
