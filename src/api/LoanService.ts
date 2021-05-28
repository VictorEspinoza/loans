import http from '@/api/http';
import ApiResult from '@/api/ApiResult';


export async function loadConstraints() {
    try {
        const result = await http.get('/constraints', {});
        return new ApiResult(true, result.data);
    } catch(e) {
        return new ApiResult(false, {message: 'Could not load constraints'})
    }
}

export async function realFirstLoanOffer({amount, term}: {amount:number; term: number;}) {
    try {
        const result = await http.get('/real-first-loan-offer', { params: {
            amount, term
        }});
        return new ApiResult(true, result.data);
    } catch(e) {
        return new ApiResult(false, {message: 'Could not load constraints'})
    }
}