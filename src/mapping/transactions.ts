import { Bytes, ethereum, log } from "@graphprotocol/graph-ts";
import { Log, Transaction, TransactionReceipt } from "../../generated/schema";

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
  let txEntity = TransactionReceipt.load(event.transaction.hash);
  if (txEntity == null) {
    txEntity = new TransactionReceipt(event.transaction.hash);
    txEntity.id = event.transaction.hash;
    let receipt = event.receipt as ethereum.TransactionReceipt | null;
    if (receipt !== null && receipt.logs !== null && receipt.logs.length) {
      txEntity.logs = handleTransactionLog(receipt.logs);
      txEntity.status = receipt.status;
      txEntity.gasUsed = receipt.gasUsed;
      txEntity.cumulativeGasUsed = receipt.cumulativeGasUsed;
      txEntity.contractAddress = receipt.contractAddress;
      txEntity.logsBloom = receipt.logsBloom;
      txEntity.root = receipt.root;
    }
    txEntity.transaction = event.transaction.hash;
    txEntity.blockHash = event.block.hash;
    txEntity.blockNumber = event.block.number;

    txEntity.save();
  }
}

export function handleTransactionLog(receiptLogs: ethereum.Log[]): Bytes[] {
  let Logs: Bytes[] = [];
  for (let i = 0; i < receiptLogs.length; i++) {
    let receiptLog = receiptLogs[i];
    let id = receiptLog.transactionHash.concatI32(receiptLog.logIndex.toI32());

    log.info("handleTransactionLogs: {}", [id.toHexString()]);

    let logEntity = Log.load(id);
    if (logEntity == null) {
      logEntity = new Log(id);
      logEntity.id = id;
      logEntity.transactionReceipt = receiptLog.transactionHash;
      logEntity.transactionHash = receiptLog.transactionHash;
      logEntity.blockNumber = receiptLog.blockNumber;
      logEntity.blockHash = receiptLog.blockHash;
      logEntity.address = receiptLog.address;
      logEntity.data = receiptLog.data;
      logEntity.topics = receiptLog.topics;
      logEntity.logIndex = receiptLog.logIndex;
      logEntity.transactionLogIndex = receiptLog.transactionLogIndex;
      logEntity.logType = receiptLog.logType;
      // logEntity.removed = receiptLog.removed ?? false;
      logEntity.save();
    }
    Logs.push(id);
  }
  return Logs;
}

// const decodeTxInputData = (tx: ethereum.Transaction) => {
//   let data = tx.input;
//   let signature = data.slice(0, 10);
//   let method = data.slice(10, 74);
//   let params = data.slice(74);
//   return { signature, method, params };
// };
