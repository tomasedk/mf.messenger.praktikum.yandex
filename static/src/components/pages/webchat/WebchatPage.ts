import {Block} from "../../common/element/Block.js";
import {templateString} from './WebchatPage.template.js'
import {AsideBlock} from "../../blocks/aside/AsideBlock.js";
import {Modal} from "../../common/modal/Modal.js";
import {ChatViewBlock} from "../../blocks/chat-view/ChatViewBlock.js";

export interface IProps {
    children: [AsideBlock, Modal?, ChatViewBlock?]
}

export class WebchatPage extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div", className: "messenger"}, props);
    }

    render() {
        const template = (window as any).Handlebars.compile(templateString);

        const context = {
            aside: this.props.children[0]?.getId(),
            modal: this.props.children[1]?.getId(),
            selectedChat: this.props.children[2]?.getId(),
        }
        return template(context);
    }
}
