import {Block} from "../../../components/common/block/Block";
import {templateString} from "../../../components/blocks/fields/FieldsBlock.template";
import {Input} from "../../../components/common/input/Input";
import {compile} from "handlebars";

interface IProps {
    children: Input[];
}

interface IContextTemplate {
    fields?: string[];
}

export class EditPassword extends Block<IProps> {
    constructor(props: IProps) {
        props.children = [
            new Input({}, {
                additionalClasses: 'profile-page__editing-field',
                id: 'oldPassword',
                type: 'password',
                label: 'Старый пароль',
                error: 'Неверный пароль'
            }),
            new Input({}, {
                additionalClasses: 'profile-page__editing-field',
                id: 'password',
                type: 'password',
                label: 'Новый пароль',
                error: 'Неверный пароль'
            }),
            new Input({}, {
                additionalClasses: 'profile-page__editing-field',
                id: 'newPassword',
                type: 'password',
                label: 'Повторите новый пароль',
                error: 'Неверный пароль'
            }),
        ];

        super({className: "profile-page__body"}, props);
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            fields: this.props.children?.map((child: Input) => child.getId()),
        });
    }
}
