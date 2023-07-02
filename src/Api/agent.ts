import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'https://localhost:4000/api/';
axios.defaults.withCredentials = true;
const cookieValue = document.cookie
    .split("; ")
    .find(row => row.startsWith(`${"buyerId"}=`))
    ?.split("=")[1];

console.log("buyerID:", cookieValue)

const responseBody = (response: AxiosResponse) => response && response.data;

axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    if (error && error.response) {
        const { data, status } = error.response as AxiosResponse;
        switch (status) {
            case 400:
                toast.error(data ? data.title : "");
                break;
            case 401:
                toast.error(data.title);
                break;
            case 500:
                toast.error(data.title);
                break;
            default:
                break;
        }
    }
    //  return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: {}) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const Basket = {
    get: (buyerId: string) => requests.get(`Basket?buyerId=${buyerId}`),
    addItem: (productId: number, buyerId: string, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}&buyerId=${buyerId}`, {}),
    removeItem: (productId: number, buyerId: string, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}&buyerId=${buyerId}`),
}

const testError = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/Unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const agent = {
    Catalog,
    Basket,
    testError,
    cookieValue
}

export default agent;