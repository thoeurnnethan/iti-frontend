import { StandardCodeData } from "../types/standard-code";


export const globalStatusCodeList: StandardCodeData[] = [
  { codeValue: '01', codeValueDesc: 'Active' },
  { codeValue: '09', codeValueDesc: 'Inactive' }
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

export const year: StandardCodeData[] = [
  { codeValue: '1', codeValueDesc: '1' },
  { codeValue: '2', codeValueDesc: '2' },
  { codeValue: '3', codeValueDesc: '3' },
  { codeValue: '4', codeValueDesc: '4' },
  { codeValue: '5', codeValueDesc: '5' },
];

export const semester: StandardCodeData[] = [
  { codeValue: '1', codeValueDesc: '1' },
  { codeValue: '2', codeValueDesc: '2' },
];
