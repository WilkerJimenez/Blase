export interface userModel {
    email: string,
    password: string
}

export interface regisModel {
    userName: string,
    email: string,
    password: string
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
    friends:string
}

export interface addFriendModel {
    userId: string,
    displayName: string,
    email: string,
    uid: string,
    profilePic: string,
}

export interface getFriendModel {
    userId: string
}