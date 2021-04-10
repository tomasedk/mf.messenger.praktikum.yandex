import {
    IAddUserData,
    IChangePasswordReqParams,
    IEditProfileReq,
    ILoginData,
    ILogonData,
    IUser,
} from '../models';
import {TLog} from './formUtils';

export const addUserTypeGuard = (data: TLog): data is TLog & IAddUserData => {
    return typeof data.login === 'string';
};

export const loginTypeGuard = (data: TLog): data is TLog & ILoginData => {
    return typeof data.login === 'string' && typeof data.password === 'string';
};

export const changeLoginTypeGuard = (data: any): data is IChangePasswordReqParams => {
    return typeof data.oldPassword === 'string' && typeof data.newPassword === 'string';
};

export const logonTypeGuard = (data: TLog): data is TLog & ILogonData => {
    return (
        typeof data.first_name === 'string' &&
        typeof data.second_name === 'string' &&
        typeof data.login === 'string' &&
        typeof data.email === 'string' &&
        typeof data.password === 'string' &&
        typeof data.phone === 'string'
    );
};

export const userTypeGuard = (data: any): data is IUser => {
    return (
        typeof data.id === 'number' &&
        typeof data.first_name === 'string' &&
        typeof data.second_name === 'string' &&
        (typeof data.display_name === 'string' || data.display_name === null) &&
        typeof data.login === 'string' &&
        typeof data.email === 'string' &&
        typeof data.phone === 'string' &&
        (typeof data.avatar === 'string' || data.avatar === null)
    );
};

export const userUpdateTypeGuard = (data: any): data is IEditProfileReq => {
    return (
        typeof data.first_name === 'string' &&
        typeof data.second_name === 'string' &&
        (typeof data.display_name === 'string' || data.display_name === null) &&
        typeof data.login === 'string' &&
        typeof data.email === 'string'
    );
};
