import sdk from './1-initialize-sdk.js';

// The MyDAO Seer governance contract
const vote = sdk.getVote('0x3C8DAbEd3A001666048CdB296516CB57E569c58D');

// The MyDAO Ultima ERC-20 Token contract
const token = sdk.getToken('0x0Ca930033857Da238C4cF518Bb2e58F23d2178b6');

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed
    await token.roles.grant('minter', vote.getAddress());

    console.log(
      '✅ Successfully gave vote contract permission to act on token contract'
    );
  } catch (err) {
    console.error(
      '❌ Failed to grant vote contract permission on token contract',
      err
    );
    process.exit(1);
  }

  try {
    // Grab the token's balance, remember -- we hold basically all the token supply
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    // Grab 90% the supply that we hold
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = (Number(ownedAmount) / 100) * 90;

    // Transfer 90% of the supply that we hold
    await token.transfer(vote.getAddress(), percent90);

    console.log(
      '✅ Successfully transferred ' +
        percent90 +
        ' $ULT tokens to vote contract'
    );
  } catch (err) {
    console.error('❌ Failed to transfer $ULT tokens to vote contract', err);
  }
})();
