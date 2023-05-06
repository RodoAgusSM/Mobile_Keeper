import { LockType, LockStatus } from "../enums/Index";

export type Lock = {
    lockerNumber: number;
    lockLenght: number;
    lockType: LockType;
    lockCode: number | string | null;
    lockStatus: LockStatus;
}