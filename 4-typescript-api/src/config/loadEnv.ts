import path from 'path';
import dotenv from 'dotenv';

const ENV = process.env.ENV || 'local';

// record for the different expected environments
// if you need more just add then (stage,uat..etc)
const envFileMap:Record<string,string> = {
    test:'.env.test',
    local:'.env.local',
    prod:'.env'
};

// setting the env file
const envFile=envFileMap[ENV] || '.env';

dotenv.config({
    path:path.resolve(process.cwd(),envFile)
});

console.log(`Loaded environment ${envFile}`);