import { renameSync } from 'node:fs';
renameSync(new URL('../dist/client/app.html', import.meta.url), new URL('../dist/client/index.html', import.meta.url));
