import { StandardCodeData } from "../types/standard-code";
import { userRoleList } from "../types/user-type";


export const globalStatusCodeList: StandardCodeData[] = [
  { codeValue: '01', codeValueDesc: 'Active' },
  { codeValue: '02', codeValueDesc: 'Inactive' }
];

export const UserRoleList: userRoleList[] = [
  { roleID: '01', roleName: 'Active' },
  { roleID: '02', roleName: 'Inactive' }
];
