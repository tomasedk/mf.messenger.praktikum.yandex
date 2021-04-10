import {compile} from 'handlebars';
import {Block} from '../../../core/Block';
import {templateString} from '../../../components/blocks/fields/FieldsBlock.template';
import {Field} from '../../../components/common/field/Field';
import {Store} from '../../../core/Store';
import {LoginController} from '../../../controllers/loginController';
import {IUser} from '../../../models';

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
        super({className: 'profile-page__body'}, props);
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
        return compile<IContextTemplate>(templateString)({
            fields: this.props.children?.map((child: Field) => child.getId()),
        });
    }
}
