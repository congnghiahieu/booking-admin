import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import CopiedText from '../CopiedText';

const UserItem = ({ user }) => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';

    return (
        <>
            <div className='item-content'>
                <p>
                    ID: <CopiedText text={user.id} />
                </p>
                <p>Account: {user.username}</p>
                <p>Tên : {user?.name || 'Chưa cập nhật tên'}</p>
                <p>Quốc tịch: {user?.address?.nation || 'Chưa cập nhật quốc tịch'}</p>
                <p>Địa chỉ: {user?.address?.others || 'Chưa cập nhật địa chỉ cụ thể'}</p>
                <p>Email: {user?.contact?.email || 'Chưa cập nhật email'}</p>
                <p>Số điện thoại: {user?.contact?.phone || 'Chưa cập nhật số điện thoại'}</p>
                <ul>
                    <p> Quyền: {user.roles.join(', ')}</p>
                </ul>
                <p>
                    In cart: <Link to={`/users/${user.id}`}>Xem chi tiết</Link>
                </p>
                <p>
                    Yêu thích: <Link to={`/users/${user.id}`}>Xem chi tiết</Link>
                </p>
                <ul>
                    <p>Refresh token</p>
                    {user.refreshToken.map(rt => (
                        <li key={rt}>{rt}</li>
                    ))}
                </ul>
                <p>Cập nhật vào: {format(new Date(user.updatedAt), datetimeFm)}</p>
                <p>Được tạo vào: {format(new Date(user.createdAt), datetimeFm)}</p>
            </div>
            <div className='item-opt'>
                <button className='item-btn'>
                    <Link to={`/users/${user.id}`}>View & Edit</Link>
                </button>
                <button className='item-btn'>
                    <Link to={`/users/books/${user.id}`}>Books</Link>
                </button>
                <button className='item-btn'>
                    <Link to={`/users/cmts/${user.id}`}>Comments</Link>
                </button>
                <button className='item-btn'>
                    <Link to={`/users/trans/${user.id}`}>Transactions</Link>
                </button>
            </div>
        </>
    );
};

export default UserItem;
