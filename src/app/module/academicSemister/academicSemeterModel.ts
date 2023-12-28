import { Schema, model } from 'mongoose'
import {
  AcademicSemeterModel,
  IAcademicSemester,
} from './academicSemister.interface'

const Month: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Spring', 'Summer'],
    },
    year: {
      type: Number,
      required: [true, 'Please provide a role'],
    },

    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: Month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Month,
    },
  },
  {
    timestamps: true,
  },
)

// type UserModel = Model<IUser, object>

AcademicSemesterSchema.pre<IAcademicSemester>('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    next(new Error('Semester already exist'))
    Error.statusCode = 409
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemeterModel>(
  'AcademicSemester',
  AcademicSemesterSchema,
)
