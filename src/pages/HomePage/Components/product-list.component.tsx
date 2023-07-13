import { Avatar, Card, Button, CardActions, CardContent, CardMedia, Typography, Grid, CardHeader } from "@mui/material";
import ProductViewModel from "../../../models/ProductViewModel.model";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

import useProductListhook from "./product-list.hook";

type IProps = {
    products: ProductViewModel[];
    loading: boolean;
}
const ProductsList = (props: IProps) => {

    const { products, loading } = props;

    const { handleAddItem, renderToDetails } = useProductListhook();

    const viewProducts = () => {

        return products ? (products.map((product, i) =>
            <Grid key={i} item xs={4} >
                <Card style={{ marginLeft: 50 }} sx={{ width: 250 }}>
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