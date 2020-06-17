"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    insertProduct(title, desc, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new this.productModel({
                title,
                description: desc,
                price,
            });
            const result = yield newProduct.save();
            return result;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.find().exec();
            return products.map(prod => ({
                id: prod.id,
                title: prod.title,
                description: prod.description,
                price: prod.price,
            }));
        });
    }
    getSingleProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.findProduct(productId);
            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
            };
        });
    }
    updateProduct(productId, title, desc, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield this.findProduct(productId);
            if (title) {
                updatedProduct.title = title;
            }
            if (desc) {
                updatedProduct.description = desc;
            }
            if (price) {
                updatedProduct.price = price;
            }
            updatedProduct.save();
            console.log("result is updatedProduct", updatedProduct);
            return updatedProduct;
        });
    }
    deleteProduct(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productModel.deleteOne({ _id: prodId }).exec();
            if (result.n === 0) {
                throw new common_1.NotFoundException('Could not find product.');
            }
        });
    }
    findProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let product;
            try {
                product = yield this.productModel.findById(id).exec();
            }
            catch (error) {
                throw new common_1.NotFoundException('Could not find product.');
            }
            if (!product) {
                throw new common_1.NotFoundException('Could not find product.');
            }
            return product;
        });
    }
};
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map