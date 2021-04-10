import {compile} from 'handlebars';
import {Block} from '../../../../core/Block';
import {templateString} from './ModalBody.template';

export class ModalBody extends Block<Record<string, never>> {
    constructor(props: Record<string, never>) {
        super({tagName: 'div', className: 'modal__body'}, props);
    }

    render() {
        return compile<void>(templateString)();
    }
}
