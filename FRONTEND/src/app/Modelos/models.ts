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
    friends: any[]
}

export interface sendRequestsModel {
    userId: string,
    userIdF: string,
    displayName: string,
    profilePic: string,
    email: string
}

export interface addFriendModel {
    userId: string,
    displayName: string,
    email: string,
    profilePic: string,
    userIdF: string,
    displayNameF: string,
    emailF: string,
    profilePicF: string,
}

export interface getFriendModel {
    userId: string,
    userIdF: string,
}

export interface getRequestsModel {
    userId: string
}