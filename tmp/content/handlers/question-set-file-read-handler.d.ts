import { StorageService } from '../../storage/def/storage-service';
import { FileService } from '../../util/file/def/file-service';
export declare class QuestionSetFileReadHandler {
    private storageService;
    private fileService;
    constructor(storageService: StorageService, fileService: FileService);
    getLocallyAvailableQuestion(questionIds: any, parentId: any): import("rxjs").Observable<{
        questions: any[];
        count: 10;
    }>;
}
