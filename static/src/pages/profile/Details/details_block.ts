import {Block} from "../../../components/common/block/Block.js";
import {templateString} from "../../../components/blocks/fields/FieldsBlock.template.js";
import {Field} from "../../../components/common/field/Field.js";
import {Store} from "../../../utils/Store.js";
import {LoginController} from "../../../controllers/loginController.js";
import {IUser} from "../../../models.js";

interface IProps {
    children?: Field[];
}

interface IContextTemplate {
    fields?: string[];
}

const loginController = new LoginController();
const store = new Store();

export class DetailsBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({className: "profile-page__body"}, props);
    }

    componentDidMount() {
        const user = store.getValue('user');

        if (!user?.id) {
            loginController.getUserInfo();
        }

        store.subscribe((user: IUser) => {
            this.props.children = [
                new Field({name: 'Почта', value: user?.email}),
                new Field({name: 'Логин', value: user?.login}),
                new Field({name: 'Имя', value: user?.first_name}),
                new Field({name: 'Фамилия', value: user?.second_name}),
                new Field({name: 'Имя в чате', value: user?.display_name}),
                new Field({name: 'Телефон', value: user?.phone}),
            ];
        }, 'user');
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            fields: this.props.children?.map((child: Field) => child.getId()),
        }

        return template(context);
    }
}