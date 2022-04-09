import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import ethers from 'ethers';

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === '') {
  console.log('🛑 Please set the PRIVATE_KEY environment variable');
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === '') {
  console.log('🛑 Please set the ALCHEMY_API_URL environment variable');
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === '') {
  console.log('🛑 Please set the WALLET_ADDRESS environment variable');
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log('🚧 SDK initialized by address:', address);
  } catch (error) {
    console.error('❌ Failed to get apps from sdk', error);
    process.exit(1);
  }
})();

export default sdk;
