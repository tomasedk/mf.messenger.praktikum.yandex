import {router, ROUTES} from './core/Router';
import {StartPage} from './components/pages/start/StartPage';
import {WebchatPage} from './components/pages/webchat/WebchatPage';
import {ProfilePage} from "./components/pages/profile/ProfilePage";
import {FallbackPage} from "./components/pages/fallback/FallbackPage";
import {loginProps} from './pages/start/login';
import {logonProps} from './pages/start/logon';
import {profileDetailsProps} from "./pages/profile/details";
import {profileChangePasswordProps} from "./pages/profile/password_page";
import {profileEditProps} from "./pages/profile/edit";
import {notFoundProps} from "./pages/fallback/404";
import {internalServerProps} from "./pages/fallback/500";
import './styles/common.less';
import './styles/start_page.less';
import './styles/fallbacks.less';
import './styles/webchat.less';
import './styles/profile.less';

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
