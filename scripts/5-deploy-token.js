import { AddressZero } from '@ethersproject/constants';
import sdk from './1-initialize-sdk.js';

(async () => {
  try {
    // Deploy a standard ERC-20 contract
    const tokenAddress = await sdk.deployer.deployToken({
      // Token name
      name: 'MyDAO Ultima Token',
      // Token symbol
      symbol: 'ULT',
      // This will be in case we want to sell our token,
      // because we don't want to sell our token, we can set this to AddressZero
      primary_sale_recipient: AddressZero,
    });
    console.log(
      '✅ Successfully deployed token module, address:',
      tokenAddress
    );
  } catch (error) {
    console.error('❌ Failed to deploy token module', error);
  }
})();
