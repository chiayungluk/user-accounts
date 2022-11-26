import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ strictQuery: true })
export default class User {
  id?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email?: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['male', 'female', 'neutral'] })
  gender?: string;

  @Prop({ min: 0 })
  age?: number;

  @Prop()
  created: Date;

  @Prop()
  lastModified: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
