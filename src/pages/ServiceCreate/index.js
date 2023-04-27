import { useAddServiceMutation } from '../../app/features/api/servicesSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ServiceCreate = () => {
    const navigate = useNavigate();
    const [addService, { isLoading }] = useAddServiceMutation();

    const [hotelId, setHotelId] = useState('');
    const [name, setName] = useState('');
    const [prices, setPrices] = useState(1000);
    const [totalRooms, setTotalRooms] = useState(5);
    const [availableRooms, setAvailableRooms] = useState(5);
    const [beds, setBeds] = useState(1);
    const [area, setArea] = useState(35);
    const [files, setFiles] = useState([]);

    const [addErr, setAddErr] = useState('');
    const [preview, setPreview] = useState([]);

    const canSave =
        [hotelId, name, prices, totalRooms, availableRooms].every(Boolean) &&
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

    const onAddService = async () => {
        if (canSave) {
            const formData = new FormData();
            Object.keys(files).forEach(key => {
                formData.append(files.item(key).name, files.item(key));
            });
            formData.append('hotelId', hotelId);
            formData.append('name', name);
            formData.append('prices', prices);
            formData.append('totalRooms', totalRooms);
            formData.append('availableRooms', availableRooms);
            formData.append('beds', beds);
            formData.append('area', area);
            try {
                await addService(formData).unwrap();

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
