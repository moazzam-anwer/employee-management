import mongoose, {Schema,Document, ObjectId} from "mongoose";

export interface Address extends Document {
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
    createdAt: Date;
}


const AddressSchema: Schema<Address> = new Schema({
    area: {type: String, required: true},
    city: {type: String, required: true},  // this is for complex data types like address object in this case.
    state: {type: String, required: true},
    country: {type: String, required: true},
    pincode: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
});

const AddressModel = (mongoose.models.Address as mongoose.Model<Address>) || mongoose.model<Address>("Address",AddressSchema);

export default AddressModel;
