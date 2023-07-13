import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material"
import BasketItems from "./Components/BasketItems.component";
import BasketSummary from "./Components/BusketSymmary.component";
import useBasketHook from "./basket.hook";

const BasketPage = () => {

    const { loading, basket, redirectToCheckout } = useBasketHook();

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
                        <BasketItems basket={basket} />
                        <Grid container>
                            <Grid container item sm={6}></Grid>
                            <Grid container item sm={6} marginTop={5}>
                                <BasketSummary basket={basket} />
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