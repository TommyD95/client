import { useNavigate } from "react-router-dom";
import useBasketHook from "../../Basket/basket.hook";

const useProductListhook = () => {
    const { buyerId, addItemMutation } = useBasketHook();

    const navigate = useNavigate();

    const renderToDetails = (id: number) => {
        navigate(`/productDetails/${id}`)
    }

    const handleAddItem = (productId: number) => {
        const request = {
            productId: productId,
            buyerId: buyerId,
        }
        addItemMutation(request);

    }
    return {
        renderToDetails,
        handleAddItem
    }
}

export default useProductListhook;