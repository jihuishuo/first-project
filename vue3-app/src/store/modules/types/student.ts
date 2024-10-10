import { defineStore } from "pinia";
import {
  reqStudentAll,
  reqStudentList,
  reqStudentAdd,
  reqStudentUpdate,
  reqStudentDelete,
  reqStudentById,
} from "../../../api/student";
import type {
  studentInfoData,
  studentListFormData,
  studentResponseData,
  studentAllResponseData,
  studentListResponseData,
} from "../../../api/student/type";
import { StudentState } from "./type";
let useStudentStore = defineStore("student", {
  state: (): StudentState => {
    return {
      students: [],
    };
  },
  actions: {
    async getStudentAll() {
      let result: studentAllResponseData = await reqStudentAll();
      if (result.status === 0) {
        this.students = result.data as studentInfoData[];
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getStudentList(data: studentListFormData) {
      let result: studentListResponseData = await reqStudentList(data);
      if (result.status === 0) {
        this.students = result.data?.data as studentInfoData[];
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async addStudent(data: studentInfoData) {
      let result: studentResponseData = await reqStudentAdd(data);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async updateStudent(data: studentInfoData) {
      let result: studentResponseData = await reqStudentUpdate(data);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async deleteStudent(studentId: string) {
      let result: studentResponseData = await reqStudentDelete(studentId);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getStudentById(_id: string) {
      let result: studentResponseData = await reqStudentById(_id);
      if (result.status === 0) {
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
});
export default useStudentStore;
