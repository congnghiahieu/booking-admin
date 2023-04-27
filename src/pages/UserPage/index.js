import {
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} from '../../app/features/api/usersSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { CopiedText } from '../../components';

const ROLES_LIST = ['user', 'admin'];

const UserPage = () => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';
    const { userId } = useParams();
    const navigate = useNavigate();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const { data: user, isLoading, isSuccess, isError } = useGetUserByIdQuery(userId);

    const [name, setName] = useState('');
    const [nation, setNation] = useState('');
    const [others, setOthers] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const [updateErr, setUpdateErr] = useState('');

    useEffect(() => {
        if (user?.name) setName(user.name);
        if (user?.address?.nation) setNation(user.address.nation);
        if (user?.address?.others) setOthers(user.address.others);
        if (user?.contact?.email) setEmail(user.contact.email);
        if (user?.contact?.phone) setPhone(user.contact.phone);
        if (user?.roles) setUserRoles(user.roles);
    }, [user]);

    const handleCheckbox = role => {
        setUserRoles(prev => {
            if (!prev.includes(role)) {
                return [...prev, role];
            }

            return prev.filter(v => v !== role);
        });
    };

    const onUpdateUser = async () => {
        try {
            await updateUser({
                id: userId,
                name,
                nation,
                others,
                email,
                phone,
                roles: userRoles,
            }).unwrap();

            navigate('/users');
        } catch (err) {
            setUpdateErr(err.message);
        }
    };

    const onDeleteUser = async () => {
        try {
            await deleteUser({ id: userId }).unwrap();

            navigate('/users');
        } catch (err) {
            setUpdateErr(err.message);
        }
    };

    return (
        <>
            {isLoading && <div>...Loading</div>}
            {!isLoading && isError && <div>Error while fetching data</div>}
            {updateErr && <div>{updateErr}</div>}
            {!isLoading && isSuccess ? (
                <section className='edit-page'>
                    <main className='edit-content'>
                        <p>
                            ID: <CopiedText text={user.id} />
                        </p>
                        <p>Account: {user.username}</p>
                        <form className='form'>
                            <div className='form-group'>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='nation'>Nation</label>
                                <input
                                    type='text'
                                    value={nation}
                                    onChange={e => setNation(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='others'>Others</label>
                                <input
                                    type='text'
                                    value={others}
                                    onChange={e => setOthers(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='phone'>Phone</label>
                                <input
                                    type='text'
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <div className='form-group-hor'>
                                <label htmlFor='roles'>Roles</label>
                                {ROLES_LIST.map((role, i) => (
                                    <span key={i}>
                                        <input
                                            className='form-check'
                                            type='checkbox'
                                            checked={userRoles.includes(role)}
                                            onChange={() => handleCheckbox(role)}
                                        />
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </form>
                        <ul>
                            <p>In cart: </p>
                            {user.cart.map(cartItem => (
                                <li key={JSON.stringify(cartItem)}>{JSON.stringify(cartItem)}</li>
                            ))}
                        </ul>
                        <ul>
                            <p>Yêu thích: </p>
                            {user.fav.map(favItem => (
                                <li key={JSON.stringify(favItem)}>{JSON.stringify(favItem)}</li>
                            ))}
                        </ul>
                        <ul>
                            <p>Refresh token</p>
                            {user.refreshToken.map(rt => (
                                <li key={rt}>{rt}</li>
                            ))}
                        </ul>
                        <p>Cập nhật vào: {format(new Date(user.updatedAt), datetimeFm)}</p>
                        <p>Được tạo vào: {format(new Date(user.createdAt), datetimeFm)}</p>
                    </main>
                    <main className='edit-opt'>
                        <button className='item-btn' onClick={onUpdateUser}>
                            <span>Xác nhận thay đổi</span>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/users`}>Quay trở lại User list</Link>
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
                        <button className='item-btn btn danger' onClick={onDeleteUser}>
                            <span>Delete</span>
                        </button>
                    </main>
                </section>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserPage;
