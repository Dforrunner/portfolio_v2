import fs from 'fs/promises';
import path from 'path';

async function getImages(dirRelativeToPublicFolder: string) {
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  const filenames = await fs.readdir(dir);
  const images = filenames.map((name) => ({
    name: name.split('.')[0],
    path: path.join('/', dirRelativeToPublicFolder, name),
  }));
  return images;
}

export async function skillImages() {
  const paths = ['logos/langs', 'logos/frameworks', 'logos/tools'];
  const [langs, frameworks, tools] = await Promise.all(paths.map(getImages));
  return { langs, frameworks, tools };
}
