import {
  Address,
  crypto,
  Bytes,
  ethereum,
  log,
  ByteArray,
} from "@graphprotocol/graph-ts";
import {
  DecodedInput,
  Log,
  Transaction,
  TransactionReceipt,
} from "../../generated/schema";
import { handleAccount } from "./accounts";
import * as ABI from "../../abis/QuantumPortalLedgerMgrImplUpgradeable.json";
import { Method } from "../types/function";

export function handleTransaction(event: ethereum.Event): Transaction {
  let txEntity = Transaction.load(event.transaction.hash);

  if (txEntity == null) {
    txEntity = new Transaction(event.transaction.hash);
    txEntity.id = event.transaction.hash;
    txEntity.hash = event.transaction.hash;
    txEntity.block = event.block.number.toString();
    txEntity.timestamp = event.block.timestamp;
    txEntity.from = handleAccount(event.transaction.from);
    if (event.transaction.to !== null) {
      txEntity.to = handleAccount(event.transaction.to as Address);
    } else {
      txEntity.to = null;
    }
    txEntity.decodedInput = decodeTxInputData(event.transaction);
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

const decodeTxInputData = (tx: ethereum.Transaction): Bytes => {
  let functions = getFunctionSelectors(); // First 4 bytes (8 hex chars)
  let methodSelector = tx.input.toHexString().slice(0, 10);
  let method = tx.input.toHexString().slice(10, 74);
  let params = tx.input.toHexString().slice(74);
  let decodedInputData = DecodedInput.load(tx.hash);

  log.info("Method: {} {} {}", [methodSelector, method, params]);

  for (let i = 0; i < functions.length; i++) {
    log.info("Comparing function signature: {} {} {} {}", [
      methodSelector,
      functions[i].methodName,
      functions[i].methodSelector,
      functions[i].methodSignature,
    ]);

    if (functions[i].methodSelector == methodSelector) {
      log.info(
        "method id matched: {} with selector: {}, input data: {} {} {}",
        [
          methodSelector,
          functions[i].methodSelector,
          tx.input.toHexString(),
          functions[i].parameterTypes,
          functions[i].methodName,
        ]
      );
      // let data = txInput.subarray(4); // Extract the rest of the input data
      log.info("Decoding input data: {} for function selector {}", [
        tx.input.toHexString().slice(10),
        `(${functions[i].parameterTypes})`,
      ]);
      // Decode the parameters based on the function signature
      let decoded = ethereum.decode(
        `(${functions[i].parameterTypes})`,
        Bytes.fromHexString(tx.input.toHexString().slice(10))
      );
      if (decoded !== null) {
        logDecodedValues(
          decoded,
          functions[i].parameterTypes,
          functions[i].methodName
        );
        // let tuple = decoded.toTuple();
        // log.info("Tuple: {}", [tuple.toString()]);
        // let param1 = tuple[0].toBigInt(); // uint256
        // let param2 = tuple[1].toBigInt(); // uint256
        // let param3 = tuple[2].toBigIntArray(); // uint256[]
        // let param4 = tuple[3].toBytes(); // bytes32
        // let param5 = tuple[4].toAddressArray(); // address[]
        // let param6 = tuple[5].toBytes(); // bytes32
        // let param7 = tuple[6].toBigInt(); // uint64
        // let param8 = tuple[7].toBytes(); // bytes

        // // Log the decoded values
        // log.info("Param1 (uint256): {}", [param1.toString()]);
        // log.info("Param2 (uint256): {}", [param2.toString()]);
        // log.info("Param3 (uint256[]): {}", [
        //   param3.map<string>((value) => value.toString()).join(", "),
        // ]);
        // log.info("Param4 (bytes32): {}", [param4.toHexString()]);
        // log.info("Param5 (address[]): {}", [
        //   param5.map<string>((value) => value.toHexString()).join(", "),
        // ]);
        // log.info("Param6 (bytes32): {}", [param6.toHexString()]);
        // log.info("Param7 (uint64): {}", [param7.toString()]);
        // log.info("Param8 (bytes): {}", [param8.toHexString()]);
      }

      if (decodedInputData == null) {
        decodedInputData = new DecodedInput(tx.hash);
        decodedInputData.id = tx.hash;
        decodedInputData.method = functions[i].methodName;
        // decodedInputData.methodId = functions[i].methodId;
        // decodedInputData.methodString = functions[i].methodString;
        // decodedInputData.methodParams = functions[i].methodParamsString;
        decodedInputData.save();
      }
      return decodedInputData.id;
    }
  }
  if (decodedInputData == null) {
    decodedInputData = new DecodedInput(tx.hash);
    decodedInputData.id = tx.hash;
    decodedInputData.method = methodSelector;
    decodedInputData.save();
    return decodedInputData.id;
  }
  return decodedInputData.id;
};

export function getFunctionSelectors(): Array<Method> {
  let functionSelectors: Array<Method> = [];

  if (ABI != null) {
    for (let i = 0; i < ABI.length; i++) {
      // Only process items with type "function"
      if (ABI[i].type == "function") {
        let methodName = ABI[i].name;
        let parameterTypes: string = "";

        // Check if the function has inputs
        if (ABI[i].inputs && ABI[i].inputs.length > 0) {
          parameterTypes = ABI[i].inputs
            .map((input) => input.internalType)
            .join(",");
        }

        // Construct method signature
        let methodSignature = ABI[i].name + "(" + parameterTypes + ")";

        // Hash the method signature to get the method selector
        let byteArray = ByteArray.fromUTF8(methodSignature);
        let hash = crypto.keccak256(byteArray);
        let methodSelector = hash.toHexString().slice(0, 10); // First 4 bytes (8 hex characters)

        // Push the Method object to the functionSelectors array
        functionSelectors.push(
          new Method(
            methodName!,
            parameterTypes,
            methodSignature,
            methodSelector
          )
        );

        // Log the information (optional)
        log.info("Function selector for {}: {} {} {}", [
          methodName!,
          parameterTypes,
          methodSignature,
          methodSelector,
        ]);
      }
    }
    return functionSelectors;
  } else {
    log.warning("ABI is null", []);
    return [];
  }
}

function logDecodedValues(
  value: ethereum.Value,
  methodParams: string,
  methodName: string
): void {
  log.info("methodName methodParams: {}", [methodName, methodParams]);
  let paramTypes = methodParams.split(",");
  log.info("Decoded values: {} ", paramTypes);
  const tuple = value.toTuple();
  if (methodName == "finalize") {
    let param1 = tuple[0].toBigInt(); // uint256
    let param2 = tuple[1].toBigInt(); // uint256
    let param3 = tuple[2].toBigIntArray(); // uint256[]
    let param4 = tuple[3].toBytes(); // bytes32
    let param5 = tuple[4].toAddressArray(); // address[]
    let param6 = tuple[5].toBytes(); // bytes32
    let param7 = tuple[6].toBigInt(); // uint64 (interpreted as BigInt in AssemblyScript)
    let param8 = tuple[7].toBytes(); // bytes

    // Log the decoded values
    log.info("Param 1 (uint256): {}", [param1.toString()]);
    log.info("Param 2 (uint256): {}", [param2.toString()]);
    log.info("Param 3 (uint256[]): {}", [
      param3.map<string>((value) => value.toString()).join(", "),
    ]);
    log.info("Param 4 (bytes32): {}", [param4.toHexString()]);
    log.info("Param 5 (address[]): {}", [
      param5.map<string>((value) => value.toHexString()).join(", "),
    ]);
    log.info("Param 6 (bytes32): {}", [param6.toHexString()]);
    log.info("Param 7 (uint64): {}", [param7.toString()]);
    log.info("Param 8 (bytes): {}", [param8.toHexString()]);
  } else {
    log.warning("Failed to decode transaction input", []);
  }
  // log.info("Tuple: {}", [tuple.toString()]);
  for (let i = 0; i < tuple.length; i++) {
    let param = tuple[i];
    log.info("Param type: {}", [paramTypes[i]]);

    if (paramTypes[i] == "uint256") {
      log.info("Param {} (uint256): {}", [
        i.toString(),
        param.toBigInt().toString(),
      ]);
    } else if (paramTypes[i] == "uint64") {
      log.info("Param {} (uint64): {}", [
        i.toString(),
        param.toBigInt().toString(),
      ]);
    } else if (paramTypes[i] == "int256") {
      log.info("Param {} (int256): {}", [
        i.toString(),
        param.toBigInt().toString(),
      ]);
    } else if (paramTypes[i] == "address") {
      log.info("Param {} (address): {}", [
        i.toString(),
        param.toAddress().toHexString(),
      ]);
    } else if (paramTypes[i] == "bytes32") {
      log.info("Param {} (bytes32): {}", [
        i.toString(),
        param.toBytes().toHexString(),
      ]);
    } else if (paramTypes[i] == "bool") {
      log.info("Param {} (bool): {}", [
        i.toString(),
        param.toBoolean().toString(),
      ]);
    } else if (paramTypes[i] == "string") {
      log.info("Param {} (string): {}", [i.toString(), param.toString()]);
    } else if (paramTypes[i] == "bytes") {
      log.info("Param {} (bytes): {}", [
        i.toString(),
        param.toBytes().toHexString(),
      ]);
    } else if (paramTypes[i] == "uint256[]") {
      log.info("Param {} (uint256[]): {}", [
        i.toString(),
        param
          .toBigIntArray()
          .map<string>((value) => value.toString())
          .join(", "),
      ]);
    } else if (paramTypes[i] == "int256[]") {
      log.info("Param {} (int256[]): {}", [
        i.toString(),
        param
          .toBigIntArray()
          .map<string>((value) => value.toString())
          .join(", "),
      ]);
    } else if (paramTypes[i] == "address[]") {
      log.info("Param {} (address[]): {}", [
        i.toString(),
        param
          .toAddressArray()
          .map<string>((value) => value.toHexString())
          .join(", "),
      ]);
    } else if (paramTypes[i] == "bool[]") {
      log.info("Param {} (bool[]): {}", [
        i.toString(),
        param
          .toBooleanArray()
          .map<string>((value) => value.toString())
          .join(", "),
      ]);
    } else if (paramTypes[i] == "bytes32[]") {
      log.info("Param {} (bytes32[]): {}", [
        i.toString(),
        param
          .toBytesArray()
          .map<string>((value) => value.toHexString())
          .join(", "),
      ]);
    } else if (paramTypes[i].startsWith("tuple")) {
      log.info("Param {} (tuple): {}", [i.toString()]);
      // let tupleParam = param.toTuple();
      // You can recursively log tuple elements by calling this function again
      logDecodedValues(param, extractTupleTypes(paramTypes[i]), methodName);
    }
    // Handle more types as needed
  }
}

// Helper function to extract tuple types from the parameter string (e.g., tuple(uint256,address) -> uint256,address)
function extractTupleTypes(tupleType: string): string {
  let start = tupleType.indexOf("(") + 1;
  let end = tupleType.lastIndexOf(")");
  return tupleType.substring(start, end);
}
