import { ListItem, ListItemAvatar, Avatar, List, Card, Button, CardActions, CardContent, CardMedia, Typography, Grid, CardHeader, Backdrop, CircularProgress } from "@mui/material";
import ProductViewModel from "../../../models/ProductViewModel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import agent from "../../../Api/agent";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useStoreContext } from "../../../Context/StoreContext";

type IProps = {
    products: ProductViewModel[];
}
const ProductsList = (props: IProps) => {

    const { products } = props;

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { setBasket } = useStoreContext();

    const renderToDetails = (id: number) => {
        navigate(`/productDetails/${id}`)
    }

    const handleAddItem = (productId: number) => {
        setLoading(true);
        agent.Basket.addItem(productId, agent.cookieValue!, 1)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const viewProducts = () => {

        return products ? (products.map((product, i) =>
            <Grid key={i} container item xs={3}>
                <Card sx={{ width: 250 }}>
                    <CardHeader
                        title={product.name}
                        avatar={
                            <Avatar >
                                {product.name.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        titleTypographyProps={{
                            sx: { fontWeight: 'bold', }
                        }}
                    />
                    <CardMedia
                        sx={{ height: 240, backgroundSize: "contain" }}
                        image={product.pictureUrl}
                        title={product.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >
                            €{(product.price / 100).toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.brand} / {product.type}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <LoadingButton size="small" loading={loading} onClick={() => handleAddItem(product.id)}>add to cart</LoadingButton>
                        <Button size="small" onClick={() => renderToDetails(product.id)}>view</Button>
                    </CardActions>
                </Card>
            </Grid>)

        ) : null;
    };


    return (
        <>
            <div>
                <Grid className="mt-3" container spacing={2} >

                    {viewProducts()}
                </Grid>
            </div>
        </>
    )
}

export default ProductsList;