import request from "./../../utils/request";
import type {
  loginFormData,
  loginResponseData,
  // userInfoResponseData,
  pwdData,
  userInfoData,
  checkPwdResponseData,
  userAllResponseData,
  userListResponseData,
  userListFormData,
} from "./type";
// 配置
enum API {
  LOGIN_URL = "/login",
  // USERINFO_URL = "/user/info",
  LOGOUT_URL = "/logout",
  CHECK_PWD_URL = "/manage/user/pwd",
  UPDATE_PWD_URL = "/manage/user/pwd", // 后台写的
  USER_ALL_URL = "/manage/user/all",
  USER_LIST_URL = "/manage/user/list", // 后台写的
  USER_ADD_URL = "/manage/user/add",
  USER_GET_ID_URL = "/manage/user/find",
  USER_UPDATE_URL = "/manage/user/update",
  USER_DELETE_URL = "/manage/user/delete",
}
// 登录
export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data);
  //   request.post<any, loginResponseData>(API.LOGIN_URL, data);
};
// 获取
// export const reqUserInfo = () => {
//   return request.get<any, userInfoResponseData>(API.USERINFO_URL);
//   //   request.get<any, userInfoResponseData>(API.USERINFO_URL);
// };
// 退出用户
export const reqLogout = () => {
  return request.post<any, any>(API.LOGOUT_URL);
  //   request.post<any, any>(API.LOGOUT_URL);
};
// 原始密码校验
export const reqCheckPwd = (data: pwdData) => {
  return request.post<any, checkPwdResponseData>(API.CHECK_PWD_URL, data);
};
// 做一个密码更新
export const reqUpdatePwd = (data: pwdData) =>
  request.put<any, checkPwdResponseData>(API.UPDATE_PWD_URL, data);

// 用户管理
export const reqUserAll = () =>
  request.get<any, userAllResponseData>(API.USER_ALL_URL);

export const reqUserList = (data: userListFormData) =>
  request.post<any, userListResponseData>(API.USER_LIST_URL, data);

export const reqUserAdd = (data: userInfoData) =>
  request.post<any, loginResponseData>(API.USER_ADD_URL, data); // 后台写的

export const reqUserById = (_id: string) =>
  request.get<any, loginResponseData>(API.USER_GET_ID_URL + `?_id=${_id}`);

export const reqUserUpdate = (data: userInfoData) =>
  request.post<any, loginResponseData>(API.USER_UPDATE_URL, data);

export const reqUserDelete = (userId: string) =>
  request.post<any, loginResponseData>(API.USER_DELETE_URL, { userId });
