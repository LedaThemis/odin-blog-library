import { isLoggedIn } from '../Users';
import {
    CommentCreateResponse,
    CommentsGetResponse,
    CreatePostResponse,
    GetPostResponse,
    PostGetSuccessResponse,
    PostInput,
    PostType,
    UpdatePostResponse,
} from '../typings';

export const createPost = async ({
    title,
    content,
}: PostInput): Promise<CreatePostResponse> => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    try {
        const response: PostType = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/posts/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    Authorization: localStorage.getItem('token')!,
                },
                body: JSON.stringify({ title, content }),
            })
        ).json();

        return response;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const updatePost = async ({
    title,
    content,
    isPublished,
    id,
}: PostInput & {
    id: string;
    isPublished?: string;
}): Promise<UpdatePostResponse> => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    const body: { isPublished?: string } = {};

    if (isPublished) {
        body.isPublished = isPublished;
    }

    try {
        const response: PostGetSuccessResponse = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    Authorization: localStorage.getItem('token')!,
                },
                body: JSON.stringify({ title, content, ...body }),
            })
        ).json();

        return response;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const getPost = async ({
    id,
}: {
    id: string;
}): Promise<GetPostResponse> => {
    try {
        const response: GetPostResponse = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    Authorization: localStorage.getItem('token')!,
                },
            })
        ).json();

        return response;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const togglePostPublished = async ({
    post,
}: {
    post: PostType;
}): Promise<UpdatePostResponse> => {
    const res: UpdatePostResponse = await updatePost({
        title: post.title,
        content: post.content,
        id: post._id,
        isPublished: `${!post.isPublished}`,
    });

    return res;
};

export const deletePost = async ({ id }: { id: string }) => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    try {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
            {
                method: 'delete',
                headers: {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    Authorization: localStorage.getItem('token')!,
                },
            },
        );

        return res;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const getPostComments = async ({
    id,
}: {
    id: string;
}): Promise<CommentsGetResponse> => {
    try {
        const headers: { Authorization?: string } = {};

        if (localStorage.getItem('token') !== null) {
            headers.Authorization = localStorage.getItem('token');
        }

        const res: CommentsGetResponse = await (
            await fetch(
                `${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                    },
                },
            )
        ).json();

        return res;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const createPostComment = async ({
    id,
    content,
}: {
    id: string;
    content: string;
}): Promise<CommentCreateResponse> => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    try {
        const res: CommentCreateResponse = await (
            await fetch(
                `${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        content,
                    }),
                },
            )
        ).json();

        return res;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};
