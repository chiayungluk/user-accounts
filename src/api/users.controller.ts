import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import PassCryptPipe from '../auth/pipes/pass-crypt.pipe';
import AuthService from '../auth/service/auth.service';
import JwtAuthGuard from '../auth/strategies/jwt-auth.guard';
import DuplicateException from '../users/exceptions/duplicate.exception';
import UsersService from '../users/users.service';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import UsersInterceptor from './interceptors/users.interceptor';

@UseInterceptors(UsersInterceptor)
@Controller('users')
export default class ApiController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(id);
    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  @Get()
  async findByUsername(@Query('username') username: string) {
    const foundUser = await this.usersService.findByUsername(username);
    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  @Get()
  async findByEmail(@Query('email') email: string) {
    const foundUser = await this.usersService.findByEmail(email);
    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  @Post()
  async create(@Body(PassCryptPipe) createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      return createdUser;
    } catch (err) {
      if (err instanceof DuplicateException) {
        throw new ConflictException(`${err.key} has been used`);
      } else {
        throw err;
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException();
    }
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) {
      throw new NotFoundException();
    }
    return {};
  }
}
