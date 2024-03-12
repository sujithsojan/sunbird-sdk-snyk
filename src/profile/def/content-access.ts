export class ContentAccess {
    status: ContentAccessStatus;
    contentId: string;
    contentType: string;
    contentLearnerState?: ContentLearnerState;
    primaryCategory?: string;
}

export interface ContentLearnerState {
    learnerState: { [key: string]: any };
}

export enum ContentAccessStatus {
    NOT_PLAYED = 0,
    PLAYED = 1
}
