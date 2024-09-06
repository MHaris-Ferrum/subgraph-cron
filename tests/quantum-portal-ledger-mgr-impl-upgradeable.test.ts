import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { AdminSet } from "../generated/schema"
import { AdminSet as AdminSetEvent } from "../generated/QuantumPortalLedgerMgrImplUpgradeable/QuantumPortalLedgerMgrImplUpgradeable"
import { handleAdminSet } from "../src/quantum-portal-ledger-mgr-impl-upgradeable"
import { createAdminSetEvent } from "./quantum-portal-ledger-mgr-impl-upgradeable-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let admin = Address.fromString("0x0000000000000000000000000000000000000001")
    let newAdminSetEvent = createAdminSetEvent(admin)
    handleAdminSet(newAdminSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdminSet created and stored", () => {
    assert.entityCount("AdminSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdminSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "admin",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
