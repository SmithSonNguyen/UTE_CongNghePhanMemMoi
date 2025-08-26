import Student, { IStudent } from '../models/Student';

export const getAllStudents = async (): Promise<IStudent[]> => {
  return Student.find();
};

export const getStudentById = async (id: string): Promise<IStudent | null> => {
  return Student.findById(id);
};

export const createStudent = async (data: { name: string; age: number; email: string }): Promise<IStudent> => {
  return Student.create(data);
};

export const updateStudentById = async (id: string, data: { name: string; age: number; email: string }): Promise<IStudent | null> => {
  return Student.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStudentById = async (id: string): Promise<IStudent | null> => {
  return Student.findByIdAndDelete(id);
};
