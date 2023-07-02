import { Backdrop, CircularProgress } from "@mui/material";
import CatalogoComponent from "./Components/catalogo.components";
import useHomePageHook from "./home-page.hook";


const HomePage = () => {

    const { products, loading } = useHomePageHook();

    return (
        <>
            <Backdrop
                open={loading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CatalogoComponent products={products} />
        </>
    )
}

export default HomePage;