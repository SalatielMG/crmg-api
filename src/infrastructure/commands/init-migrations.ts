import { exec } from 'child_process';
import { asyncForEach } from '../helpers/util';
const migrationsList = [
    'npx sequelize-cli db:migrate:undo:all',
    'npx sequelize-cli db:migrate --to 20210531020455-create-company.js',
    // 'npx sequelize-cli db:migrate',
];
const runMigration = async (migration) => {
    return new Promise((resolve, reject) => {
        console.log('run migration: ', migration);
        const mig = exec(migration,
            {
                env: process.env
            },
            (err) => {
                if (err) reject(err);
                else resolve('Success migration');
            });
        mig.stdout.pipe(process.stdout);
        mig.stderr.pipe(process.stderr);
    });
}
asyncForEach(migrationsList, async (migration) => {
    try {
        await runMigration(migration);
    } catch (error) {
        console.error('error run migration: ', migration, error);
    }
});


