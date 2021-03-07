import {Block, IBlockProps} from "../../../../common/element/Block.js";
import {templateString} from './Message.template.js'
import {PhotoBlock} from "../../../../common/photo/PhotoBlock.js";

interface IProps extends IBlockProps {
    isYourMsg: boolean,
    msgText: string,
    msgDate: string,
    isRead: boolean,
    attachedImg?: boolean,
    children: [PhotoBlock],
}

export class Message extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div"}, props);
    }

    render() {
        const {
            children,
            isYourMsg,
            msgText,
            attachedImg,
            msgDate,
            isRead,
        } = this.props;
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            photo: children[0]?.getId(),
            isYourMsg,
            msgText,
            attachedImg,
            msgDate,
            isRead
        }
        return template(context);
    }
}