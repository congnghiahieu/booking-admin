import { useGetBooksByUserIdQuery } from '../../app/features/api/booksSlice';
import { BookItem, PagingNav } from '../../components';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const UserBook = () => {
    const { userId } = useParams();
    const [page, setPage] = useState(1);
    const {
        data: books,
        isLoading,
        isFetching,
        isSuccess,
        isError,
    } = useGetBooksByUserIdQuery({ userId, page, perPage: 1 });
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
                    Xoá tất cả các lịch đặt
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
                        totalPages={books.totalPages}
                    />
                    {books.ids.length ? (
                        <>
                            <p className='summary'>Có {books.ids.length} lịch đặt</p>
                            <ul>
                                {books.ids.map(id => {
                                    const book = books.entities[id];

                                    return (
                                        <li key={id} className='item'>
                                            <BookItem user={book} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <div>
                            <p>Hiện tại người dùng không có lịch đặt nào</p>
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

export default UserBook;
