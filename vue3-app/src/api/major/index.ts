import {
  majorInfoData,
  majorListFormData,
  majorResponseData,
  majorAllResponseData,
  majorListResponseData,
} from "./type";
import request from "../../utils/request";

enum API {
  MAJOR_ADD_URL = "/manage/major/add",
  MAJOR_UPDATE_URL = "manage/major/update",
  MAJOR_DELETE_URL = "/manage/major/delete",
  MAJOR_GET_ID_URL = "/manage/major/find",
  MAJOR_ALL_URL = "/manage/major/all",
  MAJOR_LIST_URL = "/manage/major/list",
}
export const reqmajorAll = () =>
  request.get<any, majorAllResponseData>(API.MAJOR_ALL_URL);

export const reqmajorList = (data: majorListFormData) =>
  request.post<any, majorListResponseData>(API.MAJOR_LIST_URL, data);

export const reqmajorAdd = (data: majorInfoData) =>
  request.post<any, majorResponseData>(API.MAJOR_ADD_URL, data);

export const reqmajorById = (_id: string) =>
  request.get<any, majorResponseData>(API.MAJOR_GET_ID_URL + `?_id=${_id}`);

export const reqmajorUpdate = (data: majorInfoData) =>
  request.post<any, majorResponseData>(API.MAJOR_UPDATE_URL, data);

export const reqmajorDelete = (majorId: string) =>
  request.post<any, majorResponseData>(API.MAJOR_DELETE_URL, { majorId });
