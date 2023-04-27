import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUpdateBookByIdMutation } from '../../app/features/api/booksSlice';
import CopiedText from '../CopiedText';

const BookItem = ({ user: book }) => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';
    const [cancelBook, { isLoading: isCancelLoad }] = useUpdateBookByIdMutation();
    const [cancelErr, setCancelErr] = useState('');

    const onCancel = async () => {
        try {
            await cancelBook({ id: book.id, cancelFlag: true }).unwrap();
        } catch (err) {
            console.log(err);
            setCancelErr(`${err.status}: ${err.data.message}`);
        }
    };

    return (
        <>
            <div className='item-content'>
                {cancelErr && <div>{cancelErr}</div>}
                <p>
                    ID lịch đặt: <CopiedText text={book.id} />
                </p>
                <p>
                    ID người đặt: <Link to={`/users/${book.userId}`}>{book.userId}</Link>
                    <CopiedText text={book.userId} textHidden={true} />
                </p>
                <p>
                    ID khách sạn: <Link to={`/hotels/${book.hotelId}`}>{book.hotelId}</Link>
                    <CopiedText text={book.hotelId} textHidden={true} />
                </p>
                <p>
                    ID dịch vụ: <Link to={`/services/${book.serviceId}`}>{book.serviceId}</Link>
                    <CopiedText text={book.serviceId} textHidden={true} />
                </p>
                <p>ID giao dịch: {book.transactionId || 'Không có ID giao dịch'}</p>

                <p>Trạng thái: {book.status || 'Không xác định được trạng thái'}</p>
                <p>
                    {book.isCanceled === true
                        ? 'Lịch đặt đang diễn ra'
                        : book.isCanceled === false
                        ? 'Lịch đặt đã bị huỷ'
                        : 'Không xác định được trạng thái'}
                </p>
                <p>
                    Thời gian lịch đặt bị huỷ:{' '}
                    {book.canceledTime
                        ? format(new Date(book.canceledTime), datetimeFm)
                        : 'Lịch đặt không ở trạng thái bị huỷ'}
                </p>
                <p>
                    Tình trạng thanh toán:{' '}
                    {book.isPaid ? 'Đã được thanh toán' : 'Chưa được thanh toán'}
                </p>
                <p>Ngày bắt đầu: {format(new Date(book.period.start), datetimeFm)}</p>
                <p>Ngày kết thúc: {format(new Date(book.period.end), datetimeFm)}</p>
                <p>Cập nhật vào: {format(new Date(book.updatedAt), datetimeFm)}</p>
                <p>Được tạo vào: {format(new Date(book.createdAt), datetimeFm)}</p>
            </div>
            <div className='item-opt'>
                <button className='item-btn btn danger' disabled={isCancelLoad}>
                    <span onClick={onCancel}>Cancel Book</span>
                </button>
                {/* <button className='item-btn'>
                    <Link to={`/users/${book.id}`}>View & Edit</Link>
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

export default BookItem;
