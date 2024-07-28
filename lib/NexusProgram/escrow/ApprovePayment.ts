import {
    AnchorProvider,
    BN,
    Program, web3
} from '@project-serum/anchor';
import { NEXUSESCROW_V1, USER_PREFIX } from "../constants/constants";
import { get_userr_info } from './utils.ts/get_userr_info';
const idl = require("../../../data/nexus.json")


export async function approvePayment(
    anchorWallet: any,
    connection: web3.Connection,
    wallet: any,
    escrow: web3.PublicKey,
    reciever: web3.PublicKey,
) {

    const provider = new AnchorProvider(
        connection, anchorWallet, { "preflightCommitment": "processed" },
    );

    const PROGRAM_ID = new web3.PublicKey(idl.metadata.address)
    const program = new Program(idl, idl.metadata.address, provider);

    const [_reciever] = web3.PublicKey.findProgramAddressSync(
        [
            reciever.toBuffer(),
            Buffer.from(USER_PREFIX),
        ],
        PROGRAM_ID
    );

    const [nexusEscrow] = web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from(NEXUSESCROW_V1)
        ],
        PROGRAM_ID
    );


    console.log(escrow.toBase58())

    const tx = await program.methods.approvePayment().accounts({
        escrow: escrow,
        reciever: _reciever,
        recieverAddress: reciever,
        authority: anchorWallet.publicKey,
        nexusEscrow: nexusEscrow,
        systemProgram: web3.SystemProgram.programId
    })
        // .transaction()
        .rpc({
            commitment: "confirmed",
        })

    // wallet.sendTransaction(tx, connection, {
    //     preflightCommitment: "confirmed"
    // })

    return tx;
}