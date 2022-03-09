import { exec } from 'child_process';
import { asyncForEach } from './util';
const migrationsList = [
    'npx sequelize-cli db:migrate:undo:all',
    'npx sequelize-cli db:migrate --to 20210531020455-create-company.js',
    'npx sequelize-cli db:migrate --to 20210531042622-create-pesonnel.js',
    'npx sequelize-cli db:migrate --to 20210531061554-create-user.js',
    'npx sequelize-cli db:migrate --to 20210606214816-create-invitation.js',
    'npx sequelize-cli db:migrate --to 20211011021437-create-client.js',
    'npx sequelize-cli db:migrate --to 20220207043524-create-category.js',
    'npx sequelize-cli db:migrate --to 20220207043542-create-service.js',
    'npx sequelize-cli db:migrate --to 20220207181845-create-contract.js',
    'npx sequelize-cli db:migrate --to 20220308034048-create-installation.js',
    'npx sequelize-cli db:migrate --to 20220308035044-create-monthly_payment.js',
    'npx sequelize-cli db:migrate --to 20220308042329-create-payment_type.js',
    'npx sequelize-cli db:migrate --to 20220308040004-create-movement.js',
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


