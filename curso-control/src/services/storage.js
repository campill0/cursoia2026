import { db } from '../db/db';

const APP_NAME = 'CONTROL-Course';
const APP_VERSION = '1.0.0';

export const exportBackup = async () => {
    try {
        const userProgress = await db.userProgress.toArray();

        return {
            app: APP_NAME,
            version: APP_VERSION,
            exportedAt: new Date().toISOString(),
            data: {
                userProgress,
            },
        };
    } catch (error) {
        console.error("Export failed:", error);
        throw error;
    }
};

export const downloadBackup = (backup) => {
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${APP_NAME}-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const wipeDatabase = async () => {
    await db.delete();
    await db.open(); // Re-open to re-create tables
};

export const importBackupReplace = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const content = e.target?.result;
                const backup = JSON.parse(content);

                if (backup.app !== APP_NAME) {
                    throw new Error('Invalid backup file: App name mismatch');
                }

                // 1. Auto-backup before replace
                const currentBackup = await exportBackup();
                console.log('Auto-backup created before import:', currentBackup);
                localStorage.setItem('auto-backup-latest', JSON.stringify(currentBackup));

                // 2. Wipe DB
                await db.transaction('rw', db.userProgress, async () => {
                    await db.userProgress.clear();

                    // 3. Import
                    await db.userProgress.bulkAdd(backup.data.userProgress);
                });

                resolve();
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
};
