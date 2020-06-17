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
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    insertUser(name, mobile, email, password, isActive, date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mobile.length === 10) {
                const newUser = new this.userModel({
                    name,
                    mobile,
                    email,
                    password: bcrypt.hashSync(password, 4),
                    isActive: 0,
                    date: new Date()
                });
                const result = yield newUser.save();
                return result;
            }
            else {
                throw new common_1.NotFoundException('mobile no not valid');
            }
        });
    }
    findOne(mobile, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            user = yield this.userModel.findOne({ "mobile": mobile }, { "email": email }).exec();
            if (user) {
                throw new common_1.NotFoundException('user already exists with same mobile no or email');
            }
            else {
                return user;
            }
        });
    }
    loginUser(mobile, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mobile) {
                const user = yield this.userModel.findOne({ mobile: mobile }).exec();
                console.log("final user for mobile", user);
                if (!user) {
                    throw new common_1.NotFoundException('Invalid mobile no.');
                }
                console.log("Paassword", password);
                console.log("Paassworf2", user.password);
                if (!bcrypt.compareSync(password, user.password)) {
                    throw new common_1.NotFoundException('password is incorrect');
                }
                return user;
            }
            if (email) {
                const user = yield this.userModel.findOne({ email: email }).exec();
                console.log("final user for email", user);
                if (!user) {
                    throw new common_1.NotFoundException('Invalid email');
                }
                console.log("Paassworf", password);
                console.log("Paassworf2", user.password);
                if (!bcrypt.compareSync(password, user.password)) {
                    throw new common_1.NotFoundException('user password is incorrect');
                }
                return user;
            }
        });
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.find().exec();
            return user.map(user => ({
                id: user.id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
            }));
        });
    }
    getSingleUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUser(userID);
            return {
                id: user.id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
            };
        });
    }
    updateUser(userID, name, mobile, email, password, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.findUser(userID);
            if (name) {
                updatedUser.name = name;
            }
            if (mobile) {
                updatedUser.mobile = mobile;
            }
            if (email) {
                updatedUser.email = email;
            }
            if (password) {
                updatedUser.password = password;
            }
            if (isActive) {
                updatedUser.isActive = isActive;
            }
            updatedUser.save();
            console.log("result is updatedUser", updatedUser);
            return updatedUser;
        });
    }
    deleteUser(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userModel.deleteOne({ _id: prodId }).exec();
            if (result.n === 0) {
                throw new common_1.NotFoundException('Could not find user.');
            }
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let product;
            try {
                product = yield this.userModel.findById(id).exec();
            }
            catch (error) {
                throw new common_1.NotFoundException('Could not find user.');
            }
            if (!product) {
                throw new common_1.NotFoundException('Could not find user.');
            }
            return product;
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map