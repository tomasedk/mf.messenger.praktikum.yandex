import {Block} from "../block/Block.js";
import {templateString} from './PhotoBlock.template.js'

interface IProps {
    additionalClasses: string;
    initials: string;
}

interface IContextTemplate {
    initials: string;
}

export class PhotoBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div', className: `photo ${props.additionalClasses || ''}`}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            initials: this.props.initials,
        }
        return template(context);
    }
}