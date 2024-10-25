import { ABIMethod, ABIParameter } from "../types/abi";

export const ABI_FUNCTION_DEFINITIONS = [
  "UPGRADE_INTERFACE_VERSION()",
  "VERSION()",
  "admin()",
  "authorityMgr()",
  "calculateBlockHash(uint64,uint64,QuantumPortalLib.RemoteTransaction[])",
  "calculateFixedFee(uint256,uint256)",
  "feeConvertor()",
  "finalize(uint256,uint256,uint256[],bytes32,uint64,bytes)",
  "fixedFeeTarget()",
  "gateway()",
  "getBlockIdx(uint64,uint64)",
  "getLastFinalizedBlock(uint256)",
  "getLastLocalBlock(uint256)",
  "getLastMinedBlock(uint256)",
  "getLocalBlockTransaction(uint256,uint256)",
  "getLocalBlockTransactionLength(uint256)",
  "getLocalBlockTransactions(uint256)",
  "getLocalBlocks(uint256)",
  "getMinedBlock(uint256)",
  "getMinedBlockTransactions(uint256)",
  "initialize(address,address,uint256,address)",
  "isLocalBlockReady(uint64)",
  "lastRemoteMinedBlock(uint64)",
  "ledger()",
  "localBlockByNonce(uint64,uint64)",
  "mineRemoteBlock(uint64,uint64,QuantumPortalLib.RemoteTransaction[],bytes32,uint64,bytes)",
  "minedBlockByNonce(uint64,uint64)",
  "minerMgr()",
  "minerMinimumStake()",
  "owner()",
  "proxiableUUID()",
  "registerMiner()",
  "registerTransaction(uint64,address,address,address,address,uint256,bytes)",
  "renounceOwnership()",
  "setAdmin(address)",
  "submitFraudProof(uint64,uint64,uint64,QuantumPortalLib.RemoteTransaction[],bytes32,uint64,bytes,address)",
  "transferOwnership(address)",
  "unregisterMiner(address)",
  "updateAuthorityMgr(address)",
  "updateFeeConvertor(address)",
  "updateFeeTargets(address,address)",
  "updateGateway(address)",
  "updateLedger(address)",
  "updateMinerMgr(address)",
  "updateMinerMinimumStake(uint256)",
  "upgradeToAndCall(address,bytes)",
  "varFeeTarget()",
];

// class ABIMethod {
//   name: string;
//   parameters: string[];
//   parametersType: string[];

//   constructor(name: string, parameters: string[], parametersType: string[]) {
//     this.name = name;
//     this.parameters = parameters;
//     this.parametersType = parametersType;
//   }
// }

