export type ErrorType = {
    msg: string;
    location?: string;
    param?: string;
    value?: string;
};

export type User = {
    token?: string;
};

export type AccessDetails = {
    username: string;
    password: string;
};

type FailResponse = {
    state: 'failed';
    errors: ErrorType[];
};

type AccessSuccessResponse = {
    state: 'success';
    token: string;
    expiresIn: string;
    userId: string;
};

export interface APIUser {
    _id: string;
    username: string;
}

export type PostType = {
    state: 'success';
    _id: string;
    title: string;
    author: APIUser;
    content: string;
    comments: string[];
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type PostsSuccessResponse = {
    state: 'success';
    posts: PostType[];
};

export type PostsResponse = PostsSuccessResponse | FailResponse;

export type AccessResponse = AccessSuccessResponse | FailResponse;

export interface PostInput {
    title: string;
    content: string;
}

export type CreatePostResponse = PostType | FailResponse;

export interface PostGetSuccessResponse {
    state: 'success';
    post: PostType;
}

export type GetPostResponse = PostGetSuccessResponse | FailResponse;

export type UpdatePostResponse = GetPostResponse;

export type RegisterSuccessResponse = {
    state: 'success';
};

export type RegisterResponse = RegisterSuccessResponse | FailResponse;

export type CommentType = {
    _id: string;
    author: APIUser;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type CommentsGetSuccessResponse = {
    state: 'success';
    comments: CommentType[];
};

export type CommentsGetResponse = CommentsGetSuccessResponse | FailResponse;

export type CommentCreateSuccessResponse = {
    state: 'success';
    comment: CommentType;
};

export type CommentCreateResponse = CommentCreateSuccessResponse | FailResponse;

export type CommentDeleteSuccessResponse = {
    state: 'success';
};

export type CommentDeleteResponse = CommentDeleteSuccessResponse | FailResponse;

export type CommentUpdateSuccessResponse = {
    state: 'success';
    comment: CommentType;
};

export type CommentUpdateResponse = CommentUpdateSuccessResponse | FailResponse;
