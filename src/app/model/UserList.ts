import mongoose, {Schema,Document, ObjectId} from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    hobbies: []; 
    phone : number;
    address: ObjectId
    gender: string;
    createdAt: Date;
}


const UserSchema: Schema<User> = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    hobbies: [{type: String}],  
    phone: {type: Number, required: true},
    gender: {type: String, required: true},
    address: {type: Schema.ObjectId, required: true, ref: "Address"},
    createdAt: {type: Date, default: Date.now},
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export default UserModel;
