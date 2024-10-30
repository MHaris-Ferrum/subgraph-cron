import {
  Address,
  crypto,
  Bytes,
  ethereum,
  log,
  ByteArray,
  BigInt,
  TypedMap,
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
  log.info("handleTransactionReceipt: {}", [
    event.transaction.hash.toHexString(),
  ]);
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
    log.info("Comparing function signature: {} {} {} {} {} {} {}", [
      tx.hash.toHexString(),
      tx.input.toHexString(),
      methodSignature,
      methodSelectors[i].methodName,
      methodSelectors[i].methodSignature,
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
      log.info(
        "Decoding input data: {} for function selector {} and tx input {}",
        [
          methodSelectors[i].methodSignature.replace(
            methodSelectors[i].methodName,
            ""
          ),
          input,
          tx.input.toHexString(),
        ]
      );
      let params = methodSelectors[i].parameters.map<string>(
        (param) => param.name
      );
      let paramsTypes = methodSelectors[i].parameters.map<string>(
        (param) => param.type
      );
      let values: string[] = [];
      // Decode the parameters based on the function signature
      let decoded = ethereum.decode(
        methodSelectors[i].methodSignature.replace(
          methodSelectors[i].methodName,
          ""
        ),
        Bytes.fromHexString(input)
      );
      if (decoded !== null) {
        values = storeDecodedValues(decoded, methodSelectors[i], tx);
      }

      if (decodedInputData == null) {
        decodedInputData = new DecodedInput(tx.hash);
        decodedInputData.id = tx.hash;
        decodedInputData.method = methodSelectors[i].methodName;
        decodedInputData.parameters = params;
        decodedInputData.parametersTypes = paramsTypes;
        decodedInputData.parametersValues = values;
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
        .map<string>((param: ABIParameter) => {
          log.info("Method Signature Param type: {}", [param.type]);
          if (
            param.type.startsWith("tuple") &&
            param.components !== null &&
            Array.isArray(param.components)
          ) {
            log.info("Method Signature Param tuple type: {}", [param.type]);
            const components = param.components as ABIParameter[];
            if (param.type.startsWith("tuple[]")) {
              log.info("Method Signature component tuple type 1: {}", [
                `(${components
                  .map<string>((component: ABIParameter) => component.type)
                  .join(",")})[]`,
              ]);
              return `(${components
                .map<string>((component: ABIParameter) => component.type)
                .join(",")})[]`;
            } else if (param.type.startsWith("tuple")) {
              log.info("Method Signature component tuple type 2: {}", [
                `(${components
                  .map<string>((component: ABIParameter) => component.type)
                  .join(",")})`,
              ]);
              return `(${components
                .map<string>((component: ABIParameter) => component.type)
                .join(",")})`;
            } else {
              return param.type;
            }
          } else {
            return param.type;
          }
        })
        .join(",") +
      ")";
    log.info("Method Signature: {}", [methodSignature]);
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

function storeDecodedValues(
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
  let decodedValues: string[] = [];
  let decodedParams: string[] = [];
  log.info(`MethodName Decoded values: {} {} {} {}`, [
    tx.hash.toHexString(),
    method.methodName,
    method.parameters.map<string>((param) => param.type).join(","),
    tx.input.toHexString(),
  ]);

  log.info("decode value type: {}", [value.kind.toString()]);
  const tuple = value.toTuple();

  log.info("MethodName Tuple: {} {}", [
    method.methodName,
    tuple.length.toString(),
  ]);

  for (let i = 0; i < tuple.length; i++) {
    let decodeValue = tuple.at(i);
    log.info("ParamVar type: {}", [paramTypes[i]]);
    log.info("ParamVar kind: {} {}", [
      decodeValue.kind.toString(),
      paramTypes[i],
    ]);
    // let jsonObject = new TypedMap<string, Value>();
    const data = typeCheckAndConversion(
      decodeValue,
      method.parameters[i],
      paramTypes[i]
    );
    decodedParams.push(method.parameters[i].name);
    if (data !== null) {
      decodedValues.push(data);
    } else {
      decodedValues.push("null");
    }
  }
  return decodedValues;
}

// Function to serialize an arbitrary key-value map to a JSON-like string
function serializeMapToString(map: TypedMap<string, string>): string {
  let result = "{";
  let entries = map.entries;

  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    result += `"${entry.key}": "${entry.value}"`;
    if (i < entries.length - 1) result += ", ";
  }

  result += "}";
  return result;
}

function typeCheckAndConversion(
  value: ethereum.Value,
  param: ABIParameter,
  paramType: string
): string | null {
  log.info("Value Kind: {} {}", [value.kind.toString(), paramType]);

  if (paramType === "uint256") {
    log.info("Parameters {} (uint256): {}", [
      param.name,
      value.toBigInt().toString(),
    ]);
    return value.toBigInt().toString();
  } else if (paramType === "uint64") {
    log.info("Parameters {} (uint64): {}", [
      param.name,
      value.toBigInt().toString(),
    ]);

    return value.toBigInt().toString();
  } else if (paramType === "int256") {
    log.info("Parameters {} (int256): {}", [
      param.name,
      value.toBigInt().toString(),
    ]);
    return value.toBigInt().toString();
  } else if (paramType === "address") {
    log.info("Parameters {} (address): {}", [
      param.name,
      value.toAddress().toHexString(),
    ]);
    return value.toAddress().toHexString();
  } else if (paramType === "bytes32") {
    log.info("Parameters {} (bytes32): {}", [
      param.name,
      value.toBytes().toHexString(),
    ]);
    return value.toBytes().toHexString();
  } else if (paramType === "bool") {
    log.info("Parameters {} (bool): {}", [
      param.name,
      value.toBoolean().toString(),
    ]);
    return value.toBoolean().toString();
  } else if (paramType === "string") {
    log.info("Parameters {} (string): {}", [param.name, value.toString()]);
    return value.toString();
  } else if (paramType === "bytes") {
    log.info("Parameters {} (bytes): {}", [
      param.name,
      value.toBytes().toHexString(),
    ]);
    return value.toBytes().toHexString();
  } else if (paramType === "uint256[]") {
    log.info("Parameters {} (uint256[]): {}", [
      param.name,
      `${value.toBigIntArray()}`,
    ]);
    return `${value.toBigIntArray()}`;
  } else if (paramType === "int256[]") {
    log.info("Parameters {} (int256[]): {}", [
      param.name,
      `${value.toBigIntArray()}`,
    ]);
    return `${value.toBigIntArray()}`;
  } else if (paramType === "address[]") {
    log.info("Parameters {} (address[]): {}", [
      param.name,
      `${value.toAddressArray().map<string>((value) => value.toHexString())}`,
    ]);
    return `${value
      .toAddressArray()
      .map<string>((value) => value.toHexString())}`;
  } else if (paramType === "bool[]") {
    log.info("Parameters {} (bool[]): {}", [
      param.name,
      `${value.toBooleanArray()}`,
    ]);
    return `${value.toBooleanArray()}`;
  } else if (paramType === "bytes32[]" || paramType === "bytes[]") {
    log.info("Parameters {} (bytes32[]): {}", [
      param.name,
      `${value.toBytesArray().map<string>((value) => value.toHexString())}`,
    ]);
    return `[${value
      .toBytesArray()
      .map<string>((value) => value.toHexString())}]`;
  } else if (paramType === "tuple") {
    let tuple = value.toTuple();
    let dataMap = new TypedMap<string, string>();
    for (let i = 0; i < tuple.length; i++) {
      log.info("TupleValue: {}", [tuple.length.toString()]);
      let data = typeCheckAndConversion(
        tuple.at(i),
        param.components![i] as ABIParameter,
        param.components![i].type
      );
      dataMap.set(param.components![i].name, data !== null ? data : "null");
    }
    return serializeMapToString(dataMap);
  } else if (paramType === "tuple[]") {
    let tupleArray = value.toArray();
    const tupleArrayData: Array<string> = [];
    for (let i = 0; i < tupleArray.length; i++) {
      const tuple = tupleArray[i].toTuple();
      log.info("TupleLength: {}", [tuple.length.toString()]);
      // const tupleData: Array<string> = [];
      let dataMap = new TypedMap<string, string>();
      for (let j = 0; j < tuple.length; j++) {
        log.info("InnerTupleKind: {}", [tuple.at(j).kind.toString()]);
        let data = typeCheckAndConversion(
          tuple.at(j),
          param.components![j] as ABIParameter,
          param.components![j].type
        );
        dataMap.set(param.components![j].name, data !== null ? data : "null");
      }
      log.info("serializeMapToString: {}", [serializeMapToString(dataMap)]);
      tupleArrayData.push(serializeMapToString(dataMap));
    }
    return `[${tupleArrayData}]`;
  }
  return null;
}
