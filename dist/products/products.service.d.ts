import { Model } from 'mongoose';
import { Product } from './product.model';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    insertProduct(title: string, desc: string, price: number): Promise<Product>;
    getProducts(): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }[]>;
    getSingleProduct(productId: string): Promise<{
        id: string;
        title: string;
        description: string;
        price: number;
    }>;
    updateProduct(productId: string, title: string, desc: string, price: number): Promise<Product>;
    deleteProduct(prodId: string): Promise<void>;
    private findProduct;
}
