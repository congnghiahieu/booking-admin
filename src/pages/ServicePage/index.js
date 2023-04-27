import {
    useGetServiceByIdQuery,
    useUpdateSerivceMutation,
    useDeleteServiceByIdMutation,
} from '../../app/features/api/servicesSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

const ServicePage = () => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [updateService] = useUpdateSerivceMutation();
    const [deleteService] = useDeleteServiceByIdMutation();

    const { data: service, isLoading, isSuccess, isError } = useGetServiceByIdQuery(serviceId);

    const [name, setName] = useState('');
    const [prices, setPrices] = useState('');
    const [totalRooms, setTotalRooms] = useState(0);
    const [availableRooms, setAvailableRooms] = useState(0);
    const [beds, setBeds] = useState(0);
    const [area, setArea] = useState(0);
    const [err, setErr] = useState('');

    useEffect(() => {
        if (service?.name) setName(service.name);
        if (service?.prices) setPrices(service.prices);
        if (service?.totalRooms) setTotalRooms(service.totalRooms);
        if (service?.availableRooms) setAvailableRooms(service.availableRooms);
        if (service?.info?.beds) setBeds(service.info?.beds);
        if (service?.info?.area) setArea(service.info?.area);
    }, [service]);

    const onUpdateService = async () => {
        try {
            await updateService({
                id: serviceId,
                hotelId: service.hotelId,
                name,
                prices,
                totalRooms,
                availableRooms,
                beds,
                area,
            }).unwrap();

            navigate('/services');
        } catch (err) {
            console.log(err);
            setErr(err.message);
        }
    };

    const onDeleteService = async () => {
        try {
            await deleteService(serviceId).unwrap();

            navigate('/services');
        } catch (err) {
            console.log(err);
            setErr(err.message);
        }
    };

    return (
        <>
            {isLoading && <div>...Loading</div>}
            {!isLoading && isError && <div>Error while fetching data</div>}
            {err && <div>{err}</div>}
            {!isLoading && isSuccess ? (
                <section className='edit-page'>
                    <main className='edit-content'>
                        <p>ID: {service.id}</p>
                        <p>
                            ID khách sạn:
                            <Link to={`/hotels/${service.hotelId}`}> {service.hotelId}</Link>
                        </p>
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
                                <label htmlFor='prices'>Prices</label>
                                <input
                                    type='text'
                                    value={prices}
                                    onChange={e => setPrices(e.target.value)}
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
                                    type='text'
                                    value={beds}
                                    onChange={e => setBeds(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='area'>Area</label>
                                <input
                                    type='text'
                                    value={area}
                                    onChange={e => setArea(e.target.value)}
                                />
                            </div>
                        </form>
                        <p>
                            Thời gian sẵn sàng:
                            {format(new Date(service.availableTime.start), datetimeFm)}
                        </p>
                        <p>
                            Thời gian kết thúc:
                            {format(new Date(service.availableTime.end), datetimeFm)}
                        </p>
                        <p>Cập nhật vào: {format(new Date(service.updatedAt), datetimeFm)}</p>
                        <p>Được tạo vào: {format(new Date(service.createdAt), datetimeFm)}</p>
                    </main>
                    <main className='edit-opt'>
                        <button className='item-btn' onClick={onUpdateService}>
                            <span>Xác nhận thay đổi</span>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/services`}>Quay trở lại Services list</Link>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/services/images/${service.id}`}>Services images</Link>
                        </button>
                        <button className='item-btn btn danger' onClick={onDeleteService}>
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

export default ServicePage;
