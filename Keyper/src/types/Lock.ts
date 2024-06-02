import { LockType, LockStatus } from "@/enums/Index";

export type Lock = {
    lockNumber: number | string | null;
    lockLenght: number;
    lockType: LockType;
    lockCode: number | string | null;
    lockStatus: LockStatus;
}