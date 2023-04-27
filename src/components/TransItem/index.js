import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import CopiedText from '../CopiedText';

const TransItem = ({ user: trans }) => {
    const datetimeFm = 'dd/MM/yyyy HH:mm:ss OOOO';

    return (
        <>
            <div className='item-content'>
                <p>
                    ID giao dịch: <CopiedText text={trans.id} />
                </p>
                <p>
                    ID chủ giao dịch: <Link to={`/users/${trans.userId}`}>{trans.userId}</Link>
                    <CopiedText text={trans.userId} textHidden={true} />
                </p>
                <p>Số series: {trans.cardSeries} </p>
                <p>Giá trị: {trans.value} </p>
                <p>Loại giao dịch: {trans.transType}</p>
                <p>Tình trạng giao dịch: {trans.status}</p>
                <p>Cập nhật vào: {format(new Date(trans.updatedAt), datetimeFm)}</p>
                <p>Được tạo vào: {format(new Date(trans.createdAt), datetimeFm)}</p>
            </div>
            <div className='item-opt'>
                {/* <button className='item-btn'>
                    <Link to={`/users/${trans.id}`}>View & Edit</Link>
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

export default TransItem;
