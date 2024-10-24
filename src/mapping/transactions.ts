import {
  Address,
  crypto,
  Bytes,
  ethereum,
  log,
  ByteArray,
  BigInt,
  ValueKind,
  Value,
  json,
  JSONValueKind,
  TypedMap,
  JSONValue,
} from "@graphprotocol/graph-ts";
import {
  DecodedInput,
  Log,
  Transaction,
  TransactionReceipt,
} from "../../generated/schema";
import { handleAccount } from "./accounts";
import { ABI } from "../utils/constants";
import { Method } from "../types/function";
import { ABIParameter } from "../types/abi";

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

const decodeTxInputData = (tx: ethereum.Transaction): Bytes => {
  let methodSelectors = getFunctionSelectors(); // First 4 bytes (8 hex chars)
  let methodSignature = tx.input.toHexString().slice(0, 10);
  let method = tx.input.toHexString().slice(10, 74);
  let params = tx.input.toHexString().slice(74);
  let decodedInputData = DecodedInput.load(tx.hash);
  let input = tx.input.toHexString().slice(10);

  log.info("Method: {} {} {}", [methodSignature, method, params]);

  for (let i = 0; i < methodSelectors.length; i++) {
    log.info("Comparing function signature: {} {} {} {}", [
      methodSignature,
      methodSelectors[i].methodName,
      methodSelectors[i].methodSelector,
      methodSelectors[i].parameters
        .map<string>((param) => param.type)
        .join(","),
    ]);

    if (methodSelectors[i].methodSelector == methodSignature) {
      log.info(
        "method id matched: {} with selector: {}, input data: {} {} {}",
        [
          methodSignature,
          methodSelectors[i].methodSelector,
          input,
          methodSelectors[i].parameters
            .map<string>((param) => param.type)
            .join(","),
          methodSelectors[i].methodName,
        ]
      );
      if (
        methodSelectors[i].parameters
          .map<string>((param) => param.type)
          .includes("uint256[]") ||
        methodSelectors[i].parameters
          .map<string>((param) => param.type)
          .includes("address[]") ||
        methodSelectors[i].parameters
          .map<string>((param) => param.type)
          .includes("bytes") ||
        methodSelectors[i].parameters
          .map<string>((param) => param.type)
          .includes("bytes[]") ||
        methodSelectors[i].parameters
          .map<string>((param) => param.type)
          .includes("bytes32[]")
      ) {
        log.info("dynamic data found: {}", [
          methodSelectors[i].parameters
            .map<string>((param) => param.type)
            .join(","),
        ]);
        input =
          "0000000000000000000000000000000000000000000000000000000000000020" +
          input;
      }
      // let data = txInput.subarray(4); // Extract the rest of the input data
      log.info("Decoding input data: {} for function selector {}", [
        `(${methodSelectors[i].parameters.map<string>((param) => param.type)})`,
        input,
      ]);
      let params = methodSelectors[i].parameters.map<string>(
        (param) => param.name
      );
      let values: string[] = [];
      // Decode the parameters based on the function signature
      let decoded = ethereum.decode(
        `(${methodSelectors[i].parameters.map<string>((param) => param.type)})`,
        Bytes.fromHexString(input)
      );
      if (decoded !== null) {
        values = logDecodedValues(decoded, methodSelectors[i], tx);
      }

      if (decodedInputData == null) {
        decodedInputData = new DecodedInput(tx.hash);
        decodedInputData.id = tx.hash;
        decodedInputData.method = methodSelectors[i].methodName;
        decodedInputData.parameters = params;
        decodedInputData.values = values;
        // decodedInputData.parameters = tx.hash;
        decodedInputData.save();
      }
      return decodedInputData.id;
    }
  }
  if (decodedInputData == null) {
    decodedInputData = new DecodedInput(tx.hash);
    decodedInputData.id = tx.hash;
    decodedInputData.method = methodSignature;
    decodedInputData.save();
    return decodedInputData.id;
  }
  return decodedInputData.id;
};

