import { useGetAllTransQuery } from '../../app/features/api/transSlice';
import { TransItem, PagingNav } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TransList = () => {
    const [page, setPage] = useState(1);
    const {
        data: trans,
        isLoading,
        isFetching,
        isSuccess,
        isError,
    } = useGetAllTransQuery({ page, perPage: 1 });

    return (
        <>
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
                            <p className='summary'>
                                Có {trans.ids.length} giao dịch trong hệ thống
                            </p>
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
                            <p>Hiện tại không có giao dịch nào trong hệ thống</p>
                            {/* <Link to='/users/create'>Tạo user</Link> */}
                        </div>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default TransList;
