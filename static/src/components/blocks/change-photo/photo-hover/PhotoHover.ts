import {Block, IBlockProps} from "../../../common/block/Block.js";
import {PhotoBlock} from "../../../common/photo/PhotoBlock.js";
import {templateString} from './PhotoHover.template.js'

export interface IProps extends IBlockProps {
    children: [PhotoBlock];
}

interface IContextTemplate {
    photo: string;
}

export class PhotoHover extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div"}, props);
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);
        return template({
            photo: this.props.children?.[0].getId(),
        });
    }
}
