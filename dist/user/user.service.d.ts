import { Model } from 'mongoose';
import { User } from './user.model';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    insertUser(name: string, mobile: number, email: string, password: string, isActive: number, date: string): Promise<User>;
    findOne(mobile: number, email: string): Promise<User>;
    loginUser(mobile: any, email: any, password: any): Promise<User>;
    getUser(): Promise<{
        id: string;
        name: string;
        mobile: Number;
        email: string;
        password: string;
        isActive: Number;
    }[]>;
    getSingleUser(userID: string): Promise<{
        id: string;
        name: string;
        mobile: Number;
        email: string;
        password: string;
        isActive: Number;
    }>;
    updateUser(userID: string, name: string, mobile: Number, email: string, password: string, isActive: Number): Promise<User>;
    deleteUser(prodId: string): Promise<void>;
    private findUser;
}
