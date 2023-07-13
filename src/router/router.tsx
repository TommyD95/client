import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/home-page.page";
import App from "../App";
import ContactPage from "../pages/Contact/contact.page";
import ProductDetails from "../pages/ProductDetails/ProductDetails.page";
import NotFound from "../pages/NotFound/not-found.page";
import BasketPage from "../pages/Basket/Basket.page";
import CheckoutPage from "../pages/Checkout/checkout.page";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '/contact',
                element: <ContactPage />,
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetails />
            },
            {
                path: '/checkout',
                element: <CheckoutPage />
            },
            {
                path: "/notFound",
                element: <NotFound />
            },
            {
                path: "/basket",
                element: <BasketPage />
            },
            {
                path: '*',
                element: <Navigate replace to={'/notFound'} />
            }
        ]
    },

])