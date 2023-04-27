import {
    useGetCmtsByUserIdQuery,
    useDeleteCmtByUserIdMutation,
} from '../../app/features/api/cmtsSlice';
import { CmtItem, PagingNav } from '../../components';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const UserCmt = () => {
    const { userId } = useParams();
    const [page, setPage] = useState(1);
    const {
        data: cmts,
        isLoading,
        isFetching,
        isSuccess,
        isError,
    } = useGetCmtsByUserIdQuery({ userId, page, perPage: 1 });
    const [delAllCmt, { isLoading: isDelAllLoad }] = useDeleteCmtByUserIdMutation();
    const [delAllErr, setDelAllErr] = useState('');

    const ondelAllSv = async () => {
        const promptMsg = `Bạn có muốn xoá tất cả bình luận của người dùng ${userId} không ? Gõ: "Tôi muốn xoá tất cả"`;
        const resMsg = prompt(promptMsg);
        if (resMsg == 'Tôi muốn xoá tất cả') {
            try {
                await delAllCmt(userId).unwrap();
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
                    ID người dùng: <Link to={`/users/${userId}`}>{userId}</Link>
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
                            <p className='summary'>Có {cmts.ids.length} bình luận</p>
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
                            <p>Hiện tại người dùng không có bình luận nào</p>
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

export default UserCmt;
