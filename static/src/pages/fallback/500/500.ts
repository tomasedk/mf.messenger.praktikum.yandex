import {FallbackPage} from '../../../components/pages/fallback/FallbackPage.js'
import {Block} from "../../../components/common/element/Block.js";

const InternalServerPage = new FallbackPage({
    statusCode: 500,
    desc: 'Мы уже фиксим'
});

Block.injectInDOM(".app", InternalServerPage);