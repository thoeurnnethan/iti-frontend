
export enum API_PATH {
    //User
    USER_LIST = "api/user/list",
    USER_DETAIL = "api/user/detail",
    USER_REGISTER = "api/user/register",
    USER_UPDATE = "api/user/update",
    USER_LOGIN = "api/user/login",
    USER_LOGOUT = "api/user/logout",
    USER_CHANGE_PASSWORD = "api/user/change-password",
    //Department
    DEPARTMENT_LIST = "api/department/list",
    DEPARTMENT_LIST_DOWNLOAD = "api/department/list/download",
    DEPARTMENT_DETAIL = "api/department/detail",
    DEPARTMENT_REGISTER = "api/department/register",
    DEPARTMENT_UPDATE = "api/department/update",
    //Department Management
    DEPARTMENT_MNGT_LIST = "api/department-mngt/list",
    //Class
    CLASS_LIST = "api/class-info/list",
    CLASS_LIST_DOWNLOAD = "api/class-info/list/download",
    CLASS_DETAIL = "api/class-info/detail",
    CLASS_REGISTER = "api/class-info/register",
    CLASS_UPDATE = "api/class-info/update",
    CLASS_UPGRADE = "api/class-info/upgrade",
    //Student
    STUDENT_LIST = "api/student/list",
    STUDENT_DETAIL = "api/student/detail",
    STUDENT_REGISTER = "api/student/register",
    STUDENT_UPDATE = "api/student/update",
    //Room
    ROOM_LIST = "api/room/list",
    ROOM_UPDATE = "api/room/update",
    ROOM_REGISTER = "api/room/register",
    //Subject
    SUBJECT_LIST = "api/subject/list",
    SUBJECT_UPDATE = "api/subject/update",
    SUBJECT_REGISTER = "api/subject/register",
    //Schedule
    SCHEDULE_LIST = "api/schedule/list",
    SCHEDULE_VALIDATE = "api/schedule/register/validate",
    SCHEDULE_UPDATE = "api/schedule/update",
    SCHEDULE_REGISTER = "api/schedule/register",
    //StudentClass
    STUDENT_CLASS_LIST = "api/class-info/list/student",
    STUDENT_CLASS_UPDATE = "api/class-info/register/student",
    STUDENT_CLASS_REGISTER = "api/class-info/update/student",
    //teacherDepartment
    TEACHER_DEPARTMENT_LIST = "api/department-mngt/list",
    TEACHER_DEPARTMENT_UPDATE = "api/department-mngt/update",
    TEACHER_DEPARTMENT_REGISTER = "api/department-mngt/register",
    //Student Score
    SCORE_LIST = "api/score/list",
    SCORE_REGISTR = "api/score/register"
}