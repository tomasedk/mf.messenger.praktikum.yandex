import {Block} from "../../../common/block/Block";
import {templateString} from './ModalBody.template';
import {compile} from "handlebars";

export interface IProps {}

export class ModalBody extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div', className: 'modal__body'}, props);
    }

    render() {
        return compile<void>(templateString)();
    }
}
