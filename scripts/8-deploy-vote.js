import sdk from './1-initialize-sdk.js';

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      // Governance contract name
      name: 'MyDAO Seer',

      // Location of governance token, the $ULT ERC-20 contract
      voting_token_address: '0x0Ca930033857Da238C4cF518Bb2e58F23d2178b6',

      // These parameters are specified in number of blocks
      // Assuming block time of around 13.14 seconds (ethereum)

      // After proposal is created, when member start to vote?
      // For now we set to immediately
      voting_delay_in_blocks: 0,

      // How long members have to vote on a proposal when it's created?
      // because 1 blocks every 13 seconds, will set 1 day = 6570 blocks
      voting_period_in_blocks: 6570,

      // The minimum % of the total $ULT supply that need to vote for
      // the proposal to be valid after the time for the proposal has ended
      voting_quorum_fraction: 0,

      // The minimum # of $ULT tokens a user needs to be allowed to create proposal
      // If set to 0, no tokens required for a user to be allowed to create a proposal
      proposal_token_threshold: 0,
    });

    console.log(
      '✅ Successfully deployed MyDAO',
      ' 👁️ ',
      'Seer governance contract, address:',
      voteContractAddress
    );
  } catch (err) {
    console.error('❌ Failed to deploy MyDAO 👁️ Seer governance contract', err);
  }
})();
