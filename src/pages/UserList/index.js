import { useGetAllUsersQuery } from '../../app/features/api/usersSlice';
import { UserItem, PagingNav } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserList = () => {
    const [page, setPage] = useState(1);
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    } = useGetAllUsersQuery({ page, perPage: 1 });

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
                        totalPages={users.totalPages}
                    />
                    {users.ids.length ? (
                        <>
                            <div className='summary'>
                                <p>Có {users.total} người dùng trong hệ thống </p>
                                <p>Có {users.curTotal} người dùng ở trang này</p>
                            </div>
                            <ul>
                                {users.ids.map(id => {
                                    const user = users.entities[id];

                                    return (
                                        <li key={id} className='item'>
                                            <UserItem user={user} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <div>
                            <p>Hiện tại không có user nào trong hệ thống</p>
                            <Link to='/users/create'>Tạo user</Link>
                        </div>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserList;
