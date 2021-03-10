import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './StartPage.template.js'
import {Button} from "../../common/button/Button";
import {Link} from "../../common/link/Link";
import {FieldsBlock} from "../../blocks/fields/FieldsBlock.js";

interface IHeader {
    text: string,
    classModificator: string,
}

export interface IProps extends IBlockProps {
    header: IHeader,
    children: [FieldsBlock, Button, Link]
}

export class StartPage extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "main", className: "start-page"}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            header: this.props.header,
            fields: this.props.children?.[0].getId(),
            submitButtonId: this.props.children?.[1].getId(),
            linkId: this.props.children?.[2].getId(),
        }
        return template(context);
    }
}
