export interface Message  {
    id: number,
    type: string,
    direction: string,
    createTime: string;
    data: {
        time: string
        toUid: number
        isProperty: boolean
        subjectId: number
        content?: string
        name?: string
        hostname?: string
        applicantname?: string
        price?: string
        reason?: string
        fromUid?: number
        hostUid?: number
    }
    active?: boolean
    // createTime: string
    // mtype: number
    // sessionId: number
}