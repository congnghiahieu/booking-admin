import { useAddUserMutation } from '../../app/features/api/usersSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ROLES_LIST = ['user', 'admin'];

const UserCreate = () => {
    const navigate = useNavigate();
    const [addUser, { isLoading }] = useAddUserMutation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nation, setNation] = useState('');
    const [others, setOthers] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userRoles, setUserRoles] = useState(['user']);
    const [addErr, setAddErr] = useState('');

    const canSave = [username, password].every(Boolean) && !isLoading;

    const handleCheckbox = role => {
        setUserRoles(prev => {
            if (!prev.includes(role)) {
                return [...prev, role];
            }

            return prev.filter(v => v !== role);
        });
    };

    const onAddUser = async () => {
        if (canSave) {
            try {
                await addUser({
                    username,
                    password,
                    name,
                    nation,
                    others,
                    email,
                    phone,
                    roles: userRoles,
                }).unwrap();

                navigate('/users');
            } catch (err) {
                console.log(err);
                setAddErr(`${err.status}: ${err.data.message}`);
            }
        }
    };

    return (
        <>
            {addErr && <div>{addErr}</div>}
            <section className='edit-page'>
                <main className='edit-content'>
                    <form className='form'>
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Name **Không bắt buộc**</label>
                            <input
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nation'>Nation **Không bắt buộc**</label>
                            <input
                                type='text'
                                value={nation}
                                onChange={e => setNation(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='others'>Others **Không bắt buộc**</label>
                            <input
                                type='text'
                                value={others}
                                onChange={e => setOthers(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Email **Không bắt buộc**</label>
                            <input
                                type='text'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='phone'>Phone **Không bắt buộc**</label>
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
                </main>
                <main className='edit-opt'>
                    <button className='item-btn' onClick={onAddUser} disabled={!canSave}>
                        <span>Xác nhận tạo mới</span>
                    </button>
                    <button className='item-btn'>
                        <Link to={`/users`}>Quay trở lại User list</Link>
                    </button>
                </main>
            </section>
        </>
    );
};

export default UserCreate;
