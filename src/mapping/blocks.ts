import { ethereum, log } from "@graphprotocol/graph-ts";
import { Block } from "../../generated/schema";

export function handleBlock(event: ethereum.Event): Block {
  log.info("handleBlock: {}", [event.block.number.toString()]);
  let blockEntity = Block.load(event.block.number.toString());
  if (blockEntity == null) {
    blockEntity = new Block(event.block.number.toString());
    blockEntity.id = event.block.number.toString();
    blockEntity.number = event.block.number;
    blockEntity.hash = event.block.hash;
    blockEntity.parentHash = event.block.parentHash;
    blockEntity.author = event.block.author;
    blockEntity.difficulty = event.block.difficulty;
    blockEntity.totalDifficulty = event.block.totalDifficulty;
    blockEntity.gasUsed = event.block.gasUsed;
    blockEntity.gasLimit = event.block.gasLimit;
    blockEntity.receiptsRoot = event.block.receiptsRoot;
    blockEntity.transactionsRoot = event.block.transactionsRoot;
    blockEntity.stateRoot = event.block.stateRoot;
    blockEntity.size = event.block.size;
    blockEntity.baseFeePerGas = event.block.baseFeePerGas;
    blockEntity.unclesHash = event.block.unclesHash;
    blockEntity.timestamp = event.block.timestamp;
    blockEntity.save();
  }
  return blockEntity;
}
