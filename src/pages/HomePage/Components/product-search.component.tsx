import { Paper, TextField } from "@mui/material";
import { ProductParams } from "../../../models/ProductParams.model";

interface IProps {
    productParams: ProductParams;
    setProductParams: (params: ProductParams) => void;
}

const ProductSearch = (props: IProps) => {

    const { productParams, setProductParams } = props;

    const onChangeSearchTerms = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProductParams({ ...productParams, searchTerms: event.target.value })
    }

    return (

        <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            onChange={(event) => onChangeSearchTerms(event)}
        />
    )
}

export default ProductSearch;