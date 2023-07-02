import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductViewModel from "../../models/ProductViewModel";
import { Backdrop, CircularProgress, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import agent from "../../Api/agent";
import { useStoreContext } from "../../Context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { log } from "console";

const ProductDetails = () => {

    const { id } = useParams();

    const { basket, setBasket, removeItem } = useStoreContext();

    const [product, setProduct] = useState<ProductViewModel>()
    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const item = useMemo(() => basket?.items.find((i => i.productId === product?.id)), [product])

    useEffect(() => {

        if (item) {
            setQuantity(item.quantity)
        };

        agent.Catalog.details(parseInt(id ?? ""))
            .then(response => setProduct(response))
            .catch(e => console.log("error", e.response))
            .finally(() => setLoading(false))
    }, [id, item])

    const handleInputChange = (event: any) => {
        if (event.target.value > 0)
            setQuantity(parseInt(event.target.value));
    }

    const handleUpdateCart = () => {
        console.log("ciao")
        setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!, agent.cookieValue!, updatedQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        } else {
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!, agent.cookieValue!, updatedQuantity)
                .then(() => removeItem(product?.id!, updatedQuantity))
                .catch(e => console.log(e))
                .finally(() => setSubmitting(false))
        }
    }

    return (
        <>
            <Backdrop
                open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {product ?
                <Grid sx={{ marginTop: 2 }} container >
                    <Grid container item  >
                        <img src={product.pictureUrl} alt={product.name} style={{ width: 300 }} />
                    </Grid>
                    <Grid>
                        <Typography variant="h3">{product.name}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="h4">€{(product.price / 100).toFixed(2)}</Typography>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell>{product.type}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Brand</TableCell>
                                        <TableCell>{product.brand}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Quantity in stock</TableCell>
                                        <TableCell>{product.quantityInStock}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container spacing={2}>
                            <Grid container item xs={6}>
                                <TextField variant="outlined"
                                    type="number"
                                    label="Quantity in Cart"
                                    fullWidth
                                    value={quantity}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid container item sm={6}>
                                <LoadingButton
                                    sx={{
                                        height: "55px",
                                    }}
                                    color="primary"
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                    onClick={() => handleUpdateCart()}
                                    disabled={item?.quantity === quantity || !item && quantity === 0}
                                > {item ? 'update Quantity' : "add to cart"}</LoadingButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> : <Typography variant="h2">Product not found</Typography>}
        </>
    )
}

export default ProductDetails;