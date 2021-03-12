import {Block} from "../block/Block.js";
import {templateString} from './Field.template.js'

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
        const template = window.Handlebars.compile<IContextTemplate>(templateString);
        const context = {name, value};

        return template(context);
    }
}