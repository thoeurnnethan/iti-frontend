<template src="./room-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { ROOM_LIST, ROOM_LIST_REQ, ROOM_LIST_RES } from '@/shared/types/room-list';
import room_action from '../room-action/room-action.vue';
import { ExportExcel } from '@/shared/services/export-excel-class';
import { globalStatusCodeList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
    name: "room-list",
    inheritAttrs: false,
    components: {
        MyLoading
    },
    data() {
        const dataTable = ref<ROOM_LIST[]>([]);
        return {
            statusCodeList: globalStatusCodeList,
            roomList: [] as ROOM_LIST[],
            roomInfo: {} as ROOM_LIST,
            searchKeyword: '',
            Loading: false,
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            dataTable,

        }
    },

    mounted() {
        this.getRoomList();
    },

    methods: {
        async getRoomList() {
            this.Loading = true;
            const reqBody: ROOM_LIST_REQ = {
                searchKey: this.searchKeyword,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber + 1,
            }
            const response = (await requestService.request(API_PATH.ROOM_LIST, reqBody, false)) as ROOM_LIST_RES;
            this.roomList = response.body?.roomList.map((data, index) => {
                return {
                    ...data,
                    no: index + 1 + (this.pageSize) * this.pageNumber
                }
            });
            this.totalCount = response.body?.totalCount;
            this.dataTable = response.body?.roomList.map((data, index) => {
                return {
                    ...data,
                    no: 1 + index,
                }
            });
            this.Loading = false;
        },

        rowClass(data: { statusCode: string; }) {
            return data.statusCode === '09' ? 'we_bg_row' : '';
        },

        // Handle page size page number
        onPage(event: { page: number; rows: number; }) {
            this.pageNumber = event.page;
            this.pageSize = event.rows;
            this.getRoomList();
        },

        async onClickAction(item: ROOM_LIST, statusCode: string) {
            let messageHeader = ''
            let messageAcceptDetail = ''
            let messageRejectDetail = 'You have rejected'
            let btnAcceptClass = 'btn '
            if (statusCode === '01') {
                messageHeader = "Do you want to set to Active ?";
                messageAcceptDetail = 'The record has been set.';
                btnAcceptClass += 'btn-success'
            } else if (statusCode === '02') {
                messageHeader = "Do you want to delete this record?";
                messageAcceptDetail = 'The record has been deleted.';
                btnAcceptClass += 'btn-danger'
            } else {
                messageHeader = "Do you want to hide this record?";
                messageAcceptDetail = 'The record has been set.';
                btnAcceptClass += 'btn-warning'
            }
            this.$confirm.require({
                message: messageHeader,
                header: 'Please Comfirm',
                acceptLabel: 'Yes',
                acceptClass: btnAcceptClass,
                rejectLabel: 'No',
                rejectClass: 'btn btn-secondary',
                accept: async () => {
                    const reqBody = {
                        roomID: item.roomID,
                        statusCode: statusCode
                    }
                    const res = await requestService.request(API_PATH.ROOM_UPDATE, reqBody, false);
                    if (res) {
                        this.getRoomList();
                        this.$toast.add({ summary: 'Confirmed', detail: messageAcceptDetail, life: 1000 });
                    }
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: messageRejectDetail, life: 1000 });
                }
            });
        },

        // Insert Room
        async onClickInsert() {
            this.$popupService.onOpen({
                component: room_action,
                dataProp: {
                    roomInfoData: this.roomInfo,
                    isInsert: true
                },
                callback: () => {
                    this.getRoomList();
                },
                onClose: () => {
                    this.getRoomList();
                }
            })
        },

        // Edit class method
        async onClickEdit(item: ROOM_LIST) {
            this.$popupService.onOpen({
                component: room_action,
                dataProp: {
                    roomInfoData: item,
                    isInsert: false
                },
                callback: () => {
                    this.getRoomList();
                },
                onClose: () => {
                    this.getRoomList();
                }
            })
        },

        //download excel
        exportToExcel() {
            const excelData = this.dataTable.map((data, index) => {
                return {
                    "No": index + 1,
                    "Room ID": data.roomID,
                    "Room Name": data.roomName,
                    "Room Desc": data.roomDesc,
                    "Status": this.$codeConverter.codeToString(this.statusCodeList, data.statusCode)
                };
            })
            const exportExcelData = [
                {
                    data: excelData
                },
            ];
            exportExcel.exportSheet(exportExcelData, 'Room info')
        },

    },
})
</script>

<style scoped>
@import url('./room-list.scss');
</style>