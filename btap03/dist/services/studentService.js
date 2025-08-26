"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentById = exports.updateStudentById = exports.createStudent = exports.getStudentById = exports.getAllStudents = void 0;
const Student_1 = __importDefault(require("../models/Student"));
const getAllStudents = async () => {
    return Student_1.default.find();
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (id) => {
    return Student_1.default.findById(id);
};
exports.getStudentById = getStudentById;
const createStudent = async (data) => {
    return Student_1.default.create(data);
};
exports.createStudent = createStudent;
const updateStudentById = async (id, data) => {
    return Student_1.default.findByIdAndUpdate(id, data, { new: true });
};
exports.updateStudentById = updateStudentById;
const deleteStudentById = async (id) => {
    return Student_1.default.findByIdAndDelete(id);
};
exports.deleteStudentById = deleteStudentById;
