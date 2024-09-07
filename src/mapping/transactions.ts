import { ethereum, log } from "@graphprotocol/graph-ts";
import { Transaction, TransactionReceipt } from "../../generated/schema";

export function handleTransaction(event: ethereum.Event): Transaction {
  let txEntity = Transaction.load(event.transaction.hash);

  if (txEntity == null) {
    txEntity = new Transaction(event.transaction.hash);
    txEntity.id = event.transaction.hash;
    txEntity.hash = event.transaction.hash;
    txEntity.block = event.block.number.toString();
    txEntity.timestamp = event.block.timestamp;
    txEntity.from = event.transaction.from;
    txEntity.to = event.transaction.to;
    txEntity.value = event.transaction.value;
    txEntity.gasPrice = event.transaction.gasPrice;
    txEntity.gasLimit = event.transaction.gasLimit;
    txEntity.nonce = event.transaction.nonce;
    txEntity.inputData = event.transaction.input;
    txEntity.save();
  }
  return txEntity as Transaction;
}

export function handleTransactionReceipt(event: ethereum.Event): void {
  log.info("handleTransactionReceipt: {}", [event.transaction.hash.toString()]);
  let txEntity = TransactionReceipt.load(event.transaction.hash.toString());
  if (txEntity == null) {
    txEntity = new TransactionReceipt(event.transaction.hash.toString());
    txEntity.id = event.transaction.hash.toString();
    // txEntity.status = event?.receipt ? event.receipt.status : null;
    txEntity.transaction = event.transaction.hash;
    txEntity.blockHash = event.block.hash;
    txEntity.blockNumber = event.block.number;
    // txEntity.gasUsed = event.receipt ? event.receipt.gasUsed : null;
    // txEntity.cumulativeGasUsed = event.receipt
    //   ? event.receipt.cumulativeGasUsed
    //   : null;
    // txEntity.logs = event.receipt?.logs.map<Bytes>((log) => log.address)||[];
    // txEntity.contractAddress = event.receipt
    //   ? event.receipt.contractAddress
    //   : null;
    // txEntity.logsBloom = event.receipt ? event.receipt.logsBloom : null;
    // txEntity.root = event.receipt ? event.receipt.root : null;
    txEntity.save();
  }
}
