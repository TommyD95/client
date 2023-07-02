import axios from "axios";
import { useEffect, useState } from "react";
import ProductViewModel from "../../models/ProductViewModel";
import agent from "../../Api/agent";

const useHomePageHook = () => {


    const [products, setProducts] = useState<ProductViewModel[]>([])
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        agent.Catalog.list()
            .then(response => setProducts(response))
            .catch(e => console.log("error", e))
            .finally(() => setLoading(false))
    }, [])

    return {
        products,
        loading
    }
}

export default useHomePageHook;