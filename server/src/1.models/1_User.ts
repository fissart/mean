import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    foto: String,
    rol: String,
    password: String,
    name: String,
    email: String,
},{
    timestamps: true
});

export interface IUser extends Document {
    foto: string;
    rol: string;
    password: string;
    name: string;
    email: string;
}

export default model<IUser>('User', schema); 