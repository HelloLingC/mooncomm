export interface Comment {
    nickname: string
    email: string
    website: string
    comment: string
    page_id: string
    page_title: string
    reply_to?: number
    votes?: number
    created_time?: Date
}