import request from "../../utils/request";
import type {
  schoolInfoData,
  schoolListFormData,
  schoolResponseData,
  schoolAllResponseData,
  schoolListResponseData,
} from "./type";
enum API {
  SCHOOL_ALL_URL = "/manage/school/all",
  SCHOOL_LIST_URL = "/manage/school/list",
  SCHOOL_ADD_URL = "/manage/school/add",
  SCHOOL_UPDATE_URL = "/manage/school/update",
  SCHOOL_DELETE_URL = "/manage/school/delete",
  SCHOOL_GET_ID_URL = "/manage/school/find",
}
export const reqschoolAll = () => {
  return request.get<any, schoolAllResponseData>(API.SCHOOL_ALL_URL);
};
export const reqschoolList = (data: schoolListFormData) => {
  return request.post<any, schoolListResponseData>(API.SCHOOL_LIST_URL, data);
};

export const reqschoolAdd = (data: schoolInfoData) => {
  return request.post<any, schoolResponseData>(API.SCHOOL_ADD_URL, data);
};

export const reqschoolUpdate = (data: schoolInfoData) => {
  return request.post<any, schoolResponseData>(API.SCHOOL_UPDATE_URL, data);
};

export const reqschoolDelete = (schoolId: string) => {
  return request.post<any, schoolResponseData>(API.SCHOOL_DELETE_URL, {
    schoolId,
  });
};

export const reqschoolById = (_id: string) => {
  return request.get<any, schoolResponseData>(
    API.SCHOOL_GET_ID_URL + `?_id=${_id}`
  );
};
