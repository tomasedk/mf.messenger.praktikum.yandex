import {compile} from 'handlebars';
import {Block, IBlockProps} from '../../../../core/Block';
import {PhotoBlock} from '../../../common/photo/PhotoBlock';
import {templateString} from './PhotoHover.template';

export interface IProps extends IBlockProps {
    children: [PhotoBlock];
}

interface IContextTemplate {
    photo: string;
}

export class PhotoHover extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div'}, props);
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            photo: this.props.children?.[0].getId(),
        });
    }
}
