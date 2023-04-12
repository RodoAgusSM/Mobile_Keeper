import { LockType, LockStatus } from "../enums/Index";

export type Lock = {
    lockType: LockType;
    lockCode: number;
    lockStatus: LockStatus;
}