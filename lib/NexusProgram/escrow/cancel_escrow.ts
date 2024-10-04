import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { USER_PREFIX } from '../../constants/constants';
import { backendApi } from '@/lib/utils/api.util';
const idl = require('../../../data/nexus.json');

/**
    deadline: i64,
 */

export async function cancelEscrow(
  anchorWallet: any,
  connection: web3.Connection,
  contact_name: string,
  wallet: any
) {
  const provider = new AnchorProvider(connection, anchorWallet, {
    preflightCommitment: 'processed',
  });

  const PROGRAM_ID = new web3.PublicKey(idl.metadata.address);
  const program = new Program(idl, idl.metadata.address, provider);

  const [founder] = web3.PublicKey.findProgramAddressSync(
    [anchorWallet.publicKey.toBuffer(), Buffer.from(USER_PREFIX)],
    PROGRAM_ID
  );

  const [escrow] = web3.PublicKey.findProgramAddressSync(
    [anchorWallet.publicKey.toBuffer(), Buffer.from(contact_name)],
    PROGRAM_ID
  );

  console.log(escrow.toBase58());

  const tx = await program.methods
    .cancelEscrow()
    .accounts({
      escrow: escrow,
      founder: founder,
      authority: anchorWallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .transaction();
  // .rpc({
  //     commitment: "confirmed",
  // })

  await wallet.sendTransaction(tx, connection, {
    preflightCommitment: 'confirmed',
  });

  const apiResponse = await backendApi.delete(
    `/escrow/cancel/${escrow.toBase58()}`
  );
  //   if(!apiResponse) {console.log('Do something')}

  return tx;
}
