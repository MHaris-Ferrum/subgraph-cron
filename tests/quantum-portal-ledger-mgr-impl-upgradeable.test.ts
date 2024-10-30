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
      "000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000065f4000000000000000000000000000000000000000000000000000000000000010600000000000000000000000000000000000000000000000000000000000000c027818e9e1a38da8ce7f74e3dda4b31e324d4b688bf8547dd913a3cdcf706a82b0000000000000000000000000000000000000000000000000000000067054c7500000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060c3ffec3f08b2280336e43d74109810f6af95ad6be007fc112db4da08d8fe2ea8010e03cbf2cd57b4ab6099116136e1650d8b346fe598740a754f911d6681e3de1c00000000000000000000000000000000000000000000000000000000000000"
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
