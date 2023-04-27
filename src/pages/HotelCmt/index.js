import {
    useGetCmtsByHotelIdQuery,
    useDeleteCmtByHotelIdMutation,
} from '../../app/features/api/cmtsSlice';
import { CmtItem, PagingNav } from '../../components';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const HotelCmt = () => {
    const { hotelId } = useParams();
    const [page, setPage] = useState(1);
    const {
        data: cmts,
        isLoading,
        isFetching,
        isSuccess,
        isError,
    } = useGetCmtsByHotelIdQuery({ hotelId, page, perPage: 1 });
    const [delAllCmt, { isLoading: isDelAllLoad }] = useDeleteCmtByHotelIdMutation();
    const [delAllErr, setDelAllErr] = useState('');

    const ondelAllSv = async () => {
        const promptMsg = `Bạn có muốn xoá tất cả dịch vụ của khách sạn ${hotelId} không ? Gõ: "Tôi muốn xoá tất cả"`;
        const resMsg = prompt(promptMsg);
        if (resMsg == 'Tôi muốn xoá tất cả') {
            try {
                await delAllCmt(hotelId).unwrap();
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
                    Xoá tất cả các bình luận
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
                        totalPages={cmts.totalPages}
                    />
                    {cmts.ids.length ? (
                        <>
                            <div className='summary'>
                                <p>Có {cmts.total} bình luận cho khách sạn </p>
                                <p>Có {cmts.curTotal} bình luận ở trang này </p>
                            </div>
                            <ul>
                                {cmts.ids.map(id => {
                                    const cmt = cmts.entities[id];

                                    return (
                                        <li key={id} className='item'>
                                            <CmtItem user={cmt} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <div>
                            <p>Hiện tại khách sạn không có bình luận nào</p>
                            {/* <Link to='/services/create'>Tạo service</Link> */}
                        </div>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default HotelCmt;
