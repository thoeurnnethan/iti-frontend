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

export const generation: StandardCodeData[] = [
  { codeValue: 'G_1', codeValueDesc: 'G_1' },
  { codeValue: 'G_2', codeValueDesc: 'G_2' },
  { codeValue: 'G_3', codeValueDesc: 'G_3' },
  { codeValue: 'G_4', codeValueDesc: 'G_4' },
];

export const time: StandardCodeData[] = [
  { codeValue: 'Monday-14:00-17:00', codeValueDesc: 'Monday-14:00-17:00' },
  { codeValue: 'Tuesday-14:00-17:00', codeValueDesc: 'Tuesday- 14:00-17:00' },
  { codeValue: 'Wednesday-09:00-12:00', codeValueDesc: 'Wednesday-09:00-12:00' },
  { codeValue: 'Thursday-09:00-12:00', codeValueDesc: 'Thursday-09:00-12:00' },
  { codeValue: 'Friday-09:00-12:00', codeValueDesc: 'Friday-09:00-12:00' },
  { codeValue: 'Weekend', codeValueDesc: 'Weekend' },
];
