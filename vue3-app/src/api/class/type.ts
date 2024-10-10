export interface classInfoData {
  _id?: string | null;
  classname: string;
  teacher_id: string;
  manager_id: string;
  __v?: number;
  // stage?: string;
}
export interface classListFormData {
  // 获取班级列表（分页）
  page: number;
  size: number;
  // 搜索
  searchMap: searchMapData;
}
interface searchMapData {
  teacher_id?: string;
  manager_id: string;
}
export interface classResponseData {
  // 获取单个班级信息
  status: number;
  data?: classInfoData;
  msg?: string;
}
export interface classAllResponseData {
  // 获取所有班级信息
  status: number;
  data?: classInfoData[];
  msg?: string;
}
export interface classListResponseData {
  // 获取班级列表（分页）
  status: number;
  data?: classListData;
  msg?: string;
}
export interface classListData {
  data: classInfoData[];
  total: number;
}
