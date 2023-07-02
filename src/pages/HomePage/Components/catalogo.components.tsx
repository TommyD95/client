import { Avatar, Container, List, ListItem, ListItemAvatar } from "@mui/material";
import ProductViewModel from "../../../models/ProductViewModel";
import ProductsList from "./product-list.component";

type IProps = {
    products: ProductViewModel[];
}

const CatalogoComponent = (props: IProps) => {

    const { products } = props;


    return (
        <>
            <Container>
                <ProductsList products={products} />

            </Container>
        </>
    )
}

export default CatalogoComponent;