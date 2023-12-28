import { AcademicSemester } from './academicSemeterModel'
import { IAcademicSemester } from './academicSemister.interface'

const createAcademicSemester = async (data: IAcademicSemester) => {
  const result = await AcademicSemester.create(data)
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemester,
}
