import {Block, IBlockProps} from "../../../core/Block";
import {templateString} from "./StartPage.template"
import {Button} from "../../common/button/Button";
import {Link} from "../../common/link/Link";
import {FieldsBlock} from "../../blocks/fields/FieldsBlock";
import {compile} from "handlebars";

interface IHeader {
    text: string;
    classModificator: string;
}

export interface IProps extends IBlockProps {
    header: IHeader;
    children: [FieldsBlock, Button, Link];
}

interface IContextTemplate {
    header: IHeader;
    fields: string;
    submitButtonId: string;
    linkId: string;
}

export class StartPage extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "main", className: "start-page"}, props);
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            header: this.props.header,
            fields: this.props.children?.[0].getId(),
            submitButtonId: this.props.children?.[1].getId(),
            linkId: this.props.children?.[2].getId(),
        });
    }
}
