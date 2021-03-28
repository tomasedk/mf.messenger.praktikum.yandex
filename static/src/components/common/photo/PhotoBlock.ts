import {Block} from "../block/Block.js";
import {templateString} from './PhotoBlock.template.js'
import {Store} from "../../../utils/Store.js";
import {LoginController} from "../../../controllers/loginController.js";
import {IUser} from "../../../models.js";

interface IProps {
    additionalClasses: string;
    initials?: string;
}

interface IContextTemplate {
    initials: string;
}

const loginController = new LoginController();
const store = new Store();

export class PhotoBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: 'div', className: `photo ${props.additionalClasses || ''}`}, props);
    }

    componentDidMount() {
        const user = store.getValue('user');

        if (!user?.id) {
            loginController.getUserInfo();
        }

        store.subscribe((user: IUser) => {
            this.props.initials = user?.first_name[0] + user?.second_name[0];
        }, 'user');
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            initials: this.props?.initials || '',
        }
        return template(context);
    }
}