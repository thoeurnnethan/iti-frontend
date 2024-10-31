<template src="./schedule-register.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { YearList, SemesterList, globalStatusCodeList, WeekdayList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';
import { SCHEDULE_LIST, SCHEDULE_LIST_REQ, SCHEDULE_LIST_RES, TEACHER_LIST, TEACHER_LIST_RES, ScheduleColumn, ScheduleRow } from '@/shared/types/schedule-list';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { StandardCodeData } from '@/shared/types/standard-code';
import { SUBJECT_LIST, SUBJECT_LIST_REQ, SUBJECT_LIST_RES } from '@/shared/types/subject-list';
import { ROOM_LIST, ROOM_LIST_REQ, ROOM_LIST_RES } from '@/shared/types/room-list';

const requestService = new RequestService();

export default defineComponent({
    name: "schedule-register",
    inheritAttrs: false,
    components: {
        MyLoading
    },
    data() {
        return {
            yearList: YearList,
            semesterList: SemesterList,
            statusCodeList: globalStatusCodeList,
            weekdayList: WeekdayList,
            departmentList: [] as DEPARTMENT_LIST[],
            classList: [] as CLASS_LIST[],
            classInfo: {} as CLASS_LIST,
            scheduleList: [] as SCHEDULE_LIST[],
            originalScheduleList: [] as SCHEDULE_LIST[],
            rowData: {} as SCHEDULE_LIST,
            columns: [] as ScheduleColumn[],
            rows: [] as ScheduleRow[],
            scheduleYearList: this.generateYears(),
            startTimeList: [] as StandardCodeData[],
            endTimeList: [] as StandardCodeData[],
            teacherList: [] as TEACHER_LIST[],
            teacherInfo: {} as TEACHER_LIST,
            subjectList: [] as SUBJECT_LIST[],
            subjectInfo: {} as SUBJECT_LIST,
            roomList: [] as ROOM_LIST[],
            roomInfo: {} as ROOM_LIST,
            filterInfo: {
                scheduleYear: new Date().getFullYear().toString(),
                scheduleDay: '',
                classYear: '',
                semester: '',
                departmentID: '',
                classID: '',
                searchKey: ''
            } as SCHEDULE_LIST_REQ,
            scheduleInfo: {
                startTime: '',
                endTime: '',
                teacherID: '',
                subjectID: '',
                roomID: '',
            } as SCHEDULE_LIST,
            checkedAllTeacher: true,
            isClickDeleteBtn: false,
            originalTotalSchedule: 0,
            lastEndTime: '',
            pageSize: 10,
            pageNumber: 0,
        }
    },

    watch: {
        'filterInfo.departmentID'() {
            this.getClassList();
            this.onGetTeacherList();
            this.filterInfo.classID = ''
        },
        'scheduleInfo.startTime'() {
            if (this.scheduleInfo.startTime !== '') {
                this.filterTimeList(this.scheduleInfo.startTime, true)
            }
        },
        'scheduleInfo.endTime'() {
            if (this.scheduleInfo.endTime !== '') {
                this.filterTimeList(this.scheduleInfo.endTime, false)
            }
        },
        'filterInfo.classID'() {
            if (this.isSelectedValidClass) {
                this.getSubjectList()
            }
            if (this.isValidFilterInfo) {
                this.onGetScheduleListDynamicColumn()
                this.startTimeList = this.generateScheduleTime()
                this.endTimeList = this.generateScheduleTime()
            }
        },
        'checkedAllTeacher'() {
            this.onGetTeacherList()
        },
        'filterInfo.scheduleDay'() {
            if (this.isValidFilterInfo) {
                this.onGetScheduleListDynamicColumn()
                this.startTimeList = this.generateScheduleTime()
                this.endTimeList = this.generateScheduleTime()
            }
        },
        '$i18n.locale'(){
            this.yearList = this.$codeUtil.translateYearlist()
            this.semesterList = this.$codeUtil.translateSemesterlist()
            this.statusCodeList = this.$codeUtil.translateStatusCodelist()
        }
    },

    computed: {
        isSelectedDepartment(): boolean {
            return this.filterInfo.departmentID !== '';
        },
        isSelectedValidClass(): boolean {
            return (this.filterInfo.classID !== '' &&
                this.filterInfo.classYear !== '' &&
                this.filterInfo.semester !== '')
        },
        isValidFilterInfo(): boolean {
            return (this.filterInfo.scheduleYear !== '' &&
                this.filterInfo.classID !== '' &&
                this.filterInfo.classYear !== '' &&
                this.filterInfo.semester !== '' &&
                this.filterInfo.departmentID !== '' &&
                this.filterInfo.scheduleDay !== '')
        },
        isValidScheduleInfo(): boolean {
            return this.scheduleInfo.startTime !== '' &&
                this.scheduleInfo.endTime !== '' &&
                this.teacherInfo.teacherID !== undefined &&
                this.subjectInfo.subjectID !== undefined &&
                this.roomInfo.roomID !== undefined
        },
        isDisableDeleteBtn(): boolean {
            return this.scheduleList.length <= 0;
        },
        onSetData() {
            this.filterInfo.classID = this.classInfo.classID
            this.filterInfo.classYear = this.classInfo.year
            this.filterInfo.semester = this.classInfo.semester
            this.getSubjectList()
        },
        checkEnableSaveBtn(): boolean {
            if (this.isClickDeleteBtn) return true;
            return this.originalTotalSchedule !== this.scheduleList.length
        }
    },

    mounted() {
        this.getRoomList()
        this.generateYears()
        this.getDepartmentList()
        this.startTimeList = this.generateScheduleTime()
        this.endTimeList = this.generateScheduleTime()
        this.yearList = this.$codeUtil.translateYearlist()
        this.semesterList = this.$codeUtil.translateSemesterlist()
        this.statusCodeList = this.$codeUtil.translateStatusCodelist()
    },

    methods: {
        async onGetScheduleListDynamicColumn() {
            const reqBody = this.filterInfo
            const response = (await requestService.request(API_PATH.SCHEDULE_LIST, reqBody, false)) as SCHEDULE_LIST_RES;
            this.scheduleList = response.body.scheduleList.map((data: any) => {
                return {
                    ...data,
                    schDay: data.scheduleDay
                }
            })
            this.originalScheduleList = this.scheduleList
            this.originalTotalSchedule = this.scheduleList.length
            if (this.scheduleList.length > 0) {
                const lastScheduleInfo = this.scheduleList[(this.scheduleList.length - 1)]
                this.lastEndTime = lastScheduleInfo.endTime
                this.resetFormSchedule(false)
                this.filterTimeList(this.lastEndTime, true)
                this.columns = Object.keys(response.body.scheduleList[0]).map(day => ({
                    field: day,
                    header: day
                })) as ScheduleColumn[];
                this.rows = response.body.scheduleList
            }
            this.isClickDeleteBtn = false
        },

        async getDepartmentList() {
            const reqBody: DEPARTMENT_LIST_REQ = {
                userID: "",
                searchKey: '',
                pageSize: 1000,
                pageNumber: 1
            }
            const response = (await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody, false)) as DEPARTMENT_LIST_RES;
            this.departmentList = response.body?.departmentList;
        },

        async getClassList() {
            if (this.isSelectedDepartment) {
                const reqBody: CLASS_LIST_REQ = {
                    classID: '',
                    departmentID: this.filterInfo.departmentID,
                    searchKey: '',
                    year: this.filterInfo.classYear,
                    semester: this.filterInfo.semester,
                    pageSize: 1000,
                    pageNumber: 1
                }
                const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_RES;
                this.classList = response.body?.classList
            }
        },

        async onGetTeacherList() {
            const reqBody = {
                teacherID: '',
                departmentID: this.checkedAllTeacher ? this.filterInfo.departmentID : ''
            }
            const res = await requestService.request(API_PATH.TEACHER_DEPARTMENT_LIST, reqBody, false) as TEACHER_LIST_RES;
            this.teacherList = res.body.departmentList
        },

        async getSubjectList() {
            const reqBody: SUBJECT_LIST_REQ = {
                classID: this.filterInfo.classID,
                classYear: this.filterInfo.classYear,
                semester: this.filterInfo.semester,
                departID: this.filterInfo.departmentID,
                searchKey: '',
            }
            const response = (await requestService.request(API_PATH.SUBJECT_LIST, reqBody, false)) as SUBJECT_LIST_RES;
            this.subjectList = response.body?.subjectList
        },

        async getRoomList() {
            const reqBody: ROOM_LIST_REQ = {
                searchKey: '',
                pageSize: 1000,
                pageNumber: 1,
            }
            const response = (await requestService.request(API_PATH.ROOM_LIST, reqBody, false)) as ROOM_LIST_RES;
            this.roomList = response.body?.roomList
        },

        onClickAddToList() {
            this.lastEndTime = this.scheduleInfo.endTime
            const data = {
                schDay: this.filterInfo.scheduleDay,
                seqNo: (this.scheduleList.length + 1),
                teacherID: this.teacherInfo.teacherID,
                firstName: this.teacherInfo.firstName,
                lastName: this.teacherInfo.lastName,
                subjectID: this.subjectInfo.subjectID,
                subjectName: this.subjectInfo.subjectName,
                roomID: this.roomInfo.roomID,
                roomName: this.roomInfo.roomName,
                startTime: this.scheduleInfo.startTime,
                endTime: this.scheduleInfo.endTime,
                classID: this.filterInfo.classID
            } as SCHEDULE_LIST
            this.scheduleList.push(data)
            this.resetFormSchedule(false)
        },

        async onClickBtnDelete() {
            this.isClickDeleteBtn = true
            const lastItem = this.scheduleList[this.scheduleList.length - 1];
            this.scheduleList = this.scheduleList.filter(data => data.seqNo !== lastItem.seqNo)
            const reqBody = {
                scheduleID: this.filterInfo.scheduleYear + this.filterInfo.classID + this.filterInfo.classYear + this.filterInfo.semester,
                scheduleDay: this.filterInfo.scheduleDay,
                seqNo: lastItem.seqNo
            }
            console.log(reqBody);
            const result = await requestService.request(API_PATH.SCHEDULE_DELETE, reqBody, true);
            console.log(result);
            this.lastEndTime = lastItem.startTime
            if (this.scheduleList.length > 0) {
                const lastSchedule = this.scheduleList[this.scheduleList.length - 1];
                this.lastEndTime = lastSchedule.endTime
                this.filterStartTime(this.lastEndTime)
            } else {
                this.startTimeList = this.generateScheduleTime()
                this.endTimeList = this.generateScheduleTime()
            }
        },

        onClickSave() {
            const reqBody = {
                schYear: this.filterInfo.scheduleYear,
                classID: this.filterInfo.classID,
                cyear: this.filterInfo.classYear,
                semester: this.filterInfo.semester,
                scheduleList: this.scheduleList
            }
            requestService.request(API_PATH.SCHEDULE_REGISTER, reqBody, true)
        },

        onClickClearFilter() {
            this.filterInfo = {
                scheduleYear: new Date().getFullYear().toString(),
                scheduleDay: '',
                classYear: '',
                semester: '',
                departmentID: '',
                classID: '',
                searchKey: ''
            }
            this.scheduleInfo = {
                startTime: '',
                endTime: '',
                teacherID: '',
                subjectID: '',
                roomID: this.roomInfo.roomID,
            } as SCHEDULE_LIST
            this.classList = []
            this.classInfo = {} as CLASS_LIST
            this.resetFormSchedule(true)
        },

        onClickClearFilterSchedule() {
            this.resetFormSchedule
        },

        convertTime(time: string) {
            return this.$format.convertTo12HourFormat(time)
        },

        generateYears() {
            const currentYear = new Date().getFullYear() + 1;
            const startYear = 2020;
            const years = [] as any[];
            for (let year = currentYear; year >= startYear; year--) {
                years.push({ codeValue: year.toString(), codeValueDesc: year });
            }
            return years;
        },

        generateScheduleTime() {
            const times = [] as StandardCodeData[];
            let hour = 7;
            let minute = 0;
            while (hour < 21) {
                const codeValue = `${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`;
                const period = hour < 12 ? 'AM' : 'PM';
                const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                const codeValueDesc = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
                const obj = {
                    codeValue: codeValue,
                    codeValueDesc: codeValueDesc
                } as StandardCodeData
                times.push(obj);
                minute += 30;
                if (minute === 60) {
                    minute = 0;
                    hour++;
                }
            }
            return times
        },

        filterTimeList(selectHour: string, isStartTime: boolean) {
            if (isStartTime) {
                this.endTimeList = this.generateScheduleTime()
                this.endTimeList = this.endTimeList.filter(time => (Number(time.codeValue) > Number(selectHour)));
            } else {
                this.startTimeList = this.generateScheduleTime()
                this.startTimeList = this.startTimeList.filter(time => (Number(time.codeValue) <= Number(selectHour)));
            }
        },

        filterStartTime(lastEndTime: string) {
            this.startTimeList = this.generateScheduleTime()
            this.startTimeList = this.startTimeList.filter(time => (Number(time.codeValue) >= Number(lastEndTime)));
        },

        resetFormSchedule(isClearFilter: boolean) {
            this.scheduleInfo = {
                startTime: '',
                endTime: '',
                teacherID: '',
                subjectID: '',
                roomID: this.roomInfo.roomID,
            } as SCHEDULE_LIST,
                this.teacherInfo = {} as TEACHER_LIST,
                this.subjectInfo = {} as SUBJECT_LIST
            if (!isClearFilter) {
                this.filterStartTime(this.lastEndTime)
            } else {
                this.roomInfo = {} as ROOM_LIST
                this.scheduleList = [],
                    this.startTimeList = this.endTimeList = this.generateScheduleTime()
            }
        }
    }
})
</script>

<style scoped>
/* @import url('./schedule-list.scss'); */
</style>