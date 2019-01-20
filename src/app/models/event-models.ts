export class AddEventModel
{
    Title: string;
    Image: string;
    Message: string;
    Users: number[];
    Groups: number[];
    CreatedBy: string;
}

export class EditEventModel
{
    EventId: number;
    Title: string;
    Image: string;
    Message: string;
    Users: number[];
    Groups: number[];
    DateTime: number;
    OccationId: number;
    CreatedBy: string;
}