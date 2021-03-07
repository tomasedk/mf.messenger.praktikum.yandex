import {Block} from "../../common/element/Block.js";
import {templateString} from './FallbackPage.template.js'

export interface IProps {
    statusCode: number,
    desc: string;
}

export class FallbackPage extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "main", className: "fallback-page"}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);
        const context = {
            statusCode: this.props.statusCode,
            desc: this.props.desc
        }
        return template(context);
    }
}