export class LoginModel
{
    UserName: string;
    Password: string;
    RememberMe: boolean;
}

export class TokenModel
{
    access_token: string;
    token_type: string;
    expires_in: string;
    userName: string;
}

export class RegisterModel
{
    Mobile: string;
    Email: string;
    Password: string;
}

export class StringModel
{
    Id: number;
    Text: string;
}

export class BooleanModel
{
    Id: number;
    Value: boolean;
}