import { isLoggedIn } from '../Users';
import { CommentDeleteResponse } from '../typings';

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
