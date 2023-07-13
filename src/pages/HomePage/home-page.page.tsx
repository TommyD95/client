import { Backdrop, CircularProgress } from "@mui/material";
import CatalogoComponent from "./Components/catalogo.components";
import useHomePageHook from "./home-page.hook";


const HomePage = () => {

    const { productsList, isLoading, productParams, pagination, setProductParams } = useHomePageHook();

    return (
        <>
            <Backdrop
                open={isLoading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CatalogoComponent pagination={pagination} productParams={productParams} setProductParams={setProductParams} products={productsList ?? []} loading={isLoading} />
        </>
    )
}

export default HomePage;