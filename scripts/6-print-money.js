import sdk from './1-initialize-sdk.js';

// The address of our ERC-20 contract printed out in the step before
const token = sdk.getToken('0x0Ca930033857Da238C4cF518Bb2e58F23d2178b6');

(async () => {
  try {
    // Set 5,000,000 $ULT as max supply
    const amount = 5_000_000;
    // Interact with your deployed ERC-20 contract and mint the token
    await token.mint(amount);
    const totalSupply = await token.totalSupply();

    // Print how many our token out there now
    console.log(
      '✅ There are now',
      totalSupply.displayValue,
      '$ULT 🎟️ ',
      'in circulation'
    );
  } catch (err) {
    console.error('❌ Failed to mint token', err);
  }
})();
