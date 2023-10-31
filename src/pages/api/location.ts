import request from '@/pages/utils/request';

export function getLocationList() {
    return request.get('https://m.maizuo.com/gateway?k=564058', {
        headers: {
            'X-Host': 'mall.film-ticket.city.list',
        },
    });
}

export function getLocation(params) {
    return request.get('https://m.maizuo.com/gateway?k=4729700', {
        headers: {
            'X-Host': 'mall.film-ticket.city.locate',

            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16986321061049067236884481"}',
            ...params,
        },
    });
}
