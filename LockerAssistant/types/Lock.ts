import { LockType, LockStatus } from "../enums/Index";

export type Lock = {
    lockerNumber: number;
    lockType: LockType;
    lockCode: number;
    lockStatus: LockStatus;
}