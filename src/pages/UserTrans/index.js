import { useGetTransByUserIdQuery } from '../../app/features/api/transSlice';
import { TransItem, PagingNav } from '../../components';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const UserTrans = () => {
    const [page, setPage] = useState(1);
    const { userId } = useParams();
    const {
        data: trans,
        isLoading,
        isFetching,
        isSuccess,
        isError,
    } = useGetTransByUserIdQuery({ userId, page, perPage: 1 });
    // const [delAllSv, { isLoading: isDelAllLoad }] = useDeleteServiceByHotelIdMutation();
    // const [delAllErr, setDelAllErr] = useState('');

    // const ondelAllSv = async () => {
    //     const promptMsg =
    //         'Bạn có muốn xoá tất cả dịch vụ của khách sạn ${hotelId} không ? Gõ: "Tôi muốn xoá tất cả"';
    //     const resMsg = prompt(promptMsg);
    //     if (resMsg == 'Tôi muốn xoá tất cả') {
    //         try {
    //             await delAllSv(hotelId).unwrap();
    //         } catch (err) {
    //             console.log(err);
    //             setDelAllErr(`${err.status}: ${err.data.message}`);
    //         }
    //     }
    // };

    return (
        <>
            <div style={{ marginBottom: '40px', width: '400px' }}>
                <p>
                    ID người dùng: <Link to={`/users/${userId}`}>{userId}</Link>
                </p>
                <button
                    className='btn danger'
                    style={{ width: '50%', height: '40px ' }}
                    // onClick={ondelAllSv}
                    // disabled={isDelAllLoad}
                >
                    Xoá tất cả các giao dịch
                </button>
            </div>
            {/* {delAllErr && <div>{delAllErr}</div>} */}
            {isLoading && <div>...Loading</div>}
            {!isLoading && isError && <div>Error while fetching data</div>}
            {!isLoading && isSuccess ? (
                <>
                    <PagingNav
                        isFetching={isFetching}
                        page={page}
                        setPage={setPage}
                        totalPages={trans.totalPages}
                    />
                    {trans.ids.length ? (
                        <>
                            <p className='summary'>Có {trans.ids.length} giao dịch</p>
                            <ul>
                                {trans.ids.map(id => {
                                    const oneTrans = trans.entities[id];

                                    return (
                                        <li key={id} className='item'>
                                            <TransItem user={oneTrans} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <div>
                            <p>Hiện tại người dùng không có giao dịch nào</p>
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

export default UserTrans;
