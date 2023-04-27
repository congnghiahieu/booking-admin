import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDeleteCmtByIdMutation } from '../../app/features/api/cmtsSlice';
import CopiedText from '../CopiedText';

const CmtItem = ({ user: cmt }) => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';
    const [deleteCmt, { isDelLoad }] = useDeleteCmtByIdMutation();
    const [delErr, setDelErr] = useState('');

    const onDeleteCmt = async () => {
        try {
            await deleteCmt(cmt.id).unwrap();
        } catch (err) {
            setDelErr(err.message);
        }
    };

    return (
        <>
            {delErr && <div>{delErr}</div>}
            <div className='item-content'>
                <p>
                    ID bình luận: <CopiedText text={cmt.id} />
                </p>
                <p>
                    ID người đặt: <Link to={`/users/${cmt.userId}`}>{cmt.userId}</Link>
                    <CopiedText text={cmt.userId} textHidden={true} />
                </p>
                <p>
                    ID khách sạn: <Link to={`/hotels/${cmt.hotelId}`}>{cmt.hotelId}</Link>
                    <CopiedText text={cmt.hotelId} textHidden={true} />
                </p>
                <p>Tiêu đề: {cmt.title}</p>
                <p>Nội dung: {cmt.content}</p>
                <p>Điểm số: {cmt.point}</p>
                <p>Cập nhật vào: {format(new Date(cmt.updatedAt), datetimeFm)}</p>
                <p>Được tạo vào: {format(new Date(cmt.createdAt), datetimeFm)}</p>
            </div>
            <div className='item-opt'>
                <button className='item-btn btn danger' onClick={onDeleteCmt}>
                    <span>Delete</span>
                </button>
                {/* <button className='item-btn'>
                    <Link to={`/users/${cmt.id}`}>View & Edit</Link>
                </button>
                <button className='item-btn'>
                    <Link>Books</Link>
                </button>
                <button className='item-btn'>
                    <Link>Comments</Link>
                </button>
                <button className='item-btn'>
                    <Link>Transactions</Link>
                </button> */}
            </div>
        </>
    );
};

export default CmtItem;
