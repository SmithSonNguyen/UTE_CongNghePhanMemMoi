import { Request, Response } from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById
} from '../services/studentService';

export const listStudents = async (req: Request, res: Response) => {
  const students = await getAllStudents();
  res.render('index', { students });
};

export const showAddForm = (req: Request, res: Response) => {
  res.render('add');
};

export const addStudent = async (req: Request, res: Response) => {
  const { name, age, email } = req.body;
  await createStudent({ name, age, email });
  res.redirect('/');
};

export const showEditForm = async (req: Request, res: Response) => {
  const student = await getStudentById(req.params.id);
  res.render('edit', { student });
};

export const updateStudent = async (req: Request, res: Response) => {
  const { name, age, email } = req.body;
  await updateStudentById(req.params.id, { name, age, email });
  res.redirect('/');
};

export const deleteStudent = async (req: Request, res: Response) => {
  await deleteStudentById(req.params.id);
  res.redirect('/');
};
