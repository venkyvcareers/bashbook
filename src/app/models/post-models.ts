export class PostViewModel {
      PostId: number;
      EntityTypeId: number;
      EntityId: number;
      ContentTypeId: number;
      Url: string;
      Title: string;
      LikeCount: number;
      ShareCount: number;
      PostedOn: number;
      PostedBy: number;
}

export class AddPost {
      PostId: number;
      EntityTypeId: number;
      EntityId: number;
      ContentTypeId: number;
      Url: string;
      Text: string;
      PostedBy: number;
      PostedOn: number;
}

export class GetPostModel
{
      EntityTypeId: number;
      EntityId: number;
      UserId: number;
}