import {Block, IBlockProps} from "../../../common/block/Block";
import {PhotoBlock} from "../../../common/photo/PhotoBlock";
import {templateString} from './PhotoHover.template';
import {compile} from "handlebars";

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
        return compile<IContextTemplate>(templateString)({
            photo: this.props.children?.[0].getId(),
        });
    }
}
