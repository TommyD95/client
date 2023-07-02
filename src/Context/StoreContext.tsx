import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { BasketViewModel } from "../models/BasketViewModel"
import agent from "../Api/agent";

interface StoreContextValue {
    basket: BasketViewModel | null;
    setBasket: (basket: BasketViewModel) => void;
    removeItem: (productId: number, quantity: number) => void;
    loading: boolean
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const useStoreContext = () => {


    const context = useContext(StoreContext);

    if (context == undefined) {
        throw Error('Opps - we do not semm to be inside the provider')
    }

    return context;
}


const StoreProvider = ({ children }: PropsWithChildren<any>) => {
    const [basket, setBasket] = useState<BasketViewModel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        setLoading(true);
        agent.Basket.get(agent.cookieValue ?? "")
            .then((data) => setBasket(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    const removeItem = (productId: number, quantity: number) => {
        if (!basket) return;
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId)
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1)
            setBasket({ ...basket, items: [...items] });
        }
    }


    return (
        <StoreContext.Provider value={{ basket, loading, setBasket, removeItem }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;