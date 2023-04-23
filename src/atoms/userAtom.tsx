import {atom} from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        id: 0,
        name: '',
        email: '',
        password: '',
        user_image: '',
    }
});

