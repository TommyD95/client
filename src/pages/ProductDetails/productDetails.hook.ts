import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchProductByIDQuery } from "../../Api/api";
import useBasketHook from "../Basket/basket.hook";

const useProductDetailsHook = () => {
    const { id } = useParams();

    const { data: productDetail, isLoading } = useFetchProductByIDQuery(parseInt(id ?? ""));

    const [quantity, setQuantity] = useState(0);

    const { basket, buyerId, addItemMutation, handleRemoveItem } = useBasketHook();

    const item = useMemo(() => basket?.items.find((i => i.productId === productDetail?.id)), [basket])

    useEffect(() => {

        if (item) {
            setQuantity(item.quantity)
        };
    }, [id, item])

    const handleInputChange = (event: any) => {
        if (event.target.value > 0)
            setQuantity(parseInt(event.target.value));
    }

    const handleUpdateCart = () => {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            const request = {
                productId: productDetail?.id ?? 0,
                buyerId: buyerId,
                updatedQuantity
            }
            addItemMutation(request);

        } else {
            const updatedQuantity = item.quantity - quantity;

            handleRemoveItem(productDetail?.id ?? 0, updatedQuantity)

        }
    }
    return {
        isLoading,
        productDetail,
        handleInputChange,
        handleUpdateCart,
        quantity,
        item,
    }
}

export default useProductDetailsHook;