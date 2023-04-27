import {
    useGetHotelByIdQuery,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
} from '../../app/features/api/hotelsSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

const STARS_LIST = [1, 2, 3, 4, 5];

const HotelPage = () => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const [updateHotel] = useUpdateHotelMutation();
    const [deleteHotel] = useDeleteHotelMutation();

    const { data: hotel, isLoading, isSuccess, isError } = useGetHotelByIdQuery(hotelId);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [nation, setNation] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [others, setOthers] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [desc, setDesc] = useState('');
    const [stars, setStars] = useState(1);
    const [updateErr, setUpdateErr] = useState('');

    useEffect(() => {
        if (hotel?.name) setName(hotel.name);
        if (hotel?.title) setTitle(hotel.title);
        if (hotel?.location?.nation) setNation(hotel.location.nation);
        if (hotel?.location?.city) setCity(hotel.location.city);
        if (hotel?.location?.province) setProvince(hotel.location.province);
        if (hotel?.location?.others) setOthers(hotel.location.others);
        if (hotel?.contact?.email) setEmail(hotel.contact.email);
        if (hotel?.contact?.phone) setPhone(hotel.contact.phone);
        if (hotel?.desc) setDesc(hotel.desc);
        if (hotel?.stars) setStars(hotel.stars);
    }, [hotel]);

    const onUpdateHotel = async () => {
        try {
            await updateHotel({
                id: hotelId,
                name,
                title,
                nation,
                city,
                province,
                others,
                email,
                phone,
                desc,
                stars,
            }).unwrap();

            navigate('/hotels');
        } catch (err) {
            setUpdateErr(err.message);
        }
    };

    const onDeleteHotel = async () => {
        try {
            await deleteHotel(hotelId).unwrap();

            navigate('/hotels');
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
                        <p>ID: {hotel.id}</p>
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
                                <label htmlFor='province'>Province</label>
                                <input
                                    type='text'
                                    value={province}
                                    onChange={e => setProvince(e.target.value)}
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
                        </form>
                        <p>
                            Tổng số lượt đặt:
                            {hotel?.bookedCount || 'Chưa cập nhật số lượt đặt phòng'}
                        </p>
                        <p>
                            Tông số lượt bình luận:
                            {hotel?.cmtSum || 'Chưa cập nhật số lượt bình luận'}
                        </p>
                        <p>
                            Thời gian sẵn sàng:
                            {format(new Date(hotel.availableTime.start), datetimeFm)}
                        </p>
                        <p>
                            Thời gian kết thúc:
                            {format(new Date(hotel.availableTime.end), datetimeFm)}
                        </p>
                        <p>Cập nhật vào: {format(new Date(hotel.updatedAt), datetimeFm)}</p>
                        <p>Được tạo vào: {format(new Date(hotel.createdAt), datetimeFm)}</p>
                    </main>
                    <main className='edit-opt'>
                        <button className='item-btn' onClick={onUpdateHotel}>
                            <span>Xác nhận thay đổi</span>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/hotels`}>Quay trở lại Hotel list</Link>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/hotels/images/${hotel.id}`}>Hotel images</Link>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/hotels/services/${hotel.id}`}>Services</Link>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/hotels/books/${hotel.id}`}>Books</Link>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/hotels/cmts/${hotel.id}`}>Comments</Link>
                        </button>
                        <button className='item-btn btn danger' onClick={onDeleteHotel}>
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

export default HotelPage;
