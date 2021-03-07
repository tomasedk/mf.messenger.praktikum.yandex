import {Block, IBlockProps, IMeta} from "../element/Block.js";
import {templateString} from './Input.template.js'

interface IProps extends IBlockProps {
    id: string,
    type: string,
    label: string,
    additionalClasses?: string,
    error?: string,
}

export class Input extends Block<IProps> {
    constructor(meta: IMeta, props: IProps) {
        super({tagName: 'div', className: meta.className || ''}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);
        const context = {
            additionalClasses: this.props.additionalClasses || '',
            id: this.props.id,
            type: this.props.type,
            label: this.props.label,
            error: this.props.error,
        }

        return template(context);
    }
}