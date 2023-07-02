import { BasketItemViewModel } from "./BasketItemViewModel"

export interface BasketViewModel {
    id: number
    buyerId: string
    items: BasketItemViewModel[]
}