// export const ABI: ABIMethod[] = [
//   new ABIMethod("constructor", [], []),
//   new ABIMethod("AddressEmptyCode", ["target"], ["address"]),
//   new ABIMethod(
//     "ERC1967InvalidImplementation",
//     ["implementation"],
//     ["address"]
//   ),
//   new ABIMethod("ERC1967NonPayable", [], []),
//   new ABIMethod("FailedInnerCall", [], []),
//   new ABIMethod("InvalidInitialization", [], []),
//   new ABIMethod("NotInitializing", [], []),
//   new ABIMethod("OwnableInvalidOwner", ["owner"], ["address"]),
//   new ABIMethod("OwnableUnauthorizedAccount", ["account"], ["address"]),
//   new ABIMethod("UUPSUnauthorizedCallContext", [], []),
//   new ABIMethod("UUPSUnsupportedProxiableUUID", ["slot"], ["bytes32"]),
//   new ABIMethod("AdminSet", ["admin"], ["address"]),
//   new ABIMethod(
//     "FinalizedBlock",
//     ["remoteChainId", "blockNonce", "timestamp"],
//     ["uint256", "uint256", "uint256"]
//   ),
//   new ABIMethod(
//     "FinalizedInvalidBlock",
//     ["remoteChainId", "blockNonce", "timestamp"],
//     ["uint256", "uint256", "uint256"]
//   ),
//   new ABIMethod(
//     "FinalizedSnapshot",
//     ["remoteChainId", "startBlockNonce", "endBlockNonce", "finalizers"],
//     ["uint256", "uint256", "uint256", "address[]"]
//   ),
//   new ABIMethod("Initialized", ["version"], ["uint64"]),
//   new ABIMethod(
//     "LocalBlockCreated",
//     ["remoteChainId", "nonce", "timestamp"],
//     ["uint64", "uint64", "uint64"]
//   ),
//   new ABIMethod(
//     "MinedBlockCreated",
//     ["blockHash", "miner", "stake", "totalValue", "blockMetadata"],
//     ["bytes32", "address", "uint256", "uint256", "tuple"]
//   ),
//   new ABIMethod(
//     "OwnershipTransferred",
//     ["previousOwner", "newOwner"],
//     ["address", "address"]
//   ),
//   new ABIMethod(
//     "RemoteTransactionRegistered",
//     [
//       "timestamp",
//       "remoteContract",
//       "sourceMsgSender",
//       "sourceBeneficiary",
//       "token",
//       "amount",
//       "method",
//       "gas",
//       "fixedFee",
//     ],
//     [
//       "uint64",
//       "address",
//       "address",
//       "address",
//       "address",
//       "uint256",
//       "bytes",
//       "uint256",
//       "uint256",
//     ]
//   ),
//   new ABIMethod("Upgraded", ["implementation"], ["address"]),
//   new ABIMethod("UPGRADE_INTERFACE_VERSION", [], []),
//   new ABIMethod("VERSION", [], []),
//   new ABIMethod("admin", [], []),
//   new ABIMethod("authorityMgr", [], []),
//   new ABIMethod(
//     "calculateBlockHash",
//     ["remoteChainId", "blockNonce", "transactions"],
//     ["uint64", "uint64", "tuple[]"]
//   ),
//   new ABIMethod(
//     "calculateFixedFee",
//     ["targetChainId", "varSize"],
//     ["uint256", "uint256"]
//   ),
//   new ABIMethod("feeConvertor", [], []),
//   new ABIMethod(
//     "finalize",
//     [
//       "remoteChainId",
//       "blockNonce",
//       "invalidBlockNonces",
//       "salt",
//       "expiry",
//       "multiSignature",
//     ],
//     ["uint256", "uint256", "uint256[]", "bytes32", "uint64", "bytes"]
//   ),
//   new ABIMethod("fixedFeeTarget", [], []),
//   new ABIMethod("getBlockIdx", ["chainId", "nonce"], ["uint64", "uint64"]),
// ];

// Define the structure for tuple components
// interface ABIParameter {
//   name: string;
//   type: string;
//   components?: ABIMethod[]; // For nested tuples
// }

