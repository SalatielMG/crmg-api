export interface ISendInvitationService {
    sendInvitationConfirmEmailService: (email: string, from?: string, subject?: string, body?: string) => Promise<boolean>
}
