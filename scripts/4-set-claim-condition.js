import sdk from './1-initialize-sdk.js';
import { MaxUint256 } from '@ethersproject/constants';

const editionDrop = sdk.getEditionDrop(
  '0x95d12CBe32b6442BB278534b0D390002F4d2a888'
);

(async () => {
  try {
    // We define our claim condition, this is an array of objects because
    // if we want we can have multiple phases starting at different times
    const claimConditions = [
      {
        // When people are gonna be able to start claiming, the nft (now)
        startTime: new Date(),
        // The maximum number of NFTs that can be claimed
        maxQuantity: 50_000,
        // The price of our NFT (free for now)
        price: 0,
        // The amount of NFTs people can claim in one transaction
        quantityLimitPerTransaction: 1,
        // We set the wait between transaction to MaxUint256, which means
        // people are only allowed to claim once
        waitInSeconds: MaxUint256,
      },
    ];

    await editionDrop.claimConditions.set('0', claimConditions);
    console.log('✅ Successfully set claim conditions');
  } catch (err) {
    console.error('❌ Failed to set claim condition', err);
  }
})();
