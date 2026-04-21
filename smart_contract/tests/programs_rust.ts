import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AccessMarketplace } from "../target/types/access_marketplace";
import { expect } from "chai";

describe("access_marketplace", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .AccessMarketplace as Program<AccessMarketplace>;
  const provider = anchor.getProvider() as anchor.AnchorProvider;

  const owner = provider.wallet.publicKey;
  const platformWallet = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const [platformState] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("platform")],
      program.programId,
    );

    await program.methods
      .initialize(5)
      .accountsPartial({
        platformState,
        platformWallet: platformWallet.publicKey,
        owner,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const state = await program.account.platformState.fetch(platformState);
    expect(state.feePercent).to.equal(5);
    expect(state.platformWallet.toString()).to.equal(
      platformWallet.publicKey.toString(),
    );
  });
});
