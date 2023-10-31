import { memo, useEffect, useState } from 'react';
import { getMoviceData, getMoviceComingData } from '@/pages/api/movice';
import { moviceImf } from '@/pages/types/movice';
import '@/pages/css/movice.scss';
import { useParams } from 'react-router-dom';
import Loading from './loading';
import { useSelector } from 'react-redux';

import type { cityStateImf } from '@/types/location';

function HomePage() {
    const [movice, setMovice] = useState<Array<moviceImf>>([]);
    const cityId = useSelector((state: cityStateImf) => state.location.locale.cityId);
    const { id } = useParams();
    const [page, setPage] = useState({
        pageNum: 1,
        pageSize: 10,
        total: 0,
        cityId,
    });
    const [loading, showloading] = useState<Boolean>(false);

    async function getMoviceDataList(type = '1') {
        showloading(true);
        if (type === '1') {
            const {
                data: { films, total },
            } = await getMoviceData(page);
            console.log(page);
            setMovice(movice.concat(films));
            setPage({
                ...page,
                total,
            });
        } else {
            const {
                data: { films, total },
            } = await getMoviceComingData(page);
            setMovice(movice.concat(films));
            setPage({
                ...page,
                total,
            });
        }
        showloading(false);
    }

    useEffect(() => {
        async function fn() {
            setPage({
                ...page,
                cityId,
            });
            console.log(cityId, page);
            await getMoviceDataList(id);
        }
        fn();
    }, [cityId, id]);
    return (
        <>
            <div>
                {loading ? <Loading /> : ''}
                {!loading &&
                    movice.map((item, index) => {
                        return (
                            <div className='movice-item' key={index}>
                                <div className='movice-poster'>
                                    <img src={item.poster} alt='' />
                                </div>
                                <div className='movice-content'>
                                    <div className='movice-name'>{item.name}</div>
                                    <div className='movice-grade'>
                                        观众评分 <span>{item.grade}</span>{' '}
                                    </div>
                                    <div className='movice-anctor'>
                                        {item.actors.map((anctor, index) => {
                                            return <span key={index}>{anctor.name} </span>;
                                        })}
                                    </div>
                                    <div className='movice-tips'>
                                        <span>{item.nation}</span>
                                        <span>|</span>
                                        <span>{item.runtime}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default memo(HomePage);
