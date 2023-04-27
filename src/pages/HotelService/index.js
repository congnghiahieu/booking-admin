import {
    useGetServiceByHotelIdQuery,
    useDeleteServiceByHotelIdMutation,
} from '../../app/features/api/servicesSlice';
import { ServiceItem, PagingNav } from '../../components';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const HotelService = () => {
    const { hotelId } = useParams();
    const [page, setPage] = useState(1);
    const {
        data: services,
        isLoading,
        isFetching,
        isSuccess,
        isError,
    } = useGetServiceByHotelIdQuery({ hotelId, page, perPage: 1 });
    const [delAllSv, { isLoading: isDelAllLoad }] = useDeleteServiceByHotelIdMutation();
    const [delAllErr, setDelAllErr] = useState('');

    const ondelAllSv = async () => {
        const promptMsg =
            'Bạn có muốn xoá tất cả dịch vụ của khách sạn ${hotelId} không ? Gõ: "Tôi muốn xoá tất cả"';
        const resMsg = prompt(promptMsg);
        if (resMsg == 'Tôi muốn xoá tất cả') {
            try {
                await delAllSv(hotelId).unwrap();
            } catch (err) {
                console.log(err);
                setDelAllErr(`${err.status}: ${err.data.message}`);
            }
        }
    };

    return (
        <>
            <div style={{ marginBottom: '40px', width: '400px' }}>
                <p>
                    ID khách sạn: <Link to={`/hotels/${hotelId}`}>{hotelId}</Link>
                </p>
                <button
                    className='btn danger'
                    style={{ width: '50%', height: '40px ' }}
                    onClick={ondelAllSv}
                    disabled={isDelAllLoad}>
                    Xoá tất cả các dịch vụ
                </button>
            </div>
            {delAllErr && <div>{delAllErr}</div>}
            {isLoading && <div>...Loading</div>}
            {!isLoading && isError && <div>Error while fetching data</div>}
            {!isLoading && isSuccess ? (
                <>
                    <PagingNav
                        isFetching={isFetching}
                        page={page}
                        setPage={setPage}
                        totalPages={services.totalPages}
                    />
                    {services.ids.length ? (
                        <>
                            <div className='summary'>
                                <p>Có {services.total} dịch vụ của khách sạn </p>
                                <p>Có {services.curTotal} dịch vụ ở trang này </p>
                            </div>
                            <ul>
                                {services.ids.map(id => {
                                    const service = services.entities[id];

                                    return (
                                        <li key={id} className='item'>
                                            <ServiceItem user={service} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <div>
                            <p>Hiện tại khách sạn không có service nào</p>
                            <Link to='/services/create'>Tạo service</Link>
                        </div>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default HotelService;
