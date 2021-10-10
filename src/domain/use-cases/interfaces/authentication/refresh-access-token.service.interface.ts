export interface IRefreshAccessTokenService {
    refreshAccessToken: (accessToken: IRefreshAccessTokenService.Params) => Promise<IRefreshAccessTokenService.Result>;
}

export namespace IRefreshAccessTokenService {
    export type Params = {
        accessToken: string
    };

    export type Result = {
        accessToken: string
        user: any
    }
}
