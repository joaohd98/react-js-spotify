const fs = require('fs');

let selectedEnv = process.argv[3] || "prd";

if(!selectedEnv || !['hml', 'dsv', 'prd'].find(str => str === selectedEnv))
  return;

let env = fs.readFileSync(`environments/env.${selectedEnv}.ts`, 'utf-8');

env = env.replace("_" + selectedEnv.toUpperCase(), "");

fs.writeFileSync('src/env.ts', env, 'utf-8');



