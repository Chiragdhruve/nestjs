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
let responseHandle = require("./../ResponseHandler");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    addUser(name, mobile, email, password, isActive, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOne(mobile, email);
            const generatedId = yield this.userService.insertUser(name, mobile, email, password, isActive, date);
            return generatedId;
        });
    }
    loginUser(mobile, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = yield this.userService.loginUser(mobile, email, password);
            return login;
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.userService.getUser();
            return products;
        });
    }
    getUser(prodId) {
        return this.userService.getSingleUser(prodId);
    }
    updateUser(userID, name, mobile, email, password, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalProduct = yield this.userService.updateUser(userID, name, mobile, email, password, isActive);
            return finalProduct;
        });
    }
    removeUser(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.deleteUser(prodId);
            return new common_1.HttpException('User deleted succesfully', common_1.HttpStatus.OK);
        });
    }
};
__decorate([
    common_1.Post('/register'),
    __param(0, common_1.Body('name')),
    __param(1, common_1.Body('mobile')),
    __param(2, common_1.Body('email')),
    __param(3, common_1.Body('password')),
    __param(4, common_1.Body('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body('mobile')),
    __param(1, common_1.Body('email')),
    __param(2, common_1.Body('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('name')),
    __param(2, common_1.Body('mobile')),
    __param(3, common_1.Body('email')),
    __param(4, common_1.Body('password')),
    __param(5, common_1.Body('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeUser", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map