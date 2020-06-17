/**
 * Created by Chirag Dhruve
 */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
let responseHandle = require("./../ResponseHandler");

import { UserService } from './user.service';
import { strict } from 'assert';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async addUser(
    @Body('name') name: string,
    @Body('mobile') mobile: number,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('isActive') isActive: number,
    date: string,

  ) {
    const user = await this.userService.findOne(mobile,email);
    const generatedId = await this.userService.insertUser(
      name,
      mobile,
      email,
      password,
      isActive,
      date,
    );
    return generatedId;
    // return  new HttpException(generatedId,'User already registered', HttpStatus.OK);    
   // return { id: generatedId, title:prodTitle , description:prodDesc , price:prodPrice};
  }

  @Post('/login')
  async loginUser(
    @Body('mobile') mobile: number,
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const login = await this.userService.loginUser(
      mobile,
      email,
      password,
    );
    return login;
    // return  new HttpException(generatedId,'User already registered', HttpStatus.OK);    
   // return { id: generatedId, title:prodTitle , description:prodDesc , price:prodPrice};
  }

  @Get()
  async getAllUser() {
    const products = await this.userService.getUser();
    return products;
  }

  @Get(':id')
  getUser(@Param('id') prodId: string) {
    return this.userService.getSingleUser(prodId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userID: string,
    @Body('name') name: string,
    @Body('mobile') mobile: number,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('isActive') isActive: number,
  ) {
    const finalProduct = await this.userService.updateUser(userID,name,mobile,email,password,isActive);
    return finalProduct;
  }

  @Delete(':id')
  async removeUser(@Param('id') prodId: string) {
      await this.userService.deleteUser(prodId);
      // return null;
      return  new HttpException('User deleted succesfully', HttpStatus.OK);    
  }
}
