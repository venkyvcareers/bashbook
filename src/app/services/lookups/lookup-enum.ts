
export enum Parents {
    EntityType = 1,
    ContentType,
    EventType,
    ContactStatus
}

export enum EntityTypes {
    User = 101,
    Group,
    Event
}

export enum ContentTypes {
    Image = 201,
    Audio,
    Video,
    Text
}

export enum EventTypes {
    Birthday = 301,
    Anniversary,
    Invitation,
    Party
}

export enum ContactStatuses {
    Accepted = 401,
    Rejected,
    Ignored,
    Requested
}