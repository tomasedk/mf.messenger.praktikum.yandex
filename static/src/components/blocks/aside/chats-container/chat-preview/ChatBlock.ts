import {Block, IBlockProps} from "../../../../common/block/Block.js";
import {templateString} from './ChatBlock.template.js'
import {PhotoBlock} from "../../../../common/photo/PhotoBlock.js";

export interface IProps extends IBlockProps {
    isSelected: boolean,
    newMsgsCount: number;
    msgDate: string;
    msgText: string,
    fullName: string,
    isYourLastMsg?: boolean,
    children: [PhotoBlock],
}

export class ChatBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "li", className: props.isSelected ? 'chat chat_selected' : 'chat'}, props);
    }

    render() {
        const {
            isSelected,
            children,
            fullName,
            isYourLastMsg,
            msgText,
            msgDate,
            newMsgsCount
        } = this.props;
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            isSelected,
            photo: children[0]?.getId(),
            fullName,
            isYourLastMsg,
            msgText,
            msgDate,
            newMsgsCount,
            noNewMsgs: newMsgsCount < 1
        }
        return template(context);
    }
}