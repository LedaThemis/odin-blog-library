import { isLoggedIn } from '../Users';
import { CommentDeleteResponse, CommentUpdateResponse } from '../typings';

export const deleteComment = async ({
    id,
}: {
    id: string;
}): Promise<CommentDeleteResponse> => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    try {
        const res: CommentDeleteResponse = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/comments/${id}`, {
                method: 'delete',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            })
        ).json();

        return res;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const updateComment = async ({
    id,
    content,
}: {
    id: string;
    content: string;
}): Promise<CommentUpdateResponse> => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    try {
        const response: CommentUpdateResponse = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/comments/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
                body: JSON.stringify({ content }),
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
