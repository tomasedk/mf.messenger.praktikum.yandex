import {Block} from "../../../../../components/common/block/Block.js";
import {templateString} from './ModalBody.template.js'

export interface IProps {}

export class ModalBody extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div', className: 'modal__body'}, props);
    }

    render() {
        const template = window.Handlebars.compile<void>(templateString);
        return template();
    }
}
