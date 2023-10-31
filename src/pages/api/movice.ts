import request from '@/pages/utils/request';

export function getMoviceData(params) {
    return request.get('https://m.maizuo.com/gateway?type=1&k=1039533', {
        params,
    });
}

export function getMoviceComingData(params) {
    return request.get('https://m.maizuo.com/gateway?type=2&k=2724448', { params });
}
