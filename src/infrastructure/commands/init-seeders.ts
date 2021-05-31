import { exec } from 'child_process';
import { asyncForEach } from '../helpers/util';
const sedeersList = [
    'npx sequelize-cli db:seed:undo:all',
    'npx sequelize-cli db:seed --seed 20210531031433-insert-companies',
    // 'npx sequelize-cli db:migrate',
];

const runSeeder = async (seeder) => {
    return new Promise((resolve, reject) => {
        console.log('run seeder: ', seeder);
        const seed = exec(seeder,
            {
                env: process.env
            },
            (err) => {
                if (err) reject(err);
                else resolve('success seeder');
            });
        seed.stdout.pipe(process.stdout);
        seed.stderr.pipe(process.stderr);
    });
}
asyncForEach(sedeersList, async (seeder) => {
    try {
        await runSeeder(seeder);
    } catch (error) {
        console.error('error run seeder: ', seeder, error);
    }
});


