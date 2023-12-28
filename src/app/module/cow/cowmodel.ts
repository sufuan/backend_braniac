import { Schema, model, Document, Types } from 'mongoose'

enum Location {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

enum Breed {
  Brahman = 'Brahman',
  Nellore = 'Nellore',
  Sahiwal = 'Sahiwal',
  Gir = 'Gir',
  Indigenous = 'Indigenous',
  Tharparkar = 'Tharparkar',
  Kankrej = 'Kankrej',
}

enum Label {
  ForSale = 'for sale',
  SoldOut = 'sold out',
}

enum Category {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

type ICow = Document & {
  name: string
  age: number
  price: number
  location: Location
  breed: Breed
  weight: number
  label: Label
  category: Category
  seller: Types.ObjectId // Reference to the User model
}

const cowSchema = new Schema<ICow>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, enum: Object.values(Location), required: true },
  breed: { type: String, enum: Object.values(Breed), required: true },
  weight: { type: Number, required: true },
  label: { type: String, enum: Object.values(Label), default: Label.ForSale },
  category: { type: String, enum: Object.values(Category), required: true },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
})

const CowModel = model<ICow>('Cow', cowSchema)

export default CowModel
