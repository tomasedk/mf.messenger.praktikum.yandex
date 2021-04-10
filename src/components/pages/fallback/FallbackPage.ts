import {Block, IBlockProps} from "../../../core/Block";
import {templateString} from './FallbackPage.template';
import {Link} from "../../common/link/Link";
import {compile} from "handlebars";

export interface IProps extends IBlockProps {
    statusCode: string;
    desc: string;
    children: [Link];
}

interface IContextTemplate {
    statusCode: string;
    desc: string;
    link?: string;
}

export class FallbackPage extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "main", className: "fallback-page"}, props);
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            statusCode: this.props.statusCode,
            desc: this.props.desc,
            link: this.props.children?.[0].getId(),
        });
    }
}
