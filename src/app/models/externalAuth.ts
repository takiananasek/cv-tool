export interface ExternalAuth {
    provider: string;
    idToken: string;
}

export interface ExternalAuthResponse {
    jwtToken: string;
    sessionId: string;
    providerKey?: string;
    loginProvider? : string;
    email: string;
    id: number;
}