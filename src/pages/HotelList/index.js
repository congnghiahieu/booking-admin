import { useState } from 'react';
import { useGetAllHotelsQuery } from '../../app/features/api/hotelsSlice';
import { HotelItem, PagingNav } from '../../components';
import { Link } from 'react-router-dom';
import ProvinceMapping from '../../utils/ProvinceMapping.json'
const provinces = Object.values(ProvinceMapping).map(v => v.name)
const HotelList = () => {
    const [province,setProvince] = useState('Hà Nội')
    const [page, setPage] = useState(1);
    const {
        data: hotels,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    } = useGetAllHotelsQuery({ page, perPage: 4, province });
    console.log(hotels)
    const handleChange = (e) => {
        //console.log(e.target.value);
        setProvince(e.target.value);

    }

    // console.log(province);
    return (
        <>
            {isLoading && <div>...Loading</div>}
            {!isLoading && isError && <div>Error while fetching data</div>}
            {!isLoading && isSuccess ? (
                <>
                    <select onChange={handleChange} value={province}>
                        {provinces.map(province => {
                            return <option key={province} value={province}>{province}</option>
                        })}
                    </select>
                    <PagingNav
                        isFetching={isFetching}
                        page={page}
                        setPage={setPage}
                        totalPages={hotels.totalPages}
                    />
                    {hotels.ids.length ? (
                        <>
                            <div className='summary'>
                                <p>Có {hotels.total} khách sạn trong hệ thống </p>
                                <p>Có {hotels.curTotal} khách sạn ở trang này</p>
                            </div>
                            <ul>
                                {hotels.ids.map(id => {
                                    const hotel = hotels.entities[id];
                                    if (hotel.location.province === province) {
                                        // console.log(hotel)
                                        return (
                                            <li key={id} className='item'>
                                                <HotelItem user={hotel} />
                                            </li>
                                        );
                                    }

                                })}
                            </ul>
                        </>
                    ) : (
                        <div>
                            <p>Hiện tại không có hotel nào trong hệ thống</p>
                            <Link to='/hotels/create'>Tạo hotel</Link>
                        </div>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default HotelList;
