import { Router } from 'express';
import {
  listStudents,
  showAddForm,
  addStudent,
  showEditForm,
  updateStudent,
  deleteStudent
} from '../controllers/studentController';

const router = Router();

router.get('/', listStudents);
router.get('/add', showAddForm);
router.post('/add', addStudent);
router.get('/edit/:id', showEditForm);
router.post('/edit/:id', updateStudent);
router.post('/delete/:id', deleteStudent);

export default router;
