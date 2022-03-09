import { exec } from 'child_process';
import { asyncForEach } from './util';

const sedeersList = [
    'npx sequelize-cli db:seed:undo:all',
    'npx sequelize-cli db:seed --seed 20210531031433-insert-companies',
    'npx sequelize-cli db:seed --seed 20210531055807-insert-personnel',
    'npx sequelize-cli db:seed --seed 20220207044450-insert-categories',
    'npx sequelize-cli db:seed --seed 20220207044459-insert-services',
    'npx sequelize-cli db:seed --seed 20220308044014-insert-payment_type.js',
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


