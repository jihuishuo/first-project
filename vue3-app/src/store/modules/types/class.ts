import { defineStore } from "pinia";
import type {
  classInfoData,
  classListFormData,
  classResponseData,
  classAllResponseData,
  classListResponseData,
} from "../../../api/class/type";
import {
  reqClassAll,
  reqClassList,
  reqClassAdd,
  reqClassUpdate,
  reqClassDelete,
  reqClassById,
} from "../../../api/class";
import { ClassState } from "./type";
let useClassStore = defineStore("Class", {
  state: (): ClassState => {
    return {
      classes: [],
    };
  },
  actions: {
    async getClassesAll() {
      let result: classAllResponseData = await reqClassAll();
      if (result.status === 0) {
        this.classes = result.data as classInfoData[];
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getClassList(data: classListFormData) {
      let result: classListResponseData = await reqClassList(data);
      if (result.status === 0) {
        this.classes = result.data?.data as classInfoData[];
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async addClass(data: classInfoData) {
      let result: classResponseData = await reqClassAdd(data);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async updateClass(data: classInfoData) {
      let result: classResponseData = await reqClassUpdate(data);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async deleteClass(classId: string) {
      let result: classResponseData = await reqClassDelete(classId);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getClassById(_id: string) {
      let result: classResponseData = await reqClassById(_id);
      if (result.status === 0) {
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
});
export default useClassStore;
