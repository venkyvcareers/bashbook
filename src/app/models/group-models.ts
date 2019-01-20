export class AddGroupModel
{
    Title: string;
    Image: string;
    Message: string;
    Users: number[];
    Groups: number[];
    CreatedBy: string;
}

export class EditGroupModel
{
    GroupId: number;
    Title: string;
    Image: string;
    Message: string;
    Users: number[];
    Groups: number[];
    CreatedBy: string;
    CreatedOn: number;
}