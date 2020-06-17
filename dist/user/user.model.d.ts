import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any>;
export interface User extends mongoose.Document {
    id: string;
    name: string;
    mobile: Number;
    email: string;
    password: string;
    isActive: Number;
    date: string;
}
