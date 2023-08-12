export enum Message {
    UNAUTHORIZED= 'Unauthorized',
    DISABLED= 'Disabled'
}

export enum ErrorMessage {
    // auth
    UNAUTHORIZED= 'Unauthorized',
    INVALID_USERNAME= 'Wrong Username/Password',
    OLD_PASSWORD_NOT_MATCH='Current password does not match!',
    ACCOUNT_DISABLED= 'Account has been disabled'
}

export enum ErrorCode {
    // auth
    UNAUTHORIZED= 'Unauthorized',
    INVALID_USERNAME= 'InvalidUsername',
    OLD_PASSWORD_NOT_MATCH='oldPasswordDoestNotMatched',
    ACCOUNT_DISABLED= 'AccountDisabled'
}