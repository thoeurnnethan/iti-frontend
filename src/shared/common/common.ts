import { StandardCodeData } from "../types/standard-code";


export const globalStatusCodeList: StandardCodeData[] = [
  { codeValue: '01', codeValueDesc: 'Active' },
  { codeValue: '02', codeValueDesc: 'Inactive' }
];

export const UserRoleList: StandardCodeData[] = [
  { codeValue: '', codeValueDesc: 'All Role' },
  { codeValue: '01', codeValueDesc: 'Admin' },
  { codeValue: '02', codeValueDesc: 'Teacher' },
  { codeValue: '03', codeValueDesc: 'Student' }
];
