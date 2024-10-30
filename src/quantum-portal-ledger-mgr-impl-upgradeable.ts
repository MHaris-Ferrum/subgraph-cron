import { Address, Bytes } from "@graphprotocol/graph-ts";
import {
  AdminSet as AdminSetEvent,
  FinalizedBlock as FinalizedBlockEvent,
  FinalizedInvalidBlock as FinalizedInvalidBlockEvent,
  FinalizedSnapshot as FinalizedSnapshotEvent,
  Initialized as InitializedEvent,
  LocalBlockCreated as LocalBlockCreatedEvent,
  MinedBlockCreated as MinedBlockCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RemoteTransactionRegistered as RemoteTransactionRegisteredEvent,
  Upgraded as UpgradedEvent,
} from "../generated/QuantumPortalLedgerMgrImplUpgradeable/QuantumPortalLedgerMgrImplUpgradeable";
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
} from "../generated/schema";
import {
  handleBlock,
  handleTransaction,
  handleTransactionReceipt,
} from "./mapping";

export function handleAdminSet(event: AdminSetEvent): void {
  let entity = new AdminSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.admin = event.params.admin;

  // handleBlock(event);
  // handleTransaction(event);
  // handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFinalizedBlock(event: FinalizedBlockEvent): void {
  let entity = new FinalizedBlock(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.remoteChainId = event.params.remoteChainId;
  entity.blockNonce = event.params.blockNonce;
  entity.timestamp = event.params.timestamp;

  handleBlock(event);
  handleTransaction(event);
  handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFinalizedInvalidBlock(
  event: FinalizedInvalidBlockEvent
): void {
  let entity = new FinalizedInvalidBlock(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.remoteChainId = event.params.remoteChainId;
  entity.blockNonce = event.params.blockNonce;
  entity.timestamp = event.params.timestamp;

  handleBlock(event);
  handleTransaction(event);
  handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFinalizedSnapshot(event: FinalizedSnapshotEvent): void {
  let entity = new FinalizedSnapshot(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.remoteChainId = event.params.remoteChainId;
  entity.startBlockNonce = event.params.startBlockNonce;
  entity.endBlockNonce = event.params.endBlockNonce;
  entity.finalizers = event.params.finalizers.map<Bytes>(
    (finalizer: Address) =>
      Bytes.fromHexString(finalizer.toHexString()) as Bytes
  );

  handleBlock(event);
  handleTransaction(event);
  handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.version = event.params.version;

  handleBlock(event);
  handleTransaction(event);
  handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleLocalBlockCreated(event: LocalBlockCreatedEvent): void {
  let entity = new LocalBlockCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.remoteChainId = event.params.remoteChainId;
  entity.nonce = event.params.nonce;
  entity.timestamp = event.params.timestamp;

  // handleBlock(event);
  // handleTransaction(event);
  // handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMinedBlockCreated(event: MinedBlockCreatedEvent): void {
  let entity = new MinedBlockCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.blockHash = event.params.blockHash;
  entity.miner = event.params.miner;
  entity.stake = event.params.stake;
  entity.totalValue = event.params.totalValue;
  entity.blockMetadata_chainId = event.params.blockMetadata.chainId;
  entity.blockMetadata_nonce = event.params.blockMetadata.nonce;
  entity.blockMetadata_timestamp = event.params.blockMetadata.timestamp;

  handleBlock(event);
  handleTransaction(event);
  handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  handleBlock(event);
  handleTransaction(event);
  handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRemoteTransactionRegistered(
  event: RemoteTransactionRegisteredEvent
): void {
  let entity = new RemoteTransactionRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.timestamp = event.params.timestamp;
  entity.remoteContract = event.params.remoteContract;
  entity.sourceMsgSender = event.params.sourceMsgSender;
  entity.sourceBeneficiary = event.params.sourceBeneficiary;
  entity.token = event.params.token;
  entity.amount = event.params.amount;
  entity.method = event.params.method;
  entity.gas = event.params.gas;
  entity.fixedFee = event.params.fixedFee;

  handleBlock(event);
  handleTransaction(event);
  handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.implementation = event.params.implementation;

  handleBlock(event);
  handleTransaction(event);
  handleTransactionReceipt(event);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
