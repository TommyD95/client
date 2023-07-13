import { Avatar, Box, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import ProductViewModel from "../../../models/ProductViewModel.model";
import ProductsList from "./product-list.component";

import useCatalogoHook from "./catalogo.hook";
import { ProductParams } from "../../../models/ProductParams.model";
import { useEffect } from "react";
import ProductSearch from "./product-search.component";
import RadioButtonGroup from "./radio-button-group.component.tsx";
import CheckboxButton from "./checkbox-button.component";
import AppPagination from "./app-pagination.component";
import MetaData from "../../../models/pagination.model";

type IProps = {
    products: ProductViewModel[];
    loading: boolean;
    productParams: ProductParams;
    pagination: MetaData;

    setProductParams: (params: ProductParams) => void;
}

const CatalogoComponent = (props: IProps) => {

    const { products, loading, productParams, pagination, setProductParams } = props;

    const { filters, sortOptions } = useCatalogoHook();

    useEffect(() => {
        console.log(productParams)
    }, [productParams])

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <ProductSearch productParams={productParams} setProductParams={setProductParams} />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup
                            options={sortOptions}
                            onChange={(event) => setProductParams({ ...productParams, orderBy: event.target.value })}
                            selectedValue={productParams.orderBy}
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButton
                            checked={productParams.brands ?? []}
                            items={filters.brands}
                            onChange={(items: string[]) => setProductParams({ ...productParams, brands: items })}
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButton
                            checked={productParams.types ?? []}
                            items={filters.types}
                            onChange={(items: string[]) => setProductParams({ ...productParams, types: items })}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Grid container>
                        <Grid item>
                            <ProductsList products={products} loading={loading} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 5 }} >
                    <Grid item xs={4} />
                    <Grid item alignItems={"center"} xs={4}>
                        <AppPagination onPageChange={(page) => setProductParams({ ...productParams, pageNumber: page })} pagination={pagination} />

                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CatalogoComponent;