export interface majorInfoData {
  //专业信息数据
  _id: string | null;
  majorname: string;
  __v?: number;
}
export interface majorListFormData {
  //列表表单数据
  //描述请求专业列表时传递的分页信息的数据结构。
  page: number;
  size: number;
}
export interface majorResponseData {
  // 描述单个专业信息响应的数据结构
  status: number;
  data?: majorInfoData;
  msg?: string;
}
export interface majorAllResponseData {
  // 描述获取所有专业信息响应的数据结构。
  status: number;
  data?: majorInfoData[];
  msg?: string;
}
export interface majorListResponseData {
  // 这个接口可能是用来描述分页获取专业列表响应的数据结构。
  status: number;
  data?: majorListData;
  msg?: string;
}
export interface majorListData {
  // 描述分页的专业列表数据结构。
  data: majorInfoData[];
  total: number;
}
