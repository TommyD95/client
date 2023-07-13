import { BasketItemViewModel } from "./BasketItemViewModel.model"

export interface BasketViewModel {
    id: number
    buyerId: string
    items: BasketItemViewModel[]
}

