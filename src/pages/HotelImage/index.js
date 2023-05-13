import {
    useGetHotelImgByIdQuery,
    useAddHotelImgByIdMutation,
    useDeleteHotelImgByImgIdMutation,
    useDeleteAllHotelImgMutation,
} from '../../app/features/api/hotelsSlice';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { CopiedText } from '../../components';
import getViewLinkGG from '../../utils/getViewLinkGG';

const HotelImage = () => {
    const { hotelId } = useParams();
    const [addImg, { isLoading: isAddLoad }] = useAddHotelImgByIdMutation();
    const [delImg, { isLoading: isDelLoad }] = useDeleteHotelImgByImgIdMutation();
    const [delAllImg, { isLoading: isDelAllLoad }] = useDeleteAllHotelImgMutation();

    const { data: hotelImages, isLoading, isSuccess, isError } = useGetHotelImgByIdQuery(hotelId);

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
            formData.append('hotelId', hotelId);
            // console.log(
            //     Array.from(formData.entries()).forEach(([k, v]) => {
            //         console.log(k);
            //         console.log(v);
            //     }),
            // );
            try {
                await addImg({ hotelId, data: formData }).unwrap();
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
            await delImg({ hotelId, imageId }).unwrap();
        } catch (err) {
            console.log(err);
            setDelErr(`${err.status}: ${err.data.message}`);
        }
    };

    const onDelAllImg = async () => {
        try {
            await delAllImg({ hotelId, all: true }).unwrap();
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
                            ID khách sạn: <Link to={`/hotels/${hotelId}`}>{hotelId}</Link>
                            <CopiedText text={hotelId} textHidden={true} />
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
                        {hotelImages.length ? (
                            <>
                                <div>Khách sạn có {hotelImages.length} ảnh</div>
                                <ul className='big-preview'>
                                    {hotelImages.map((imgId, i) => (
                                        <li key={i} className='preview-item'>
                                            <img
                                                src={getViewLinkGG(imgId)}
                                                className='big-img'
                                                alt='hotel preview'
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
                            <div>Chưa có ảnh cho khách sạn này</div>
                        )}
                    </main>
                    <main className='edit-opt'>
                        <button className='item-btn' onClick={onAddImg} disabled={!canAdd}>
                            <span>Xác nhận thêm ảnh</span>
                        </button>
                        <button className='item-btn'>
                            <Link to={`/hotels`}>Quay trở lại Hotel list</Link>
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

export default HotelImage;
