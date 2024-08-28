import mongoose, {Schema,Document} from "mongoose";

export interface User extends Document {
    name: string;
    description: string;
    createdAt: Date;
}


const UserSchema: Schema<User> = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema);

export default UserModel;
