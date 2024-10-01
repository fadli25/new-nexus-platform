import {
    AnchorProvider,
    Program, web3
} from '@project-serum/anchor';
const idl = require("../../../data/nexus.json")


export async function disputeReject(
    anchorWallet: any,
    connection: web3.Connection,
    wallet: any,
    escrow: web3.PublicKey,
) {

    const provider = new AnchorProvider(
        connection, anchorWallet, { "preflightCommitment": "processed" },
    );

    const program = new Program(idl, idl.metadata.address, provider);

    console.log(escrow.toBase58())

    const tx = await program.methods.disputeReject().accounts({
        escrow: escrow,
        authority: anchorWallet.publicKey,
        systemProgram: web3.SystemProgram.programId
    })
        .transaction()
    // .rpc({
    //     commitment: "confirmed",
    // })

    const blockhash = (await connection.getLatestBlockhash()).blockhash
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet.publicKey;

    const signTx = await wallet.signTransaction(tx);

    const hash = await connection.sendRawTransaction(signTx.serialize());
    // sendTransaction(tx, connection, {
    //     preflightCommitment: "confirmed"
    // })
    console.log(hash);
    return tx;
}