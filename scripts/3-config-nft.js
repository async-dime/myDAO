import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const editionDrop = sdk.getEditionDrop(
  '0x95d12CBe32b6442BB278534b0D390002F4d2a888'
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: 'Pledge for Everydays',
        description:
          'This NFT will be your reminder for the gradual development of your self-govern self, and this will be your entry asset to entering MyDAO Obelisk Chamber.',
        image: readFileSync('scripts/assets/pledge.png'),
      },
    ]);
    console.log('✅ Successfully add a new NFT in the drop');
  } catch (err) {
    console.error('❌ Failed to create NFT', err);
  }
})();
