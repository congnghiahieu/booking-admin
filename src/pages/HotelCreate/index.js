import { useAddHotelMutation } from '../../app/features/api/hotelsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRan } from '../../utils/random';

const STARS_LIST = [1, 2, 3, 4, 5];

const HotelCreate = () => {
    const navigate = useNavigate();
    const [addHotel, { isLoading }] = useAddHotelMutation();

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('hotel@gmail.com');
    const [phone, setPhone] = useState('0987654321');
    const [desc, setDesc] = useState('');
    const [nation, setNation] = useState('Việt Nam');
    const [province, setProvince] = useState('Đà Nẵng');
    const [district, setDistrict] = useState('');
    const [others, setOthers] = useState('');
    const [stars, setStars] = useState(4);
    const [point, setPoint] = useState(8.9);

    const [addErr, setAddErr] = useState('');

    const canSave =
        [name, title, phone, email, desc, nation, province].every(Boolean) && !isLoading;

    const onAddHotel = async () => {
        if (canSave) {
            try {
                await addHotel({
                    name,
                    title,
                    email,
                    phone,
                    desc,
                    nation,
                    province,
                    district,
                    others,
                    stars,
                    point,
                }).unwrap();

                navigate(`/hotels`);
            } catch (err) {
                console.log(err);
                setAddErr(`${err.status}: ${err.data.message}`);
            }
        }
    };

    return (
        <>
            {addErr && <div>{addErr}</div>}
            <p>Chú ý: Thêm image sau</p>
            <section className='edit-page'>
                <main className='edit-content'>
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
                            <label htmlFor='title'>Title</label>
                            <input
                                type='text'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
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
                            <label htmlFor='province'>Province</label>
                            <input
                                type='text'
                                value={province}
                                onChange={e => setProvince(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='district'>District *Không bắt buộc*</label>
                            <input
                                type='text'
                                value={district}
                                onChange={e => setDistrict(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='others'>Others *Không bắt buộc*</label>
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
                        <div className='form-group'>
                            <label htmlFor='desc'>Description</label>
                            <textarea value={desc} onChange={e => setDesc(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='stars'>Stars</label>
                            <select onChange={e => setStars(e.target.value)} value={stars}>
                                {STARS_LIST.map(v => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='point'>
                                Point **Không bắt buộc** **Theo số phẩy** VD: 8,9
                            </label>
                            <input
                                type='number'
                                step='0.1'
                                min={0}
                                max={10}
                                value={point}
                                onChange={e => setPoint(e.target.value)}
                            />
                        </div>
                    </form>
                </main>
                <main className='edit-opt'>
                    <button className='item-btn' onClick={onAddHotel} disabled={!canSave}>
                        <span>Xác nhận thay đổi</span>
                    </button>
                    <button className='item-btn'>
                        <Link to={`/users`}>Quay trở lại Hotel list</Link>
                    </button>
                </main>
            </section>
        </>
    );
};

export default HotelCreate;
