import ms from 'ms';

import {
    APIUser,
    AccessDetails,
    AccessResponse,
    PostsResponse,
} from '../typings';

export const login = async ({
    username,
    password,
}: AccessDetails): Promise<AccessResponse> => {
    try {
        const res: AccessResponse = await (
            await fetch(`${process.env.REACT_APP_BASE_URL}/users/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
        ).json();

        if (res.state === 'success') {
            const expiresAt = Date.now() + ms(res.expiresIn);

            localStorage.setItem('token', 'Bearer ' + res.token);
            localStorage.setItem(
                'expiresAt',
                JSON.stringify(expiresAt.valueOf()),
            );
            localStorage.setItem('userId', res.userId);
        }

        return res;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while submitting request.' }],
        };
    }
};

export const isLoggedIn = () => {
    try {
        if (
            !localStorage.getItem('token') ||
            !localStorage.getItem('expiresAt') ||
            !localStorage.getItem('userId')
        ) {
            return false;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const expiresAt = JSON.parse(localStorage.getItem('expiresAt')!);

        return Date.now() < expiresAt;
    } catch {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('userId');
};

export const getUser = async () => {
    try {
        const CURRENT_USER_ID = localStorage.getItem('userId');

        const user: APIUser = await (
            await fetch(
                `${process.env.REACT_APP_BASE_URL}/users/${CURRENT_USER_ID}/`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
        ).json();

        return user;
    } catch {
        return {
            state: 'failed',
            errors: [{ msg: 'An error occurred while processing request.' }],
        };
    }
};

export const getUserPosts = async (): Promise<PostsResponse> => {
    if (!isLoggedIn()) {
        return {
            state: 'failed',
            errors: [{ msg: 'You are not logged in.' }],
        };
    }

    try {
        const CURRENT_USER_ID = localStorage.getItem('userId');

        const res: PostsResponse = await (
            await fetch(
                `${process.env.REACT_APP_BASE_URL}/users/${CURRENT_USER_ID}/posts`,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        Authorization: localStorage.getItem('token')!,
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
