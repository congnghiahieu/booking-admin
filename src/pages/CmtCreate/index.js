import { useAddCmtMutation } from '../../app/features/api/cmtsSlice';
// import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserCreate = () => {
    // const navigate = useNavigate();
    const [addCmt, { isLoading }] = useAddCmtMutation();

    const [userId, setUserId] = useState('');
    const [hotelId, setHotelId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [point, setPoint] = useState(1);

    const [addErr, setAddErr] = useState('');

    const canSave = [userId, hotelId, title, content].every(Boolean) && !isLoading;

    const onAddCmt = async () => {
        if (canSave) {
            try {
                await addCmt({
                    userId,
                    hotelId,
                    title,
                    content,
                    point,
                }).unwrap();

                // setUserId('/')
                // setHotelId('/')
                setTitle('');
                setContent('');
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
                            <label htmlFor='userId'>ID người dùng</label>
                            <input
                                type='text'
                                value={userId}
                                onChange={e => setUserId(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='hotelId'>ID khách sạn</label>
                            <input
                                type='hotelId'
                                value={hotelId}
                                onChange={e => setHotelId(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='title'>Tiêu đề bình luận</label>
                            <textarea
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='content'>Nội dung bình luận</label>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='content'>Điểm số</label>
                            <input
                                value={point}
                                onChange={e => setPoint(e.target.value)}
                                type='number'
                                required
                                min={1}
                                max={10}
                            />
                        </div>
                    </form>
                </main>
                <main className='edit-opt'>
                    <button className='item-btn' onClick={onAddCmt} disabled={!canSave}>
                        <span>Xác nhận tạo mới</span>
                    </button>
                    {/* <button className='item-btn'>
                        <Link to={`/users`}>Quay trở lại User list</Link>
                    </button> */}
                </main>
            </section>
        </>
    );
};

export default UserCreate;
