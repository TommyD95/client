import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box } from "@mui/material"
import { BasketViewModel } from "../../../models/BasketViewModel"
import { Add, Delete, Remove, Title } from "@mui/icons-material"
import { useStoreContext } from "../../../Context/StoreContext"
import { useState } from "react"
import agent from "../../../Api/agent"
import { LoadingButton } from "@mui/lab"

const BasketItems = () => {

    const { basket, setBasket, removeItem } = useStoreContext()
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddItem = (productId: number) => {
        setLoading(true);
        agent.Basket.addItem(productId, agent.cookieValue ?? "", 1)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    const handleRemoveItem = (productId: number, quantity = 1) => {
        setLoading(true);
        agent.Basket.removeItem(productId, agent.cookieValue ?? "", quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <TableContainer component={Paper} sx={{ marginTop: 10 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket && basket.items.map((item) => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display={"flex"} alignItems={"center"}>
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="right" padding="none">
                                <LoadingButton loading={loading} onClick={() => handleRemoveItem(item.productId)} color="error">
                                    <Remove />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton onClick={() => handleAddItem(item.productId)} color="error">
                                    <Add />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <LoadingButton loading={loading} onClick={() => handleRemoveItem(item.productId, item.quantity)} color="error">
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasketItems;