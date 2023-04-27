import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import CopiedText from '../CopiedText';

const ServiceItem = ({ user: service }) => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';

    return (
        <>
            <div className='item-content'>
                <p>
                    Service ID: <CopiedText text={service.id} />
                </p>
                <p>
                    ID khách sạn: <Link to={`/hotels/${service.hotelId}`}>{service.hotelId}</Link>
                    <CopiedText text={service.hotelId} textHidden={true} />
                </p>
                <p>Tên dịch vụ: {service.name}</p>
                <p>Giá cả: {service.prices}</p>
                <p>Tổng số phòng: {service.totalRooms}</p>
                <p>Tổng số phòng còn lại: {service.availableRooms}</p>
                <p>Diện tích: {service.info.area}</p>
                <p>Số giường: {service.info.beds}</p>
                <ul>
                    {service.info.attrs.map(at => (
                        <li key={at.k}>
                            {at.k}: {at?.v ? 'Không có giá trị' : ''}{' '}
                            {at?.u ? 'Không có đơn vị' : ''}
                        </li>
                    ))}
                </ul>
                <p>
                    Hình ảnh: <Link to={`/services/images/${service.id}`}>Xem chi tiết</Link>
                </p>
                <p>
                    Thời gian sẵn sàng: {format(new Date(service.availableTime.start), datetimeFm)}
                </p>
                <p>Thời gian kết thúc: {format(new Date(service.availableTime.end), datetimeFm)}</p>
                <p>Cập nhật vào: {format(new Date(service.updatedAt), datetimeFm)}</p>
                <p>Được tạo vào: {format(new Date(service.createdAt), datetimeFm)}</p>
            </div>
            <div className='item-opt'>
                <button className='item-btn'>
                    <Link to={`/services/${service.id}`}>View & Edit</Link>
                </button>
                <button className='item-btn'>
                    <Link to={`/services/images/${service.id}`}>Services imgs</Link>
                </button>
            </div>
        </>
    );
};

export default ServiceItem;
