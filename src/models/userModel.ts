export interface ICreateUserInputPayload {
    name: string;
    identification_number: string;
    email: string;
    referral_email?: string;
}

export interface IUpdateUserPayload {
    name: string;
    email: string;
}