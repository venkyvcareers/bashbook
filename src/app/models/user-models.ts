export class UserModel {
    UserId: number;
    Message: string;
    Image: string = 'assets/images/user-avatar1.png';
    FirstName: string;
    LastName: string;
    Email: string;
    Mobile: string;
    GenderId: number;
}

export class UserRegisterModel
{
    Email: string;
    Mobile: string;
}

export class UserGeneralViewModel
{
    UserId: number;
    Image: string;
    FirstName: string;
    LastName: string;
}