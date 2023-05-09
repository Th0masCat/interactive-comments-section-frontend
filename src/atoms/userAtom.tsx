import {atom} from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        name: '',
        email: '',
        user_image: '',
        isLoggedin: false,
    }
});


