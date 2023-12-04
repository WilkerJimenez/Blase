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
    query: string,
}

export interface addFriend {
    userId: string,
    displayName: string,
    email: string,
    uid: string,
    profilePic: string,
}