import { GOOGLE_AUTH_LINK } from '../../utils/constants';
import { openPopup } from '../../utils/openPopup';
import { useRef } from 'react';

const Home = () => {
    // const timer = useRef();
    // const onGoogleLogin = async () => {
    //     // const newWindow = openPopup({
    //     //     url: GOOGLE_AUTH_LINK,
    //     //     title: 'Wygo.com | Google login',
    //     //     w: 500,
    //     //     h: 600,
    //     // });
    //     const newWindow = window.open(GOOGLE_AUTH_LINK, '_self', 'width=500, height=600');
    //     console.log(newWindow);

    //     if (newWindow) {
    //         timer.current = setInterval(() => {
    //             if (newWindow.closed) {
    //                 console.log('Login by Google successfully');
    //                 if (timer.current) clearInterval(timer.current);
    //             } else {
    //                 console.log('Not closed');
    //             }
    //         }, 500);
    //     }
    // };

    return <div>{/* <button onClick={onGoogleLogin}>Login with Google</button> */}</div>;
};

export default Home;
