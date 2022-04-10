import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const editionDrop = sdk.getEditionDrop(
  '0x8514E0658699Be7C6c73Cc7f7B173357BDF36604'
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: 'Pledge for Everydays',
        description:
          'This NFT will be your reminder for the gradual development of your self-govern self.',
        image: readFileSync('scripts/assets/pledge-drop.jpg'),
      },
    ]);
    console.log('✅ Successfully add a new NFT in the drop');
  } catch (err) {
    console.error('❌ Failed to create NFT', err);
    process.exit(1);
  }
})();
