import sdk from './1-initialize-sdk.js';

// This is the address to our ERC-1155 MyDAO Obelisk Chamber NFT contract
const editionDrop = sdk.getEditionDrop(
  '0x95d12CBe32b6442BB278534b0D390002F4d2a888'
);

// This is the address to our ERC-20 MyDAO Ultima Token contract
const token = sdk.getToken('0x0Ca930033857Da238C4cF518Bb2e58F23d2178b6');

(async () => {
  try {
    // Grab all the addresses of people who own our MyDAO Obelisk Chamber NFT
    // which has tokenID of 0
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log('🤷‍♂️ No one has claimed the MyDAO Obelisk Chamber NFT yet');
      process.exit(0);
    }

    // Loop through all the addresses
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log('💧 Going to airdrop', randomAmount, '$ULT to', address);

      //Set up the target
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets
    console.log('⏳ Starting airdrop...');
    await token.transferBatch(airdropTargets);
    console.log(
      '✅ Successfully airdropped $ULT to all the people who have claimed the MyDAO Obelisk Chamber NFT'
    );
  } catch (err) {
    console.error('❌ Failed to airdrop $ULT tokens', err);
  }
})();
