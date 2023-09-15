export enum Status {
    SUCCESS = 'OK',
    FAILED = 'FAILED'
}

export enum Message {
    UNAUTHORIZED = 'Unauthorized',
    DISABLED = 'Disabled'
}

export enum ErrorMessage {
    // auth
    UNAUTHORIZED = 'Unauthorized',
    INVALID_USERNAME = 'Wrong Username/Password',
    OLD_PASSWORD_NOT_MATCH = 'Current password does not match!',
    ACCOUNT_DISABLED = 'Account has been disabled',
    SOMETHING_WENT_WRONG = 'Something went wrong, please contact support team.',
    NOT_ACCEPTABLE = 'Not acceptable, missing parameters or bad parameters. This is the most common error code when field validation fails for any reason.',
    RECORD_IS_EXISTS = 'The {} already exists',
    ERROR_UNKNOWN = 'Something went wrong'
}

export enum TranCode {
    // auth
    UNAUTHORIZED = 'Unauthorized',
    INVALID_USERNAME = 'InvalidUsername',
    OLD_PASSWORD_NOT_MATCH = 'oldPasswordDoestNotMatched',
    ACCOUNT_DISABLED = 'AccountDisabled'
}

export enum ErrorCode {
    // auth
    NOT_ACCEPTABLE = 406, // Not acceptable, missing parameters or bad parameters. This is the most common error code when field validation fails for any reason.
    INVALID_USERNAME = 'InvalidUsername',
    OLD_PASSWORD_NOT_MATCH = 'oldPasswordDoestNotMatched',
    ACCOUNT_DISABLED = 'AccountDisabled',
    RECORD_IS_EXISTS = 407,
    ERROR_UNKNOWN = 5
}

export enum ResponseStatusCode {
    INVALID_USERNAME = 'InvalidUsername',
    OLD_PASSWORD_NOT_MATCH = 'oldPasswordDoestNotMatched',
    RECORD_EXISTS = 'RecordExists',
    ERROR_UNKNOWN = 'UnknownError'
}

export enum AppUserMessage {
    UNAUTHORIZED = 'Unauthorized',
    USER_IS_ACTIVE = 'User is active',
    USER_IS_DISABLED = 'User is disabled',
    USER_IS_SUSPENDED = 'User is suspended',
    USER_IS_BANNED = 'User is banned',
    USER_IS_CLOSED = 'User is closed'
}
