import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { BasketViewModel } from "../../models/BasketViewModel";
import agent from "../../Api/agent";
import BaseTable from "./Components/BasketItems.component";
import { useStoreContext } from "../../Context/StoreContext";
import BasketItems from "./Components/BasketItems.component";
import BasketSummary from "./Components/BusketSymmary.component";
import { useNavigate } from "react-router-dom";

const BasketPage = () => {

    const { basket, loading } = useStoreContext();

    const navigate = useNavigate();

    const redirectToCheckout = () => {
        navigate("/checkout");
    }


    return (
        <>
            <Backdrop
                open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container>
                {basket && basket.items.length > 0 ?
                    <>
                        <BasketItems />
                        <Grid container>
                            <Grid container item sm={6}></Grid>
                            <Grid container item sm={6}>
                                <BasketSummary />
                                <Button
                                    color="primary"
                                    size="large"
                                    variant="contained"
                                    fullWidth
                                    onClick={() => redirectToCheckout()}
                                >
                                    Checkout
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                    : loading === false
                        ? <Typography variant="h3" color={"InfoText"}>Your basket is empty!</Typography>
                        : null}


            </Container>
        </>
    )
}

export default BasketPage;