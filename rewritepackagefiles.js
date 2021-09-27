import fs from 'fs';
import fastGlob from 'fast-glob';

// Re-write package.json
for (const result of fastGlob.sync([
  '*/package.json',
  'element/*/package.json',
], {
  cwd: 'packages',
  objectMode: true,
})) {
  const filePath = `packages/${result.path}`;
  const directory = filePath.replace(`/${result.name}`, '');
  const packageData = {
    ...JSON.parse(fs.readFileSync(filePath, 'utf-8')),
    author: 'Béa',
    license: 'ISC',
    repository: {
      type: 'git',
      url: 'https://github.com/bea-gives/bea',
      directory,
    },
    bugs: 'https://github.com/bea-gives/bea/issues',
    homepage: `https://github.com/bea-gives/bea/tree/master/${directory}`,
  };
  fs.writeFileSync(filePath, `${JSON.stringify(packageData, null, 2)}\n`);
}
