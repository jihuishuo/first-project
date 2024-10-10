import {
  majorInfoData,
  majorListFormData,
  majorResponseData,
  majorAllResponseData,
  majorListResponseData,
} from "./../../../api/major/type";
import { defineStore } from "pinia";
import {
  reqmajorAll,
  reqmajorList,
  reqmajorAdd,
  reqmajorById,
  reqmajorUpdate,
  reqmajorDelete,
} from "../../../api/major";
import { MajorState } from "./type";
let useMajorStore = defineStore("Major", {
  state: (): MajorState => {
    return {
      majors: [],
    };
  },
  actions: {
    async getMajorAll() {
      let result: majorAllResponseData = await reqmajorAll();
      if (result.status === 0) {
        this.majors = result.data as majorInfoData[];
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getMajorList(data: majorListFormData) {
      let result: majorListResponseData = await reqmajorList(data);
      if (result.status === 0) {
        this.majors = result.data?.data as majorInfoData[];
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async addMajor(data: majorInfoData) {
      let result: majorResponseData = await reqmajorAdd(data);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getMajorById(_id: string) {
      let result: majorResponseData = await reqmajorById(_id);
      if (result.status === 0) {
        return result.data;
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async updateMajor(data: majorInfoData) {
      let result: majorResponseData = await reqmajorUpdate(data);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async deleteMajor(majorId: string) {
      let result: majorResponseData = await reqmajorDelete(majorId);
      if (result.status === 0) {
        return "OK";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
  },
  getters: {},
});
export default useMajorStore;
