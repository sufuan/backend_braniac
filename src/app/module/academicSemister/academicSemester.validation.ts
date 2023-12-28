import { z } from 'zod'

// Define the AcademicSemester Zod schema
const AcademicSemesterZodSchema = z.object({
  title: z
    .enum(['Autumn', 'Spring', 'Summer'])
    .refine(value => ['Autumn', 'Spring', 'Summer'].includes(value), {
      message: 'Invalid title. Must be one of: Autumn, Spring, Summer',
    }),
  year: z.number().int().positive(),
  code: z
    .enum(['01', '02', '03'])
    .refine(value => ['01', '02', '03'].includes(value), {
      message: 'Invalid code. Must be one of: 01, 02, 03',
    }),
  startMonth: z.enum([
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
  ]),
  endMonth: z.enum([
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
  ]),
})

export const AcademicSemesterValidation = {
  AcademicSemesterZodSchema,
}
