import { Model, Schema, model } from "mongoose";
import { IUser } from "./user.interface";




const userSchema = new Schema<IUser>({
    id: {
        unique: true,
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    }
},
    {
        timestamps: true
    });


type UserModel = Model<IUser, object>;

export const User = model<IUser, UserModel>('User', userSchema);