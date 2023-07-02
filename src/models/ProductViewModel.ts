export default class ProductViewModel {
    public readonly id: number = 0;
    public readonly name: string = "";
    public readonly description: string = "";
    public readonly price: number = 0;
    public readonly pictureUrl: string = "";
    public readonly type: string = "";
    public readonly brand: string = "";
    public readonly quantityInStock: number = 0;

    public constructor(data: Partial<ProductViewModel>) {
        Object.assign(this, data);
    }
}
