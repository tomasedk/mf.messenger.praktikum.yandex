import {router, ROUTES} from './src/utils/Router.js';
import {StartPage} from './src/components/pages/start/StartPage.js';
import {WebchatPage} from './src/components/pages/webchat/WebchatPage.js';
import {ProfilePage} from "./src/components/pages/profile/ProfilePage.js";
import {FallbackPage} from "./src/components/pages/fallback/FallbackPage.js";
import {loginProps} from './src/pages/start/login.js';
import {logonProps} from './src/pages/start/logon.js';
import {profileDetailsProps} from "./src/pages/profile/details.js";
import {profileChangePasswordProps} from "./src/pages/profile/password_page.js";
import {profileEditProps} from "./src/pages/profile/edit.js";
import {notFoundProps} from "./src/pages/fallback/404.js";
import {internalServerProps} from "./src/pages/fallback/500.js";

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