import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes, ethereum, log } from "@graphprotocol/graph-ts";
import { AdminSet } from "../generated/schema";
import { AdminSet as AdminSetEvent } from "../generated/QuantumPortalLedgerMgrImplUpgradeable/QuantumPortalLedgerMgrImplUpgradeable";
import { handleAdminSet } from "../src/quantum-portal-ledger-mgr-impl-upgradeable";
import {
  createAdminSetEvent,
  decodeMineBlockTransactionInput,
} from "./quantum-portal-ledger-mgr-impl-upgradeable-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    // let admin = Address.fromString(
    //   "0x0000000000000000000000000000000000000001"
    // );
    // let newAdminSetEvent = createAdminSetEvent(admin);
    // handleAdminSet(newAdminSetEvent);
    // ADDRESS = 0,
    // FIXED_BYTES = 1,
    // BYTES = 2,
    // INT = 3,
    // UINT = 4,
    // BOOL = 5,
    // STRING = 6,
    // FIXED_ARRAY = 7,
    // ARRAY = 8,
    // TUPLE = 9,
    let value = decodeMineBlockTransactionInput(
      "000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000065f4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000c07552be5e9eef82fad85a0c0812af124cf1f2605ecd05d99502cda86b123fbb810000000000000000000000000000000000000000000000000000000066e8b58500000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000066e2ec3000000000000000000000000026cd4eebf9113adde23b658f676aeed9e73457e90000000000000000000000005203980f67dab1583d89780012b0adf698c450c900000000000000000000000093069da82b264e94068aa991b88b3478cf0861be0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004d22f33ca0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000605d9aef2a800c4563071a5386771eb63a0a90a2106cf1d36cff30e984dfdf3ed614ec39545e385880f6654bbe00f5c0ee7c124205653e7c4ec068d2e8d292dd8a1b00000000000000000000000000000000000000000000000000000000000000"
    );
    if (value !== null) {
      let tuple = value.toTuple();
      for (let i = 0; i < tuple.length; i++) {
        const value = tuple.at(i);
        log.info("Value index: {} kind: {}", [
          i.toString(),
          value.kind.toString(),
        ]);
        if (value.kind == 0) {
          log.info("Address: {}", [value.toAddress().toHexString()]);
        } else if (value.kind == 1) {
          log.info("Fixed Bytes: {}", [value.toBytes().toHexString()]);
        } else if (value.kind == 2) {
          log.info("Bytes: {}", [value.toBytes().toHexString()]);
        } else if (value.kind == 3) {
          log.info("INT: {}", [value.toString()]);
        } else if (value.kind == 4) {
          log.info("UINT: {}", [value.toBigInt().toString()]);
        } else if (value.kind == 8) {
          let array = value.toTupleArray<ethereum.Tuple>();
          log.info("Array Length: {}", [array.length.toString()]);
          for (let j = 0; j < array.length; j++) {
            const innerTuple = array.at(j); //  innerTuple
            if (innerTuple.length > 0) {
              log.info("Array: {} {}", [
                "0",
                innerTuple.at(0).toBigInt().toString(),
              ]);
              log.info("Array: {} {}", [
                "1",
                innerTuple.at(1).toAddress().toHexString(),
              ]);
              log.info("Array: {} {}", [
                "2",
                innerTuple.at(2).toAddress().toHexString(),
              ]);
              log.info("Array: {} {}", [
                "3",
                innerTuple.at(3).toAddress().toHexString(),
              ]);
              log.info("Array: {} {}", [
                "4",
                innerTuple.at(4).toAddress().toHexString(),
              ]);
              log.info("Array: {} {}", [
                "5",
                innerTuple.at(5).toBigInt().toString(),
              ]);
              log.info("Array: {} {}", [
                "6",
                innerTuple
                  .at(6)
                  .toArray()
                  .map<string>((b) => b.toBytes().toHexString())
                  .join(","),
              ]);
              log.info("Array: {} {}", [
                "7",
                innerTuple.at(7).toBigInt().toString(),
              ]);
              log.info("Array: {} {}", [
                "8",
                innerTuple.at(8).toBigInt().toString(),
              ]);
            }
          }
        }
      }
    } else {
      log.info("value is null", []);
    }
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdminSet created and stored", () => {
    // assert.entityCount("AdminSet", 1);
    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    // assert.fieldEquals(
    //   "AdminSet",
    //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
    //   "admin",
    //   "0x0000000000000000000000000000000000000001"
    // );
    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
