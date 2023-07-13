import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductViewModel from "../../models/ProductViewModel.model";
import { Backdrop, CircularProgress, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useProductDetailsHook from "./productDetails.hook";

const ProductDetails = () => {

    const { productDetail, isLoading, quantity, item, handleInputChange, handleUpdateCart } = useProductDetailsHook();

    return (
        <>
            <Backdrop
                open={isLoading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {productDetail ?
                <Grid sx={{ marginTop: 2 }} container >
                    <Grid container item  >
                        <img src={productDetail.pictureUrl} alt={productDetail.name} style={{ width: 300 }} />
                    </Grid>
                    <Grid>
                        <Typography variant="h3">{productDetail.name}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="h4">€{(productDetail.price / 100).toFixed(2)}</Typography>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>{productDetail.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell>{productDetail.description}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell>{productDetail.type}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Brand</TableCell>
                                        <TableCell>{productDetail.brand}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Quantity in stock</TableCell>
                                        <TableCell>{productDetail.quantityInStock}</TableCell>
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