import Dexie from 'dexie';

export class CourseDatabase extends Dexie {
    constructor() {
        super('ControlCourseDB');
        this.version(1).stores({
            userProgress: 'id', // id is primary key
        });
        this.userProgress = this.table('userProgress');
    }
}

export const db = new CourseDatabase();

// Initial seed
db.on('populate', () => {
    db.userProgress.add({
        id: 'current-user',
        currentModuleId: 'intro',
        completedModuleIds: [],
        notes: {},
        lastUpdated: Date.now(),
    });
});