export function getFunctionSelectors(): Array<Method> {
  let functionSelectors: Array<Method> = [];

  for (let i = 0; i < ABI.length; i++) {
    let methodSignature =
      ABI[i].name +
      "(" +
      ABI[i].parameters
        .map<string>((param: ABIParameter) => param.type)
        .join(",") +
      ")";
    let byteArray = ByteArray.fromUTF8(methodSignature);
    let hash = crypto.keccak256(byteArray);
    let methodSelector = hash.toHexString().slice(0, 10); // Extract the first 4 bytes (8 hex chars)
    functionSelectors.push(
      new Method(
        methodSignature.split("(")[0],
        ABI[i].parameters,
        methodSignature,
        methodSelector
      )
    );
    log.info("Function selector for {}: {} {} {}", [
      methodSignature.split("(")[0],
      methodSignature.split("(")[1].split(")")[0],
      methodSignature,
      methodSelector,
    ]);
  }

  return functionSelectors;
}

function logDecodedValues(
  value: ethereum.Value,
  method: Method,
  tx: ethereum.Transaction
): string[] {
  log.info("methodName methodParams: {} {} ", [
    method.methodName,
    method.parameters
      .map<string>((param: ABIParameter) => param.name)
      .join(","),
  ]);
  // log.info("value: {}", [value.displayData()]);
  let paramTypes = method.parameters.map<string>((param) => param.type);
  log.info(
    `Decoded values: ${paramTypes.map<string>((param: string) => "{}")} `,
    paramTypes
  );
  const tuple = value.toTuple();
  let decodedValues: string[] = [];
  let decodedParams: string[] = [];

  log.info("Tuple: {}", [tuple.length.toString()]);
  for (let i = 0; i < tuple.length; i++) {
    let decodeValue = tuple.at(i);
    log.info("Param type: {}", [paramTypes[i]]);
    // let jsonObject = new TypedMap<string, Value>();

    // Add key-value pairs to the JSON object
    if (paramTypes[i] === "uint256") {
      log.info("Param {} (uint256): {}", [
        method.parameters[i].name,
        decodeValue.toBigInt().toString(),
      ]);
      decodedValues.push(decodeValue.toBigInt().toString());
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "uint64") {
      log.info("Param {} (uint64): {}", [
        method.parameters[i].name,
        decodeValue.toBigInt().toString(),
      ]);

      decodedValues.push(decodeValue.toBigInt().toString());
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "int256") {
      log.info("Param {} (int256): {}", [
        method.parameters[i].name,
        decodeValue.toBigInt().toString(),
      ]);
      decodedValues.push(decodeValue.toBigInt().toString());
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "address") {
      log.info("Param {} (address): {}", [
        method.parameters[i].name,
        decodeValue.toAddress().toHexString(),
      ]);
      decodedValues.push(decodeValue.toAddress().toString());
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "bytes32") {
      log.info("Param {} (bytes32): {}", [
        method.parameters[i].name,
        decodeValue.toBytes().toHexString(),
      ]);
      decodedValues.push(decodeValue.toBytes().toString());
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "bool") {
      log.info("Param {} (bool): {}", [
        method.parameters[i].name,
        decodeValue.toBoolean().toString(),
      ]);
      decodedValues.push(decodeValue.toBoolean().toString());
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "string") {
      log.info("Param {} (string): {}", [
        method.parameters[i].name,
        decodeValue.toString(),
      ]);
      decodedValues.push(decodeValue.toString());
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "bytes") {
      log.info("Param {} (bytes): {}", [
        method.parameters[i].name,
        decodeValue.toBytes().toHexString(),
      ]);
      decodedValues.push(decodeValue.toBytes().toString());
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "uint256[]") {
      log.info("Param {} (uint256[]): {}", [
        method.parameters[i].name,
        decodeValue
          .toBigIntArray()
          .map<string>((value) => value.toString())
          .join(", "),
      ]);
      decodedValues.push(
        decodeValue
          .toBigIntArray()
          .map<string>((value) => value.toString())
          .join(", ")
      );
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "int256[]") {
      log.info("Param {} (int256[]): {}", [
        method.parameters[i].name,
        decodeValue
          .toBigIntArray()
          .map<string>((value) => value.toString())
          .join(", "),
      ]);
      decodedValues.push(
        decodeValue
          .toBigIntArray()
          .map<string>((value) => value.toString())
          .join(", ")
      );
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "address[]") {
      log.info("Param {} (address[]): {}", [
        method.parameters[i].name,
        decodeValue
          .toAddressArray()
          .map<string>((value) => value.toHexString())
          .join(", "),
      ]);
      decodedValues.push(
        decodeValue
          .toAddressArray()
          .map<string>((value) => value.toHexString())
          .join(", ")
      );
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "bool[]") {
      log.info("Param {} (bool[]): {}", [
        method.parameters[i].name,
        decodeValue
          .toBooleanArray()
          .map<string>((value) => value.toString())
          .join(", "),
      ]);
      decodedValues.push(
        decodeValue
          .toBooleanArray()
          .map<string>((value) => value.toString())
          .join(", ")
      );
      decodedParams.push(method.parameters[i].name);
    } else if (paramTypes[i] === "bytes32[]") {
      log.info("Param {} (bytes32[]): {}", [
        method.parameters[i].name,
        decodeValue
          .toBytesArray()
          .map<string>((value) => value.toHexString())
          .join(", "),
      ]);
      decodedValues.push(
        decodeValue
          .toBytesArray()
          .map<string>((value) => value.toHexString())
          .join(", ")
      );
      decodedParams.push(method.parameters[i].name);
    } else if (
      paramTypes[i] === "tuple" &&
      method.parameters[i].components != null
    ) {
      log.info("Param {} (tuple): {}", [
        method.parameters[i].name,
        method.parameters[i].type,
      ]);
      // let tupleParam = param.toTuple();
      // You can recursively log tuple elements by calling this function again
      logDecodedValues(
        decodeValue,
        new Method(
          method.parameters[i].name,
          method.parameters[i].components as ABIParameter[],
          "",
          ""
        ),
        tx
      );
    }
    // let entity = Parameters.load(tx.hash);

    // if (entity == null) {
    //   entity = new Parameters(tx.hash);
    // }
    // log.info("JSON Object: {}", [stringifyMap(jsonObject)]);
    // entity.metadata = stringifyMap(jsonObject);
    // entity.save();
  }
  return decodedValues;
}

