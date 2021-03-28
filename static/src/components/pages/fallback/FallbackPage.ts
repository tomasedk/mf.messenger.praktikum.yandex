import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './FallbackPage.template.js';
import {Link} from "../../common/link/Link.js";

export interface IProps extends IBlockProps {
    statusCode: string;
    desc: string;
    children: [Link];
}

interface IContextTemplate {
    statusCode: string;
    desc: string;
}

export class FallbackPage extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "main", className: "fallback-page"}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);
        const context = {
            statusCode: this.props.statusCode,
            desc: this.props.desc,
            link: this.props.children?.[0].getId(),
        }
        return template(context);
    }
}