import {Block} from "../element/Block.js";
import {templateString} from './Field.template.js'

interface IProps {
    name: string,
    value: string,
}

export class Field extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div"}, props);
    }

    render() {
        const {name, value} = this.props;
        const template = (window as any).Handlebars.compile(templateString);
        const context = {name, value};

        return template(context);
    }
}