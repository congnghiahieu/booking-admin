import { useGetAllSerivcesQuery } from '../../app/features/api/servicesSlice';
import { ServiceItem, PagingNav } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ServiceList = () => {
    const [page, setPage] = useState(1);
    const {
        data: services,
        isLoading,
        isSuccess,
        isError,
        isFetching,
    } = useGetAllSerivcesQuery({ page, perPage: 1 });

    return (
        <>
            {isLoading && <div>...Loading</div>}
            {!isLoading && isError && <div>Error while fetching data</div>}
            {!isLoading && isSuccess ? (
                <>
                    <PagingNav
                        isFetching={isFetching}
                        page={page}
                        setPage={setPage}
                        totalPages={services.totalPages}
                    />
                    {services.ids.length ? (
                        <>
                            <p className='summary'>
                                Có {services.ids.length} dịch vụ trong hệ thống
                            </p>
                            <ul>
                                {services.ids.map(id => {
                                    const service = services.entities[id];

                                    return (
                                        <li key={id} className='item'>
                                            <ServiceItem user={service} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <div>
                            <p>Hiện tại không có service nào trong hệ thống</p>
                            <Link to='/services/create'>Tạo service</Link>
                        </div>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default ServiceList;
