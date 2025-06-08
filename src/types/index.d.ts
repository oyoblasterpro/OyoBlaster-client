export type TGroup = {
    _id: string,
    groupName: string,
    accountId: string,
    createdAt: string,
    updatedAt: string,
    totalSubscriber: number
}
export type TRegisterUserPayload = {
    email: string,
    name: string,
    password: string,
}

export type TChangePasswordPayload = {
    oldPassword: string,
    newPassword: string,
}

export type ResetPasswordPayload = {
    token: string,
    email: string,
    newPassword: string,
}

export type TAccount= {
    _id: string;
    email: string;
    password: string;
    lastPasswordChange: string;
    isDeleted: boolean;
    status: 'ACTIVE' | 'BLOCK';
    role: 'USER' | 'ADMIN';
    createdAt: string; // ISO timestamp
    updatedAt: string; // ISO timestamp
}

export type TProfile = {
    _id: string;
    name: string;
    accountId: string;
    createdAt: string;
    updatedAt: string;
    photo?: string,
    address?: {
        location?: string,
        city?: string,
        state?: string,
        postCode?: string,
        country?: string,
        timeZone?: string
    },
}

export interface ILoginUser {
    account: Account;
    profile: Profile;
}


export type TEmailCampaign = {
    _id: string;
    subject: string;
    text: string;
    html: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    groupId: TGroup;
    isDelivered:boolean;
};