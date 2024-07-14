import { StandardCodeData } from "../types/standard-code";


export const globalStatusCodeList: StandardCodeData[] = [
  { codeValue: '01', codeValueDesc: 'Active' },
  { codeValue: '02', codeValueDesc: 'Inactive' }
];

export const UserRoleList: StandardCodeData[] = [
  { codeValue: '', codeValueDesc: 'All' },
  { codeValue: '01', codeValueDesc: 'Admin' },
  { codeValue: '02', codeValueDesc: 'Department Manager' },
  { codeValue: '03', codeValueDesc: 'Teacher' },
  { codeValue: '04', codeValueDesc: 'Student' }
];

export const GenderCodeList: StandardCodeData[] = [
  { codeValue: '01', codeValueDesc: 'Male' },
  { codeValue: '02', codeValueDesc: 'Female' }
];
