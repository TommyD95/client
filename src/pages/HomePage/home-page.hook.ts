import { useEffect, useMemo, useState } from "react";
import { useFetchFiltersQuery, useFetchListaProductsQuery } from "../../Api/api";
import { ProductParams } from "../../models/ProductParams.model";
import MetaData from "../../models/pagination.model";

const useHomePageHook = () => {

    const [productParams, setProductParams] = useState<ProductParams>({
        orderBy: 'name',
        searchTerms: '',
        types: [],
        brands: [],
        pageNumber: 1,
        pageSize: 10,
    });

    const { data, isLoading, isFetching, } = useFetchListaProductsQuery(productParams);
    const productsList = useMemo(() => data?.apiResponse || [], [data]);
    const pagination = useMemo(() => new MetaData(
        {
            currentPage: data?.pagination.currentPage,
            pageSize: data?.pagination.pageSize,
            totalCount: data?.pagination.totalCount,
            totalPages: data?.pagination.totalPages
        }
    ), [data]);

    useEffect(() => {
        console.log("pagination", pagination);
        console.log("currentPage", pagination.currentPage);

    }, [data])

    return {
        productsList,
        isLoading: isLoading || isFetching,
        productParams,
        pagination,
        setProductParams: (params: ProductParams) => setProductParams(params)
    }
}

export default useHomePageHook;