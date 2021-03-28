/**
 * Интерфейс данных, необходимых для добавления пользователя в чат.
 */
export interface IAddUserData {
    login: string;
}

/**
 * Интерфейс данных, необходимых для логина.
 */
export interface ILoginData {
    login: string;
    password: string;
}

/**
 * Интерфейс данных, необходимых для создания чата.
 */
export interface ICreateChatReqParams {
    title: string;
}

/**
 * Интерфейс данных, необходимых для получения списка чатов.
 */
export interface IGetChatsParams {
    offset?: string;
    limit?: string;
    title?: string;
}

/**
 * Интерфейс ответа от сервера при успешном получении списка чатов.
 */
export interface IGetChatsRes {
    id: number;
    title: string;
    created_by: number;
    avatar?: string;
}

/**
 * Интерфейс ответа от сервера при запросе непрочитанных сообщений чата.
 */
export interface IGetUnreadMsgsRes {
    unread_count: number;
}

/**
 * Интерфейс данных, необходимых для добавления пользователей в чат.
 */
export interface IAddToChatParams {
    users: number[];
    chatId: number;
}

/**
 * Интерфейс данных, необходимых для регистрации.
 */
export interface ILogonData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

/**
 * Интерфейс информации о пользователе.
 */
export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

/**
 * Интерфейс чата.
 */
export interface IChat {
    isSelected: boolean,
    newMsgsCount: number,
    fullName: string,
    id: number,
    msgDate?: string,
    msgText?: string,
}

/**
 * Интерфейс данных, необходимых для изменения профиля пользователя.
 */
export interface IEditProfileReq {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone?:	string;
}

/**
 * Интерфейс ответа от сервера при успешном изменении данных пользователя.
 */
export interface IEditProfileRes {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
}

/**
 * Интерфейс ответа от сервера при успешной регистрации.
 */
export interface ILogonResponse {
    id: number;
}

/**
 * Интерфейс данных, необходимых для поиска пользователя по логину.
 */
export interface ISearchByLoginReqParams {
    login: string;
}

/**
 * Интерфейс данных, необходимых для смены пароля.
 */
export interface IChangePasswordReqParams {
    oldPassword: string;
    newPassword: string;
}