// export const ABI: ABIMethod[] = [
//   new ABIMethod("constructor", []),
//   new ABIMethod("AddressEmptyCode", [new ABIParameter("target", "address")]),
//   new ABIMethod("ERC1967InvalidImplementation", [
//     new ABIParameter("implementation", "address"),
//   ]),
//   new ABIMethod("ERC1967NonPayable", []),
//   new ABIMethod("FailedInnerCall", []),
//   new ABIMethod("InvalidInitialization", []),
//   new ABIMethod("NotInitializing", []),
//   new ABIMethod("OwnableInvalidOwner", [new ABIParameter("owner", "address")]),
//   new ABIMethod("OwnableUnauthorizedAccount", [
//     new ABIParameter("account", "address"),
//   ]),
//   new ABIMethod("UUPSUnauthorizedCallContext", []),
//   new ABIMethod("UUPSUnsupportedProxiableUUID", [
//     new ABIParameter("slot", "bytes32"),
//   ]),
//   new ABIMethod("AdminSet", [new ABIParameter("admin", "address")]),
//   new ABIMethod("FinalizedBlock", [
//     new ABIParameter("remoteChainId", "uint256"),
//     new ABIParameter("blockNonce", "uint256"),
//     new ABIParameter("timestamp", "uint256"),
//   ]),
//   new ABIMethod("FinalizedInvalidBlock", [
//     new ABIParameter("remoteChainId", "uint256"),
//     new ABIParameter("blockNonce", "uint256"),
//     new ABIParameter("timestamp", "uint256"),
//   ]),
//   new ABIMethod("FinalizedSnapshot", [
//     new ABIParameter("remoteChainId", "uint256"),
//     new ABIParameter("startBlockNonce", "uint256"),
//     new ABIParameter("endBlockNonce", "uint256"),
//     new ABIParameter("finalizers", "address[]"),
//   ]),
//   new ABIMethod("Initialized", [new ABIParameter("version", "uint64")]),
//   new ABIMethod("LocalBlockCreated", [
//     new ABIParameter("remoteChainId", "uint64"),
//     new ABIParameter("nonce", "uint64"),
//     new ABIParameter("timestamp", "uint64"),
//   ]),
//   new ABIMethod("MinedBlockCreated", [
//     new ABIParameter("blockHash", "bytes32"),
//     new ABIParameter("miner", "address"),
//     new ABIParameter("stake", "uint256"),
//     new ABIParameter("totalValue", "uint256"),
//     new ABIParameter("blockMetadata", "tuple"),
//   ]),
//   new ABIMethod("OwnershipTransferred", [
//     new ABIParameter("previousOwner", "address"),
//     new ABIParameter("newOwner", "address"),
//   ]),
//   new ABIMethod("RemoteTransactionRegistered", [
//     new ABIParameter("timestamp", "uint64"),
//     new ABIParameter("remoteContract", "address"),
//     new ABIParameter("sourceMsgSender", "address"),
//     new ABIParameter("sourceBeneficiary", "address"),
//     new ABIParameter("token", "address"),
//     new ABIParameter("amount", "uint256"),
//     new ABIParameter("method", "bytes"),
//     new ABIParameter("gas", "uint256"),
//     new ABIParameter("fixedFee", "uint256"),
//   ]),
//   new ABIMethod("Upgraded", [new ABIParameter("implementation", "address")]),
//   new ABIMethod("UPGRADE_INTERFACE_VERSION", []),
//   new ABIMethod("VERSION", []),
//   new ABIMethod("admin", []),
//   new ABIMethod("authorityMgr", []),
//   new ABIMethod("calculateBlockHash", [
//     new ABIParameter("remoteChainId", "uint64"),
//     new ABIParameter("blockNonce", "uint64"),
//     new ABIParameter("transactions", "tuple", [
//       new ABIParameter("timestamp", "uint64"),
//       new ABIParameter("remoteContract", "address"),
//       new ABIParameter("sourceMsgSender", "address"),
//       new ABIParameter("sourceBeneficiary", "address"),
//       new ABIParameter("token", "address"),
//       new ABIParameter("amount", "uint256"),
//       new ABIParameter("method", "bytes"),
//       new ABIParameter("gas", "uint256"),
//       new ABIParameter("fixedFee", "uint256"),
//     ]),
//   ]),
//   new ABIMethod("calculateFixedFee", [
//     new ABIParameter("targetChainId", "uint256"),
//     new ABIParameter("varSize", "uint256"),
//   ]),
//   new ABIMethod("feeConvertor", []),
//   new ABIMethod("finalize", [
//     new ABIParameter("remoteChainId", "uint256"),
//     new ABIParameter("blockNonce", "uint256"),
//     new ABIParameter("invalidBlockNonces", "uint256[]"),
//     new ABIParameter("salt", "bytes32"),
//     new ABIParameter("expiry", "uint64"),
//     new ABIParameter("multiSignature", "bytes"),
//   ]),
//   new ABIMethod("fixedFeeTarget", []),
//   new ABIMethod("getBlockIdx", [
//     new ABIParameter("chainId", "uint64"),
//     new ABIParameter("nonce", "uint64"),
//   ]),
// ];
export const ABI: ABIMethod[] = [
  new ABIMethod("constructor", []),
  new ABIMethod("finalize", [
    new ABIParameter("remoteChainId", "uint256"),
    new ABIParameter("blockNonce", "uint256"),
    new ABIParameter("invalidBlockNonces", "uint256[]"),
    new ABIParameter("salt", "bytes32"),
    new ABIParameter("expiry", "uint64"),
    new ABIParameter("multiSignature", "bytes"),
  ]),
  new ABIMethod("initialize", [
    new ABIParameter("initialOwner", "address"),
    new ABIParameter("initialAdmin", "address"),
    new ABIParameter("_minerMinimumStake", "uint256"),
  ]),
  new ABIMethod("mineRemoteBlock", [
    new ABIParameter("remoteChainId", "uint64"),
    new ABIParameter("blockNonce", "uint64"),
    new ABIParameter("transactions", "tuple[]", [
      new ABIParameter("timestamp", "uint64"),
      new ABIParameter("remoteContract", "address"),
      new ABIParameter("sourceMsgSender", "address"),
      new ABIParameter("sourceBeneficiary", "address"),
      new ABIParameter("token", "address"),
      new ABIParameter("amount", "uint256"),
      new ABIParameter("methods", "bytes[]"), // Representing bytes[] as tuple
      new ABIParameter("gas", "uint256"),
      new ABIParameter("fixedFee", "uint256"),
    ]),
    new ABIParameter("salt", "bytes32"),
    new ABIParameter("expiry", "uint64"),
    new ABIParameter("multiSignature", "bytes"),
  ]),
  new ABIMethod("registerMiner", []),
  new ABIMethod("registerTransaction", [
    new ABIParameter("remoteChainId", "uint64"),
    new ABIParameter("remoteContract", "address"),
    new ABIParameter("msgSender", "address"),
    new ABIParameter("beneficiary", "address"),
    new ABIParameter("token", "address"),
    new ABIParameter("amount", "uint256"),
    new ABIParameter("method", "bytes"),
  ]),
  new ABIMethod("renounceOwnership", []),
  new ABIMethod("setAdmin", [new ABIParameter("_admin", "address")]),
  new ABIMethod("submitFraudProof", [
    new ABIParameter("minedOnChainId", "uint64"),
    new ABIParameter("localBlockNonce", "uint64"),
    new ABIParameter("localBlockTimestamp", "uint64"),
    new ABIParameter("transactions", "tuple[]", [
      new ABIParameter("timestamp", "uint64"),
      new ABIParameter("remoteContract", "address"),
      new ABIParameter("sourceMsgSender", "address"),
      new ABIParameter("sourceBeneficiary", "address"),
      new ABIParameter("token", "address"),
      new ABIParameter("amount", "uint256"),
      new ABIParameter("methods", "bytes[]"),
      new ABIParameter("gas", "uint256"),
      new ABIParameter("fixedFee", "uint256"),
    ]),
    new ABIParameter("salt", "bytes32"),
    new ABIParameter("expiry", "uint64"),
    new ABIParameter("multiSignature", "bytes"),
    new ABIParameter("rewardReceiver", "address"),
  ]),
  new ABIMethod("transferOwnership", [new ABIParameter("newOwner", "address")]),
  new ABIMethod("unregisterMiner", [new ABIParameter("miner", "address")]),
  new ABIMethod("updateAuthorityMgr", [
    new ABIParameter("_authorityMgr", "address"),
  ]),
  new ABIMethod("updateFeeConvertor", [
    new ABIParameter("_feeConvertor", "address"),
  ]),
  new ABIMethod("updateFeeTargets", [
    new ABIParameter("_varFeeTarget", "address"),
    new ABIParameter("_fixedFeeTarget", "address"),
  ]),
  new ABIMethod("updateLedger", [new ABIParameter("_ledger", "address")]),
  new ABIMethod("updateMinerMgr", [new ABIParameter("_minerMgr", "address")]),
  new ABIMethod("updateMinerMinimumStake", [
    new ABIParameter("amount", "uint256"),
  ]),
];
