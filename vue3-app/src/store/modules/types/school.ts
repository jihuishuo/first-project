import { defineStore } from "pinia";
import {
  reqschoolAdd,
  reqschoolList,
  reqschoolUpdate,
  reqschoolDelete,
  reqschoolAll,
  reqschoolById,
} from "../../../api/school";
import type {
  schoolInfoData,
  schoolListFormData,
  schoolResponseData,
  schoolAllResponseData,
  schoolListResponseData,
} from "../../../api/school/type";
import { SchoolState } from "./type";
let useSchoolStore = defineStore("School", {
  state: (): SchoolState => {
    return {
      schools: [],
    };
  },
  actions: {
    async getSchoolAll() {
      let result: schoolAllResponseData = await reqschoolAll();
      if (result.status === 0) {
        this.schools = result.data as schoolInfoData[];
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getSchoolList(data: schoolListFormData) {
      let result: schoolListResponseData = await reqschoolList(data);
      if (result.status === 0) {
        this.schools = result.data?.data as schoolInfoData[];
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async addSchool(data: schoolInfoData) {
      let result: schoolResponseData = await reqschoolAdd(data);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getSchoolById(_id: string) {
      let result: schoolResponseData = await reqschoolById(_id);
      if (result.status === 0) {
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async updateSchool(data: schoolInfoData) {
      let result: schoolResponseData = await reqschoolUpdate(data);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async deleteSchool(schoolId: string) {
      let result: schoolResponseData = await reqschoolDelete(schoolId);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
  getters: {},
});
export default useSchoolStore;
