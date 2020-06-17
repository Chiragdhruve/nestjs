/**
 * Created by Chirag Dhruve
 */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name : { type: String, required: true },
  mobile : { type: Number, required: true },
  email : { type: String, required: true ,format: 'email'},
  password: { type: String, required: true },
  isActive: { type: Number, required: true },
  date:{type:String}
},
{
versionKey : false,
strict: false}
);

export interface User extends mongoose.Document {
  id: string;
  name: string;
  mobile : Number;
  email: string;
  password: string;
  isActive : Number;
  date:string;
}
