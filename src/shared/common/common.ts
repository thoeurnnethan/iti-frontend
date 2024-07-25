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
  { codeValue: 'M', codeValueDesc: 'Male' },
  { codeValue: 'F', codeValueDesc: 'Female' }
];

export const YearList: StandardCodeData[] = [
  { codeValue: '', codeValueDesc: 'All' },
  { codeValue: '1', codeValueDesc: 'Year 1' },
  { codeValue: '2', codeValueDesc: 'Year 2' },
  { codeValue: '3', codeValueDesc: 'Year 3' },
  { codeValue: '4', codeValueDesc: 'Year 4' },
  { codeValue: '5', codeValueDesc: 'Year 5' },
];

export const SemesterList: StandardCodeData[] = [
  { codeValue: 'All', codeValueDesc: 'All' },
  { codeValue: 1, codeValueDesc: 'Semester 1' },
  { codeValue: 2, codeValueDesc: 'Semester 2' },
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
