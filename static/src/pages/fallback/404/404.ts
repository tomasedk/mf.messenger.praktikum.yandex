import {FallbackPage} from '../../../components/pages/fallback/FallbackPage.js'
import {Block} from "../../../components/common/block/Block.js";

const NotFoundPage = new FallbackPage({
    statusCode: 404,
    desc: 'Не туда попали'
});

Block.injectInDOM(".app", NotFoundPage);