import { Schema,model } from "mongoose";


export interface IUser {
    id: string;
    role: string;
    password: string;
  }
  