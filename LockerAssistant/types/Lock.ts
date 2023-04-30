import { LockType, LockStatus } from "../enums/Index";

export type Lock = {
    lockerNumber: number;
    lockLenght: number;
    lockType: LockType;
    lockCode: number | null;
    lockStatus: LockStatus;
}