<template src="./schedule-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { YearList, SemesterList, globalStatusCodeList, WeekdayList, ClassTypeList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';
import { SCHEDULE_LIST, SCHEDULE_LIST_REQ, SCHEDULE_LIST_RES, ScheduleColumn, ScheduleRow } from '@/shared/types/schedule-list';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { ExportExcel } from '@/shared/services/export-excel-class';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
    name: "schedule-list",
    inheritAttrs: false,
    components: {
        MyLoading
    },
    data() {
        const dataTable = ref<SCHEDULE_LIST[]>([]);
        return {
            dataTable,
            yearList: YearList,
            semesterList: SemesterList,
            statusCodeList: globalStatusCodeList,
            weekdayList: WeekdayList,
            classTypeList: ClassTypeList,
            departmentList: [] as DEPARTMENT_LIST[],
            classList: [] as CLASS_LIST[],
            columns: [] as ScheduleColumn[],
            rows: [] as ScheduleRow[],
            scheduleYearList: this.generateYears(),
            scheduleHeader: {},
            filterInfo: {
                scheduleYear: new Date().getFullYear().toString(),
                classYear: '1',
                semester: '1',
                departmentID: '',
                classID: '',
                searchKey: ''
            } as SCHEDULE_LIST_REQ,
            pageSize: 10,
            pageNumber: 0,
        }
    },

    watch: {
        'filterInfo.departmentID'() {
            this.resetTable()
            this.filterInfo.classID = ''
            this.getClassList()
        },
        'filterInfo.classID'() {
            this.resetTable()
            if (this.isValidFilter) {
                this.onGetScheduleListDynamicColumn()
            }
        }
    },

    computed: {
        isSelectedDepartment(): boolean {
            return this.filterInfo.departmentID !== '';
        },
        isValidFilter(): boolean {
            return this.filterInfo.classYear !== '' &&
                this.filterInfo.semester !== '' &&
                this.filterInfo.departmentID !== '' &&
                this.filterInfo.classID !== ''
        },
        formattedData() {
            return this.dataTable.map((item) => {
                return {
                    Monday: this.formatSchedule(item.Monday),
                    Tuesday: this.formatSchedule(item.Tuesday),
                    Wednesday: this.formatSchedule(item.Wednesday),
                    Thursday: this.formatSchedule(item.Thursday),
                    Friday: this.formatSchedule(item.Friday),
                    Saturday: this.formatSchedule(item.Saturday),
                };
            });
        },
    },

    mounted() {
        this.getDepartmentList()
        this.generateYears()
    },

    methods: {
        async onGetScheduleListDynamicColumn() {
            const reqBody = this.filterInfo
            const response = await requestService.request(API_PATH.SCHEDULE_LIST, reqBody, false) as SCHEDULE_LIST_RES;
            if(response.body.scheduleList.length > 0){
                this.scheduleHeader = response.body
                this.columns = Object.keys(response.body.scheduleList[0]).map(day => ({
                    field: day,
                    header: day
                })) as ScheduleColumn[];
                this.rows = response.body.scheduleList
                this.dataTable = response.body.scheduleList
            }
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

        onClickClearFilter() {
            this.filterInfo = {
                scheduleYear: new Date().getFullYear().toString(),
                classYear: '1',
                semester: '1',
                departmentID: '',
                classID: '',
                searchKey: ''
            },
                this.resetTable
            this.classList = []
        },

        resetTable() {
            this.rows = []
            this.columns = []
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

        formatSchedule(schedule: { firstName?: any; lastName?: any; subjectName?: any; roomName?: any; building?: any; startTime?: any; endTime?: any; }) {
            if (!schedule || Object.keys(schedule).length === 0) return '';
            return `Time: ${this.formatTime(schedule.startTime)} - ${this.formatTime(schedule.endTime)}\nSubject: ${schedule.subjectName}\nTeacher: ${schedule.firstName} ${schedule.lastName}\nRoom: ${schedule.roomName}\nBuilding: ${schedule.building}`;
        },

        formatTime(time: string | any[]) {
            return `${time.slice(0, 2)}:${time.slice(2)}`;
        },

        exportToExcel() {
            const excelData = this.formattedData
            const exportExcelData = [
                {
                    data: excelData
                },
            ];
            exportExcel.exportSheet(exportExcelData, 'Schedule')
        }

    },
})
</script>

<style scoped>
@import url('./schedule-list.scss');
</style>