import {Block} from "../block/Block";
import {templateString} from './Field.template';
import {compile} from "handlebars";

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
        super({tagName: "div"}, props);
    }

    render() {
        const {name, value} = this.props;

        return compile<IContextTemplate>(templateString)({name, value});
    }
}
