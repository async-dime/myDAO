import { AddressZero } from '@ethersproject/constants';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      // The collection's name
      name: 'MyDAO Obelisk Chamber',
      // The collection's description
      description: 'A DAO for self-govern individuals',
      // The image that will be held on our NFT!
      image: readFileSync('scripts/assets/obelisk.png'),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the contract.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop
      primary_sale_recipient: AddressZero,
    });

    // initialize the contract on the thirdweb sdk
    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    // the contract's metadata
    const metadata = await editionDrop.metadata.get();

    console.log(
      '✅ Successfully deployed editionDrop contract, address:',
      editionDropAddress
    );
    console.log('🏷️ Edition Drop Metadata:', metadata);
  } catch (err) {
    console.error('❌ Failed to deploy editionDrop contract', err);
  }
})();
