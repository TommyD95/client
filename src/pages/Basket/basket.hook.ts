import { useState, useEffect, useMemo } from "react";
import { useFetchBasketQuery, useAddItemMutation, useRemoveItemMutation } from "../../Api/api";
import agent from "../../Api/agent";
import { useNavigate } from "react-router-dom";

const useBasketHook = () => {

    const navigate = useNavigate();


    const buyerId = agent.cookieValue ?? "";

    const { data: basketResponse, refetch: refetchBasket, isLoading: loadingBasket } = useFetchBasketQuery(buyerId);
    const basket = useMemo(() => (basketResponse ? basketResponse : undefined), [basketResponse]);


    const [addItemMutation, { isSuccess: addItemSuccess, isLoading: addItemLoading }] = useAddItemMutation();
    const [removeItemMutation, { isSuccess: removeItemSuccess, isLoading: removeItemLoading }] = useRemoveItemMutation();

    const handleAddItem = (productId: number) => {
        const request = {
            productId: productId,
            buyerId: buyerId,
            quantity: 1
        }
        addItemMutation(request);
    }

    useEffect(() => {
        if (addItemSuccess) {
            refetchBasket();
        }
    }, [addItemSuccess])

    useEffect(() => {
        if (removeItemSuccess) {
            refetchBasket();
        }
    }, [removeItemSuccess])

    useEffect(() => {
        if (!basket) {
            refetchBasket()
        }
    }, [basket])

    const handleRemoveItem = (productId: number, quantity?: number) => {
        const request = {
            productId: productId,
            buyerId: buyerId,
            quantity: quantity ? quantity : 1
        }
        removeItemMutation(request);
    }

    const redirectToCheckout = () => {
        navigate("/checkout");
    }


    return {
        addItemMutation,
        addItemSuccess,
        agent,
        basket,
        buyerId,
        loading: addItemLoading || addItemLoading || loadingBasket,
        handleAddItem,
        handleRemoveItem,
        redirectToCheckout
    }

}

export default useBasketHook;