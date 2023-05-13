import { useAddServiceMutation } from '../../app/features/api/servicesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRan, getDiscount } from '../../utils/random';

const ServiceCreate = () => {
    const navigate = useNavigate();
    const [addService, { isLoading }] = useAddServiceMutation();

    const [hotelId, setHotelId] = useState('');
    const [name, setName] = useState('');
    const [prices, setPrices] = useState(1000);
    const [point, setPoint] = useState();
    const [discount, setDiscount] = useState();
    const [totalRooms, setTotalRooms] = useState(10);
    const [availableRooms, setAvailableRooms] = useState(10);
    const [beds, setBeds] = useState(1);
    const [area, setArea] = useState(35);

    const [addErr, setAddErr] = useState('');

    const canSave =
        [hotelId, name, prices, totalRooms, availableRooms].every(Boolean) && !isLoading;

    const onAddService = async () => {
        if (canSave) {
            try {
                await addService({
                    hotelId,
                    name,
                    prices,
                    point,
                    discount,
                    totalRooms,
                    availableRooms,
                    beds,
                    area,
                }).unwrap();

                navigate('/services');
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
                            <label htmlFor='hotelId'>Hotel ID</label>
                            <input
                                type='text'
                                value={hotelId}
                                onChange={e => setHotelId(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='prices'>Prices</label>
                            <input
                                type='text'
                                value={prices}
                                onChange={e => setPrices(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='point'>Point **Không bắt buộc**</label>
                            <input
                                type='number'
                                step={0.1}
                                min={0}
                                max={10}
                                value={point}
                                onChange={e => setPoint(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='discount'>Discount **Không bắt buộc**</label>
                            <input
                                type='number'
                                min={0}
                                max={100}
                                step={1}
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='totalRooms'>Total rooms</label>
                            <input
                                type='text'
                                value={totalRooms}
                                onChange={e => setTotalRooms(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='availableRooms'>Available rooms</label>
                            <input
                                type='text'
                                value={availableRooms}
                                onChange={e => setAvailableRooms(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='beds'>Beds</label>
                            <input
                                type='number'
                                step={1}
                                min={1}
                                max={10}
                                value={beds}
                                onChange={e => setBeds(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='area'>Area</label>
                            <input
                                type='number'
                                step={1}
                                min={1}
                                max={200}
                                value={area}
                                onChange={e => setArea(e.target.value)}
                            />
                        </div>
                    </form>
                </main>
                <main className='edit-opt'>
                    <button className='item-btn' onClick={onAddService} disabled={!canSave}>
                        <span>Xác nhận thay đổi</span>
                    </button>
                    <button className='item-btn'>
                        <Link to={`/services`}>Quay trở lại Hotel list</Link>
                    </button>
                </main>
            </section>
        </>
    );
};

export default ServiceCreate;
