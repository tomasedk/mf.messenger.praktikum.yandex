import {compile} from 'handlebars';
import {Block, IBlockProps} from '../../../../../core/Block';
import {templateString} from './Message.template';
import {PhotoBlock} from '../../../../common/photo/PhotoBlock';

export interface IMessage {
    isYourMsg: boolean;
    msgText: string;
    msgDate: string;
    isRead: boolean;
    attachedImg?: boolean;
}

interface IProps extends IBlockProps {
    isYourMsg: boolean;
    msgText: string;
    msgDate: string;
    isRead: boolean;
    attachedImg?: boolean;
    children: [PhotoBlock];
}

interface IContextTemplate {
    isYourMsg: boolean;
    msgText: string;
    msgDate: string;
    isRead: boolean;
    attachedImg?: boolean;
    photo: string;
}

export class Message extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div'}, props);
    }

    render() {
        const {children, isYourMsg, msgText, attachedImg, msgDate, isRead} = this.props;

        return compile<IContextTemplate>(templateString)({
            photo: children[0]?.getId(),
            isYourMsg,
            msgText,
            attachedImg,
            msgDate,
            isRead,
        });
    }
}
