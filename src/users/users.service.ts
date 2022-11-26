import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import CreateUserDto from '../api/dto/create-user.dto';
import UpdateUserDto from '../api/dto/update-user.dto';
import User from './entities/user.entity';
import DuplicateException from './exceptions/duplicate.exception';

@Injectable()
export default class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  //   async findAll() {
  //     this.userModel.find().cursor;
  //   }

  async findOne(id: string): Promise<User | null> {
    const foundUser = await this.userModel.findById(new Types.ObjectId(id)).exec();
    if (!foundUser) {
      return null;
    }
    return this.assembleUser(foundUser);
  }

  async findByUsername(username: string): Promise<User | null> {
    const foundUser = await this.userModel.findOne({ username }).lean().exec();
    if (!foundUser) {
      return null;
    }
    return this.assembleUser(foundUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this.userModel.findOne({ email }).lean().exec();
    if (!foundUser) {
      return null;
    }
    return this.assembleUser(foundUser);
  }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const date = new Date();
      // eslint-disable-next-line new-cap
      const createdUser = await new this.userModel<User>({
        ...createUserDto,
        created: date,
        lastModified: date,
      }).save();
      return this.assembleUser(createdUser);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if ('keyValue' in err && 'code' in err && err.code === 11000) {
        throw new DuplicateException(Object.keys(err.keyValue));
      }
      throw err;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto & {
      password?: string;
    },
  ): Promise<User | null> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: updateUserDto,
        $currentDate: { lastModified: true },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      return null;
    }
    return this.assembleUser(updatedUser);
  }

  async remove(id: string): Promise<User | null> {
    const deletedUser = await this.userModel.findOneAndRemove({ _id: id });
    if (!deletedUser) {
      return null;
    }
    return this.assembleUser(deletedUser);
  }

  private assembleUser(
    user: User & {
      _id: Types.ObjectId;
    },
  ): User {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      email: user.email,
      username: user.username,
      password: user.password,
      gender: user.gender,
      age: user.age,
      created: user.created,
      lastModified: user.lastModified,
    };
  }
}
