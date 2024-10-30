import { log, newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  AdminSet,
  FinalizedBlock,
  FinalizedInvalidBlock,
  FinalizedSnapshot,
  Initialized,
  LocalBlockCreated,
  MinedBlockCreated,
  OwnershipTransferred,
  RemoteTransactionRegistered,
  Upgraded,
} from "../generated/QuantumPortalLedgerMgrImplUpgradeable/QuantumPortalLedgerMgrImplUpgradeable";

export function createAdminSetEvent(admin: Address): AdminSet {
  let adminSetEvent = changetype<AdminSet>(newMockEvent());

  adminSetEvent.parameters = new Array();

  adminSetEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  );

  return adminSetEvent;
}

export function createFinalizedBlockEvent(
  remoteChainId: BigInt,
  blockNonce: BigInt,
  timestamp: BigInt
): FinalizedBlock {
  let finalizedBlockEvent = changetype<FinalizedBlock>(newMockEvent());

  finalizedBlockEvent.parameters = new Array();

  finalizedBlockEvent.parameters.push(
    new ethereum.EventParam(
      "remoteChainId",
      ethereum.Value.fromUnsignedBigInt(remoteChainId)
    )
  );
  finalizedBlockEvent.parameters.push(
    new ethereum.EventParam(
      "blockNonce",
      ethereum.Value.fromUnsignedBigInt(blockNonce)
    )
  );
  finalizedBlockEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  );

  return finalizedBlockEvent;
}

export function createFinalizedInvalidBlockEvent(
  remoteChainId: BigInt,
  blockNonce: BigInt,
  timestamp: BigInt
): FinalizedInvalidBlock {
  let finalizedInvalidBlockEvent = changetype<FinalizedInvalidBlock>(
    newMockEvent()
  );

  finalizedInvalidBlockEvent.parameters = new Array();

  finalizedInvalidBlockEvent.parameters.push(
    new ethereum.EventParam(
      "remoteChainId",
      ethereum.Value.fromUnsignedBigInt(remoteChainId)
    )
  );
  finalizedInvalidBlockEvent.parameters.push(
    new ethereum.EventParam(
      "blockNonce",
      ethereum.Value.fromUnsignedBigInt(blockNonce)
    )
  );
  finalizedInvalidBlockEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  );

  return finalizedInvalidBlockEvent;
}

export function createFinalizedSnapshotEvent(
  remoteChainId: BigInt,
  startBlockNonce: BigInt,
  endBlockNonce: BigInt,
  finalizers: Array<Address>
): FinalizedSnapshot {
  let finalizedSnapshotEvent = changetype<FinalizedSnapshot>(newMockEvent());

  finalizedSnapshotEvent.parameters = new Array();

  finalizedSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "remoteChainId",
      ethereum.Value.fromUnsignedBigInt(remoteChainId)
    )
  );
  finalizedSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "startBlockNonce",
      ethereum.Value.fromUnsignedBigInt(startBlockNonce)
    )
  );
  finalizedSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "endBlockNonce",
      ethereum.Value.fromUnsignedBigInt(endBlockNonce)
    )
  );
  finalizedSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "finalizers",
      ethereum.Value.fromAddressArray(finalizers)
    )
  );

  return finalizedSnapshotEvent;
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent());

  initializedEvent.parameters = new Array();

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  );

  return initializedEvent;
}

export function createLocalBlockCreatedEvent(
  remoteChainId: BigInt,
  nonce: BigInt,
  timestamp: BigInt
): LocalBlockCreated {
  let localBlockCreatedEvent = changetype<LocalBlockCreated>(newMockEvent());

  localBlockCreatedEvent.parameters = new Array();

  localBlockCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "remoteChainId",
      ethereum.Value.fromUnsignedBigInt(remoteChainId)
    )
  );
  localBlockCreatedEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  );
  localBlockCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  );

  return localBlockCreatedEvent;
}

export function createMinedBlockCreatedEvent(
  blockHash: Bytes,
  miner: Address,
  stake: BigInt,
  totalValue: BigInt,
  blockMetadata: ethereum.Tuple
): MinedBlockCreated {
  let minedBlockCreatedEvent = changetype<MinedBlockCreated>(newMockEvent());

  minedBlockCreatedEvent.parameters = new Array();

  minedBlockCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "blockHash",
      ethereum.Value.fromFixedBytes(blockHash)
    )
  );
  minedBlockCreatedEvent.parameters.push(
    new ethereum.EventParam("miner", ethereum.Value.fromAddress(miner))
  );
  minedBlockCreatedEvent.parameters.push(
    new ethereum.EventParam("stake", ethereum.Value.fromUnsignedBigInt(stake))
  );
  minedBlockCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalValue",
      ethereum.Value.fromUnsignedBigInt(totalValue)
    )
  );
  minedBlockCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "blockMetadata",
      ethereum.Value.fromTuple(blockMetadata)
    )
  );

  return minedBlockCreatedEvent;
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  );

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  );

  return ownershipTransferredEvent;
}

export function createRemoteTransactionRegisteredEvent(
  timestamp: BigInt,
  remoteContract: Address,
  sourceMsgSender: Address,
  sourceBeneficiary: Address,
  token: Address,
  amount: BigInt,
  method: Bytes,
  gas: BigInt,
  fixedFee: BigInt
): RemoteTransactionRegistered {
  let remoteTransactionRegisteredEvent =
    changetype<RemoteTransactionRegistered>(newMockEvent());

  remoteTransactionRegisteredEvent.parameters = new Array();

  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  );
  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "remoteContract",
      ethereum.Value.fromAddress(remoteContract)
    )
  );
  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "sourceMsgSender",
      ethereum.Value.fromAddress(sourceMsgSender)
    )
  );
  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "sourceBeneficiary",
      ethereum.Value.fromAddress(sourceBeneficiary)
    )
  );
  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  );
  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );
  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam("method", ethereum.Value.fromBytes(method))
  );
  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam("gas", ethereum.Value.fromUnsignedBigInt(gas))
  );
  remoteTransactionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "fixedFee",
      ethereum.Value.fromUnsignedBigInt(fixedFee)
    )
  );

  return remoteTransactionRegisteredEvent;
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent());

  upgradedEvent.parameters = new Array();

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  );

  return upgradedEvent;
}

export function decodeMineBlockTransactionInput(
  input: string
): ethereum.Value | null {
  let mineBlockTransactionInput = input;
  let decoded = ethereum.decode(
    "(uint64,uint64,(uint64,address,address,address,address,uint256,bytes[],uint256,uint256)[],bytes32,uint64,bytes)",
    Bytes.fromHexString(mineBlockTransactionInput)
  );
  if (decoded !== null) {
    // const tuple = decoded.toTuple();
    return decoded;
  }
  return null;
}
