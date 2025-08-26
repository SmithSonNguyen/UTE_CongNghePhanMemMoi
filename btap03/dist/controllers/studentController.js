"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.showEditForm = exports.addStudent = exports.showAddForm = exports.listStudents = void 0;
const studentService_1 = require("../services/studentService");
const listStudents = async (req, res) => {
    const students = await (0, studentService_1.getAllStudents)();
    res.render('index', { students });
};
exports.listStudents = listStudents;
const showAddForm = (req, res) => {
    res.render('add');
};
exports.showAddForm = showAddForm;
const addStudent = async (req, res) => {
    const { name, age, email } = req.body;
    await (0, studentService_1.createStudent)({ name, age, email });
    res.redirect('/');
};
exports.addStudent = addStudent;
const showEditForm = async (req, res) => {
    const student = await (0, studentService_1.getStudentById)(req.params.id);
    res.render('edit', { student });
};
exports.showEditForm = showEditForm;
const updateStudent = async (req, res) => {
    const { name, age, email } = req.body;
    await (0, studentService_1.updateStudentById)(req.params.id, { name, age, email });
    res.redirect('/');
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    await (0, studentService_1.deleteStudentById)(req.params.id);
    res.redirect('/');
};
exports.deleteStudent = deleteStudent;
