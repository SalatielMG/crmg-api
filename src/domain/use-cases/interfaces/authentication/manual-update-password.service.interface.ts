export interface IManualUpdatePasswordService {
    updatePassword: (newPassword: string, personnelId: number) => Promise<void>;
}
