/**
 * Created by Chirag Dhruve
 */

import { Injectable, NotFoundException , HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt = require("bcryptjs");
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async insertUser(name: string, mobile : number, email: string, password: string, isActive : number , date: string) {
    if(mobile.length === 10){
      const newUser = new this.userModel({
        name,
        mobile,
        email,
        password : bcrypt.hashSync(password,4),
        isActive:0,
        date:new Date()
      });
      const result = await newUser.save();
      return result;
    }
    else {
      throw new NotFoundException('mobile no not valid');
    }
    
  }

  async findOne(mobile : number,email: string): Promise<User> {
    let user;    
      user = await this.userModel.findOne({"mobile":mobile},{"email":email}).exec();
      if(user){
         throw new NotFoundException('user already exists with same mobile no or email');
        }
      else {
        return user;
      }  
  }

async loginUser(mobile,email,password) {
  if (mobile){
    const user = await this.userModel.findOne({mobile:mobile}).exec();
    console.log("final user for mobile",user);

    if (!user) {
      throw new NotFoundException('Invalid mobile no.');
    }
    console.log("Paassword",password);
    console.log("Paassworf2",user.password);
    if (!bcrypt.compareSync(password,user.password)) {
      throw new NotFoundException('password is incorrect');
    }
    return user;
  } 
  if (email){
    const user = await this.userModel.findOne({email:email}).exec();
    console.log("final user for email",user);
    if (!user) {
      throw new NotFoundException('Invalid email');
    }
    console.log("Paassworf",password);
    console.log("Paassworf2",user.password);
    if (!bcrypt.compareSync(password,user.password)) {
      throw new NotFoundException('user password is incorrect');
    }
    return user;
  }
 
}

  async getUser() {
    const user = await this.userModel.find().exec();
    return user.map(user => ({
      id: user.id,
      name : user.name,
      mobile: user.mobile,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
    }));
  }

  async getSingleUser(userID: string) {
    const user = await this.findUser(userID);
    return {
      id: user.id,
      name : user.name,
      mobile: user.mobile,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
    };
  }

  async updateUser(
    userID: string,
    name: string,
    mobile : Number,
    email: string,
    password: string,
    isActive : Number,
  ) {
    const updatedUser = await this.findUser(userID);
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
    console.log("result is updatedUser",updatedUser);
    return updatedUser;
  }

  async deleteUser(prodId: string) {
    const result = await this.userModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let product;
    try {
      product = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!product) {
      throw new NotFoundException('Could not find user.');
    }
    return product;
  }
}
