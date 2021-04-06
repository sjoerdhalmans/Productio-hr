import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices'
import { User } from './entities/user.entity';
import { UpdatePassword } from './DTO\'s/password.dto';
import { throws } from 'node:assert';
import { assignRoles, UpdateUser } from './DTO\'s/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private logger = new Logger('AppController');

  @MessagePattern('add_user')
  async add(@Body() user: User) {
    return this.appService.add(user);
  }

  @MessagePattern('update_password')
  async updatePassword(@Body() passwordDto: UpdatePassword) {
    this.appService.updatePassword(passwordDto);
  }

  @MessagePattern('update_user')
  async updateUser(@Body() userDto: UpdateUser) {
    this.appService.updateUser(userDto);
  }

  @MessagePattern('assign_roles')
  async assignRoles(@Body() roleDto: assignRoles) {
    this.appService.assignRoles(roleDto);
  }

  @MessagePattern('remove_roles')
  async removeRoles(@Body() roleDto: assignRoles) {
    this.appService.removeRoles(roleDto);
  }

  @MessagePattern('ping_me')
  async PING() {
    this.logger.log('pong')
    return 2
  }
}
