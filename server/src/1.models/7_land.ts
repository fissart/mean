import { Schema, model, Document } from 'mongoose'


const schema = new Schema({
    title: String,
    description: String,
    file: String,
    user: String,  
},{
    timestamps: true
});

export interface ILand extends Document {
    title: string,
    description: string,
    file: string,
    user: string,    
}
    
export default model<ILand>('Land', schema);