import {router, ROUTES} from './src/utils/Router';
import {StartPage} from './src/components/pages/start/StartPage';
import {WebchatPage} from './src/components/pages/webchat/WebchatPage';
import {ProfilePage} from "./src/components/pages/profile/ProfilePage";
import {FallbackPage} from "./src/components/pages/fallback/FallbackPage";
import {loginProps} from './src/pages/start/login';
import {logonProps} from './src/pages/start/logon';
import {profileDetailsProps} from "./src/pages/profile/details";
import {profileChangePasswordProps} from "./src/pages/profile/password_page";
import {profileEditProps} from "./src/pages/profile/edit";
import {notFoundProps} from "./src/pages/fallback/404";
import {internalServerProps} from "./src/pages/fallback/500";
import './common.less';
import './src/styles/start_page.less';
import './src/styles/fallbacks.less';
import './src/styles/webchat.less';
import './src/styles/profile.less';

router
    .use(ROUTES.START.LOGIN, StartPage, loginProps)
    .use(ROUTES.START.LOGON, StartPage, logonProps)
    .use(ROUTES.WEBCHAT, WebchatPage)
    .use(ROUTES.PROFILE.DETAILS, ProfilePage, profileDetailsProps)
    .use(ROUTES.PROFILE.EDIT, ProfilePage, profileEditProps)
    .use(ROUTES.PROFILE.CHANGE_PASSWORD, ProfilePage, profileChangePasswordProps)
    .use(ROUTES.FALLBACK.NOT_FOUND, FallbackPage, notFoundProps)
    .use(ROUTES.FALLBACK.INTERNAL_SERVER, FallbackPage, internalServerProps)
    .start();
