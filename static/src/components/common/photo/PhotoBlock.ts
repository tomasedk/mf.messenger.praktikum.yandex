import {Block} from "../block/Block";
import {templateString} from './PhotoBlock.template';
import {Store} from "../../../utils/Store";
import {LoginController} from "../../../controllers/loginController";
import {IUser} from "../../../models";
import {compile} from "handlebars";

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
        return compile<IContextTemplate>(templateString)({
            initials: this.props?.initials || '',
        })
    }
}
