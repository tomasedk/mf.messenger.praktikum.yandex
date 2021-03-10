import {Block, IBlockProps} from "../../../../../components/common/block/Block.js";
import {PhotoBlock} from "../../../../../components/common/photo/PhotoBlock.js";
import {templateString} from './PhotoHover.template.js'

export interface IProps extends IBlockProps {
    children: [PhotoBlock]
}

export class PhotoHover extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div"}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);
        return template({
            photo: this.props.children?.[0].getId(),
        });
    }
}
