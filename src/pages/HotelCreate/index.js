import { useAddHotelMutation } from '../../app/features/api/hotelsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const STARS_LIST = [1, 2, 3, 4, 5];

const HotelCreate = () => {
    const navigate = useNavigate();
    const [addHotel, { isLoading }] = useAddHotelMutation();

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [nation, setNation] = useState('Việt Nam');
    const [city, setCity] = useState('Hồ Chí Minh');
    const [province, setProvince] = useState('');
    const [others, setOthers] = useState('');
    const [email, setEmail] = useState('hotel@gmail.com');
    const [phone, setPhone] = useState('0987654321');
    const [desc, setDesc] = useState('');
    const [files, setFiles] = useState([]);
    const [stars, setStars] = useState(4);

    const [addErr, setAddErr] = useState('');
    const [preview, setPreview] = useState([]);

    const canSave =
        [name, title, phone, email, desc, nation, city].every(Boolean) &&
        files.length &&
        !isLoading;

    // Clean up function fo clear old preview
    useEffect(() => {
        return () => {
            if (preview.length) {
                preview.forEach(pr => URL.revokeObjectURL(pr));
            }
        };
    }, [preview]);
    const onFilesChange = e => {
        setFiles(e.target.files);
        // Create blob url for preview upload img
        setPreview(Array.from(e.target.files).map(file => URL.createObjectURL(file)));
    };

    const onAddHotel = async () => {
        if (canSave) {
            const formData = new FormData();
            Object.keys(files).forEach(key => {
                formData.append(files.item(key).name, files.item(key));
            });
            formData.append('name', name);
            formData.append('title', title);
            formData.append('nation', nation);
            formData.append('city', city);
            formData.append('province', province);
            formData.append('others', others);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('desc', desc);
            formData.append('stars', stars);
            try {
                await addHotel(formData).unwrap();

                navigate('/hotels');
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
                            <label htmlFor='city'>City</label>
                            <input
                                type='text'
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='province'>Province *Không bắt buộc*</label>
                            <input
                                type='text'
                                value={province}
                                onChange={e => setProvince(e.target.value)}
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
                            <label htmlFor='files'>Image files</label>
                            <input
                                type='file'
                                multiple
                                onChange={onFilesChange}
                                accept='.jpg, .jpeg'
                            />
                            <div className='preview'>
                                {preview.map((pr, i) => {
                                    return (
                                        <img
                                            key={i}
                                            src={pr}
                                            className='preview-img'
                                            alt='preview upload'
                                        />
                                    );
                                })}
                            </div>
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
