import { HttpException } from '@nestjs/common';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addUser(name: string, mobile: number, email: string, password: string, isActive: number, date: string): Promise<import("./user.model").User>;
    loginUser(mobile: number, email: string, password: string): Promise<import("./user.model").User>;
    getAllUser(): Promise<{
        id: string;
        name: string;
        mobile: Number;
        email: string;
        password: string;
        isActive: Number;
    }[]>;
    getUser(prodId: string): Promise<{
        id: string;
        name: string;
        mobile: Number;
        email: string;
        password: string;
        isActive: Number;
    }>;
    updateUser(userID: string, name: string, mobile: number, email: string, password: string, isActive: number): Promise<import("./user.model").User>;
    removeUser(prodId: string): Promise<HttpException>;
}
