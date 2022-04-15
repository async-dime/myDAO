import sdk from './1-initialize-sdk.js';

// The MyDAO Ultima ERC-20 Token contract
const token = sdk.getToken('0x0Ca930033857Da238C4cF518Bb2e58F23d2178b6');

(async () => {
  try {
    // Log the current roles
    const allRoles = await token.roles.getAll();

    console.log('ℹ️', ' Roles exists currently:', allRoles);

    // Revoke all the superpowers your wallet had over the ERC-20 contract
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      '🆗',
      ' Roles after revoking all superpowers:',
      await token.roles.getAll()
    );

    console.log('✅ Successfully revoked superpowers from the ERC-20 contract');
  } catch (err) {
    console.error('❌ Failed to revoke role from MyDAO treasury', err);
  }
})();
