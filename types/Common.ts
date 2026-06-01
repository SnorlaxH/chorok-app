export type ChotubeXml = Readonly<{
    type: string,
    name: string,
    elements?: object[]
    attributes?: object
}>

export type ChotubeData = Readonly<{
    videoId: string,
    channelId: string,
    channelTitle: string,
    createdAt: Date,
    description: string
    published: Date,
    thumbnail: string,
    title: string,
}>;

export type AuthUser = Readonly<{
    id: string,
    no: number,
    name: string,
}>;

export type AuthType = Readonly<{
    user: AuthUser,
    accessToken: string,
    refreshToken: string,
}>;