import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import CopiedText from '../CopiedText';

const HotelItem = ({ user: hotel }) => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';

    return (
        <>
            <div className='item-content'>
                <p>
                    ID: <CopiedText text={hotel.id} />
                </p>
                <p>Tên khách sạn: {hotel.name}</p>
                <p>Tiêu đề : {hotel.title}</p>
                <p>Slug: {hotel.slug}</p>
                <p>Quốc gia: {hotel.location.nation}</p>
                <p>Tỉnh thành: {hotel.location.province}</p>
                <p>
                    Quận huyện: {hotel?.location?.province || 'Chưa cập nhật quận'},
                    {hotel?.location?.others || 'chưa cập nhật địa chỉ cụ thể'}
                </p>
                <p>Email: {hotel?.contact?.email || 'Chưa cập nhật email'}</p>
                <p>Số điện thoại: {hotel?.contact?.phone || 'Chưa cập nhật số điện thoại'}</p>
                <p>Mô tả: {hotel.desc}</p>
                <p>Số sao: {hotel?.stars || 'Chưa cập nhật số sao'}</p>
                <p>Tổng số lượt đặt: {hotel?.bookedCount || 'Chưa cập nhật số lượt đặt phòng'}</p>
                <p>Tông số lượt bình luận: {hotel?.cmtSum || 'Chưa cập nhật số lượt bình luận'}</p>

                <p>
                    Hình ảnh: <Link to={`/hotels/images/${hotel.id}`}>Xem chi tiết</Link>
                </p>
                <p>Thời gian sẵn sàng: {format(new Date(hotel.availableTime.start), datetimeFm)}</p>
                <p>Thời gian kết thúc: {format(new Date(hotel.availableTime.end), datetimeFm)}</p>
                <p>Cập nhật vào: {format(new Date(hotel.updatedAt), datetimeFm)}</p>
                <p>Được tạo vào: {format(new Date(hotel.createdAt), datetimeFm)}</p>
            </div>
            <div className='item-opt'>
                <button className='item-btn'>
                    <Link to={`/hotels/${hotel.id}`}>View & Edit</Link>
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
            </div>
        </>
    );
};

export default HotelItem;
