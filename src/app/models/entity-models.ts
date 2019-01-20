export class EntityPreviewModel {
    EntityTypeId: number;
    EntityId: number;
    Name: string;
    Image: string;
    Message: string;
}

export class ActivityModel {
    Contacts: EntityPreviewModel[];
    Groups: EntityPreviewModel[];
    Events: EntityPreviewModel[];
}