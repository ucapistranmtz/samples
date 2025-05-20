import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email:    { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IUser>('User', UserSchema);