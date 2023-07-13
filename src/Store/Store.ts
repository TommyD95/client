import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { BasketList, productsList } from "../Api/api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";




export const store = configureStore({
    reducer: {
        [productsList.reducerPath]: productsList.reducer,
        [BasketList.reducerPath]: BasketList.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsList.middleware).concat(BasketList.middleware),

});
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export { useFetchListaProductsQuery, useFetchProductByIDQuery, useFetchBasketQuery, useAddItemMutation, useRemoveItemMutation, useFetchFiltersQuery } from "../Api/api";
