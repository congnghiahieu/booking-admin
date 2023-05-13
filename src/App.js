import { Routes, Route, Navigate } from 'react-router-dom';
import {
    Home,
    UserList,
    UserPage,
    UserCreate,
    UserBook,
    UserCmt,
    UserTrans,
    HotelList,
    HotelPage,
    HotelCreate,
    HotelImage,
    HotelService,
    HotelBook,
    HotelCmt,
    ServiceList,
    ServicePage,
    ServiceCreate,
    ServiceImage,
    TransList,
    CmtCreate,
    BookCreate,
    LoginSuccess,
} from './pages';
import { Layout } from './components';

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='login/success' element={<LoginSuccess />} />

                    <Route path='users'>
                        <Route index element={<UserList />} />
                        <Route path='books/:userId' element={<UserBook />} />
                        <Route path='cmts/:userId' element={<UserCmt />} />
                        <Route path='trans/:userId' element={<UserTrans />} />
                        <Route path='create' element={<UserCreate />} />
                        <Route path=':userId' element={<UserPage />} />
                    </Route>

                    <Route path='hotels'>
                        <Route index element={<HotelList />} />
                        <Route path='images/:hotelId' element={<HotelImage />} />
                        <Route path='services/:hotelId' element={<HotelService />} />
                        <Route path='books/:hotelId' element={<HotelBook />} />
                        <Route path='cmts/:hotelId' element={<HotelCmt />} />
                        <Route path='create' element={<HotelCreate />} />
                        <Route path=':hotelId' element={<HotelPage />} />
                    </Route>

                    <Route path='services'>
                        <Route index element={<ServiceList />} />
                        <Route path='images/:serviceId' element={<ServiceImage />} />
                        <Route path='create' element={<ServiceCreate />} />
                        <Route path=':serviceId' element={<ServicePage />} />
                    </Route>

                    <Route path='trans'>
                        <Route index element={<TransList />} />
                    </Route>

                    <Route path='cmts'>
                        <Route path='create' element={<CmtCreate />} />
                    </Route>

                    <Route path='books'>
                        <Route path='create' element={<BookCreate />} />
                    </Route>

                    {/* Catch all - replace with 404 component if you want */}
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
