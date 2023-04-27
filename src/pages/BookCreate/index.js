import { useAddBookMutation } from '../../app/features/api/booksSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { add } from 'date-fns';

// userId, hotelId, serviceId, start, end, cardSeries, value, transType, status

const TRANS_TYPES = {
    BOOKING: 'booking',
    TOP_UP: 'top_up',
};

const BookCreate = () => {
    const navigate = useNavigate();
    const [addBook, { isLoading }] = useAddBookMutation();

    const [userId, setUserId] = useState('');
    const [hotelId, setHotelId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [cardSeries, setCardSeries] = useState('1234567790');
    const [value, setValue] = useState(1000);
    // Đang cố định giá trị ngày tháng
    const [start, setStart] = useState(new Date().toString());
    const [end, setEnd] = useState(
        add(new Date(), {
            days: 7,
        }).toString(),
    );

    const [addErr, setAddErr] = useState('');

    const canSave = [userId, hotelId, serviceId, cardSeries, value].every(Boolean) && !isLoading;

    const onAddBook = async () => {
        if (canSave) {
            try {
                await addBook({
                    userId,
                    hotelId,
                    serviceId,
                    start,
                    end,
                    cardSeries,
                    value,
                    transType: TRANS_TYPES.BOOKING,
                }).unwrap();

                navigate(`/users/books/${userId}`);
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
                            <label htmlFor='userId'>User ID</label>
                            <input
                                type='text'
                                value={userId}
                                onChange={e => setUserId(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='hotelId'>Hotel ID</label>
                            <input
                                type='text'
                                value={hotelId}
                                onChange={e => setHotelId(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='serviceId'>Service ID</label>
                            <input
                                type='text'
                                value={serviceId}
                                onChange={e => setServiceId(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='cardSeries'>Card series</label>
                            <input
                                type='text'
                                value={cardSeries}
                                onChange={e => setCardSeries(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='value'>Giá trị giao dịch</label>
                            <input
                                type='text'
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <p>Note: Các giá trị về ngày tháng đang được fix cố định</p>
                            <p>Ngày bắt đầu: {start}</p>
                            <p>Ngày kết thúc: {end}</p>
                        </div>
                    </form>
                </main>
                <main className='edit-opt'>
                    <button className='item-btn' onClick={onAddBook} disabled={!canSave}>
                        <span>Thêm mới lịch đặt</span>
                    </button>
                    <button className='item-btn'>
                        <Link to={`/users`}>Quay trở lại Users list</Link>
                    </button>
                </main>
            </section>
        </>
    );
};

export default BookCreate;
