import { ClassTypeList, globalStatusCodeList, SemesterList, TeacherRoleList, UserRole, UserRoleList, YearList } from "../common/common";
import { StandardCodeData } from "../types/standard-code";
import { ConvertCode } from "./code-convert";

const codeConverter = new ConvertCode

export class TranslateCodeUtil {

    public translateYearlist(): StandardCodeData[]{
        return codeConverter.codeToStringList(YearList, 'yearCode');
    }

    public translateSemesterlist(): StandardCodeData[]{
        return codeConverter.codeToStringList(SemesterList, 'semesterCode');
    }

    public translateClassTypelist(): StandardCodeData[]{
        return codeConverter.codeToStringList(ClassTypeList, 'classType');
    }

    public translateStatusCodelist(): StandardCodeData[]{
        return codeConverter.codeToStringList(globalStatusCodeList, 'statusCode');
    }

    public translateUserRoleList(): StandardCodeData[]{
        return codeConverter.codeToStringList(UserRoleList, 'userRoleCode');
    }

    public translateTeacherRoleList(): StandardCodeData[]{
        return codeConverter.codeToStringList(TeacherRoleList, 'userRoleCode');
    }

    public translateAllUserRoleList(): StandardCodeData[]{
        return codeConverter.codeToStringList(UserRole, 'userRoleCode');
    }
}