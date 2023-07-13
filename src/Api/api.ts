import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import ProductViewModel from "../models/ProductViewModel.model"
import { BasketViewModel } from "../models/BasketViewModel.model"
import { ProductParams } from "../models/ProductParams.model"
import MetaData from "../models/pagination.model"


const productsList = createApi({
    reducerPath: 'Products',
    baseQuery: fetchBaseQuery({
        baseUrl: "https:localhost:4000/api"
    }),
    tagTypes: ["Products"],
    endpoints(builder) {

        return {
            fetchListaProducts: builder.query<{ apiResponse: ProductViewModel[], pagination: MetaData }, ProductParams>({
                providesTags: ['Products'],

                query: (params) => {
                    return {
                        url: "/Products",
                        method: 'GET',
                        params: {
                            orderBy: params.orderBy,
                            searchTerms: params.searchTerms,
                            types: params.types,
                            brands: params.brands,
                            pageNumber: params.pageNumber,
                            pageSize: params.pageSize
                        },


                    }

                }, transformResponse(apiResponse: ProductViewModel[], meta) {
                    const paginationHeader = meta?.response?.headers.get('pagination');
                    const pagination: MetaData = paginationHeader ? JSON.parse(paginationHeader) : null;
                    return { apiResponse, pagination };
                }


            },
            ),

            fetchProductByID: builder.query<ProductViewModel, number>({
                query: (id) => ({
                    url: `Products/${id}`,
                    method: 'GET',
                })
            }),
            fetchFilters: builder.query<Object, void>({
                query: () => ({
                    url: 'Products/filters',
                    method: 'GET'
                }),

            }),
        }

    }
})

const BasketList = createApi({
    reducerPath: 'Basket',
    baseQuery: fetchBaseQuery({
        baseUrl: "https:localhost:4000/api"
    }),
    tagTypes: ["Basket"],
    endpoints(builder) {
        return {
            fetchBasket: builder.query<BasketViewModel, string>({
                providesTags: ["Basket"],
                query: (buyerId) => ({
                    url: `Basket?buyerId=${buyerId}`,
                    method: 'GET',
                })
            }),
            addItem: builder.mutation<void, { productId: number, buyerId: string, quantity?: number }>({
                query: ({ productId, buyerId, quantity = 1 }) => ({
                    url: `basket?productId=${productId}&quantity=${quantity}&buyerId=${buyerId}`,
                    method: 'POST',
                })
            }),
            removeItem: builder.mutation<void, { productId: number, buyerId: string, quantity?: number }>({
                query: ({ productId, buyerId, quantity = 1 }) => ({
                    url: `basket?productId=${productId}&quantity=${quantity}&buyerId=${buyerId}`,
                    method: 'DELETE',
                })
            })
        }
    }
}
)

export const { useFetchListaProductsQuery, useFetchProductByIDQuery, useFetchFiltersQuery } = productsList;
export const { useFetchBasketQuery, useAddItemMutation, useRemoveItemMutation } = BasketList;

export { productsList, BasketList };