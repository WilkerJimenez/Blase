export interface userModel {
    email: string,
    password: string
}

export interface regisModel {
    userName: string,
    email: string,
    password: string,
    profilePic: string
}

export interface regisFModel {
    userName: string,
    email: string,
    uid: string,
    profilePic: string,
}

export interface authModel {
    IdToken: string,
}

export interface searchModel {
    userId: string,
    friendName: string,
    friends: any[]
}

export interface sendRequestsModel {
    requestTo: string,
    requestFrom: string
}

export interface addFriendModel {
    userId: string,
    userIdF: string,
}

export interface getFriendModel {
    userId: string,
    userIdF: string,
}

export interface getRequestsModel {
    userId: string
}

export interface profileModel {
    id: string,
    displayName: string,
    profilePic: string
}