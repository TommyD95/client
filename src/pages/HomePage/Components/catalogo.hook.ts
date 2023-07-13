import { useFetchFiltersQuery } from "../../../Api/api";
import FetchFiltersResponse from "../../../models/GetFiltriResponse.model";

const useCatalogoHook = () => {

    const sortOptions = [
        { value: "name", label: "Alphalbetical" },
        { value: "priceDesc", label: "Price-High to low" },
        { value: "price", label: "Price-Low to high" },

    ]

    const { data } = useFetchFiltersQuery();

    let response: FetchFiltersResponse;

    if (data) {
        response = data as FetchFiltersResponse;
        console.log(response.brands); // ['Angular', 'NetCore', 'React', 'TypeScript', 'VS Code', 'Redis']
        console.log(response.types); // ['Boards', 'Hats', 'Gloves', 'Boots']
    } else {
        response = { brands: [], types: [] };
    }


    return {
        sortOptions,
        filters: response
    }
}

export default useCatalogoHook;