function stringifyMap(map: TypedMap<string, Value>): string {
  let result = "{";
  let keys = map.entries;

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i].key;
    let value = stringifyValue(map.get(key) as Value);
    result += `"${key}":${value}`;
    log.info("Key: {} Value: {}", [key, value]);
    if (i < keys.length - 1) {
      result += ",";
    }
  }

  result += "}";
  return result;
}

function stringifyValue(value: Value): string {
  if (value.kind == ValueKind.STRING) {
    return `"${value.toString()}"`;
  } else if (value.kind == ValueKind.INT) {
    return value.toI64().toString();
  } else if (value.kind == ValueKind.BOOL) {
    return value.toBoolean() ? "true" : "false";
  } else if (value.kind == ValueKind.BIGINT) {
    return value.toBigInt().toString();
  } else if (value.kind == ValueKind.ARRAY) {
    let arr = value.toArray();
    let result = "[";
    for (let i = 0; i < arr.length; i++) {
      result += stringifyValue(arr[i]);
      if (i < arr.length - 1) {
        result += ",";
      }
    }
    result += "]";
    return result;
  } else if (value.kind == ValueKind.NULL) {
    return "null";
  }
  return "null";
}

// Helper function to extract tuple types from the parameter string (e.g., tuple(uint256,address) -> uint256,address)
function extractTupleTypes(tupleType: string): string {
  let start = tupleType.indexOf("(") + 1;
  let end = tupleType.lastIndexOf(")");
  return tupleType.substring(start, end);
}
