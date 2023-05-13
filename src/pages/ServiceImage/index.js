import {
    useGetServiceImgByIdQuery,
    useAddServiceImgByIdMutation,
    useDeleteServiceImgByImgIdMutation,
    useDeleteAllServiceImgMutation,
} from '../../app/features/api/servicesSlice';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import getViewLinkGG from '../../utils/getViewLinkGG';

const ServiceImage = () => {
    const { serviceId } = useParams();
    const [addImg, { isLoading: isAddLoad }] = useAddServiceImgByIdMutation();
    const [delImg, { isLoading: isDelLoad }] = useDeleteServiceImgByImgIdMutation();
    const [delAllImg, { isLoading: isDelAllLoad }] = useDeleteAllServiceImgMutation();

    const {
        data: serviceImages,
        isLoading,
        isSuccess,
        isError,
    } = useGetServiceImgByIdQuery(serviceId);

    const [files, setFiles] = useState([]);

    const [addErr, setAddErr] = useState('');
    const [delErr, setDelErr] = useState('');
    const [delAllErr, setDelAllErr] = useState('');
    const [preview, setPreview] = useState([]);
    const fileRef = useRef(null);

    const canAdd = !isAddLoad && !isDelLoad && !isDelAllLoad && files.length;

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

    const onAddImg = async () => {
        if (canAdd) {
            const formData = new FormData();
            Object.keys(files).forEach(key => {
                formData.append(files.item(key).name, files.item(key));
            });
            formData.append('serviceId', serviceId);
            try {
                await addImg({ serviceId, data: formData }).unwrap();
                setFiles([]);
                setPreview([]);
                fileRef.current.value = null;
                fileRef.current.files = null;
            } catch (err) {
                console.log(err);
                setAddErr(`${err.status}: ${err.data.message}`);
            }
        }
    };

    const onDelImg = async imageId => {
        try {
            await delImg({ serviceId, imageId }).unwrap();
        } catch (err) {
            console.log(err);
            setDelErr(`${err.status}: ${err.data.message}`);
        }
    };

    const onDelAllImg = async () => {
        try {
            await delAllImg({ serviceId, all: true }).unwrap();
        } catch (err) {
            console.log(err);
            setDelAllErr(`${err.status}: ${err.data.message}`);
        }
    };

    return (
        <>
            {isLoading && <div>...Loading</div>}
            {!isLoading && isError && <div>Error while fetching data</div>}
            {!isAddLoad && addErr && <div>{addErr}</div>}
            {!isDelLoad && delErr && <div>{delErr}</div>}
            {!isDelLoad && delAllErr && <div>{delAllErr}</div>}
            {!isLoading && isSuccess ? (
                <section className='edit-page'>
                    <main className='edit-content'>
                        <p>
                            ID dịch vụ: <Link to={`/services/${serviceId}`}>{serviceId}</Link>
                        </p>
                        <form className='form'>
                            <div className='form-group'>
                                <label htmlFor='files'>Image files</label>
                                <input
                                    ref={fileRef}
                                    type='file'
                                    multiple
                                    onChange={onFilesChange}
                                    accept='.jpg, .jpeg'
                                />
                                {preview.length ? (
                                    <>
                                        <p>Preview trước khi upload</p>
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
                                    </>
                                ) : (
                                    <p>Chưa có ảnh nào được chọn</p>
                                )}
                            </div>
                        </form>
                        {serviceImages.length ? (
                            <>
                                <div>Dịch vụ có {serviceImages.length} ảnh</div>
                                <ul className='big-preview'>
                                    {serviceImages.map((imgId, i) => (
                                        <li key={i} className='preview-item'>
                                            <img
                                                src={getViewLinkGG(imgId)}
                                                className='big-img'
                                                alt='service preview'
                                            />
                                            <button
                                                onClick={() => onDelImg(imgId)}
                                                disabled={isDelLoad || isDelAllLoad}>
                                                Xoá ảnh
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <div>Chưa có ảnh cho dịch vụ này</div>
                        )}
                    </main>
                    <main className='edit-opt'>
                        <button className='item-btn' onClick={onAddImg} disabled={!canAdd}>
                            <span>Xác nhận thêm ảnh</span>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/services`}>Quay trở lại Service list</Link>
                        </button>
                        <button
                            className='item-btn btn danger'
                            onClick={onDelAllImg}
                            disabled={isDelLoad || isDelAllLoad}>
                            <span>Xoá tất cả các ảnh</span>
                        </button>
                    </main>
                </section>
            ) : (
                <></>
            )}
        </>
    );
};

export default ServiceImage;
