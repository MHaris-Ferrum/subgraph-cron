class ABIInput {
  indexed?: boolean;
  internalType: string;
  name: string;
  type: string;
  components?: ABIInput[];
}

class ABIFunction {
  anonymous?: boolean;
  inputs: ABIInput[] | [];
  name?: string | null;
  outputs?: ABIInput[];
  stateMutability?: string;
  type: string;
}

export const ABI: Array<ABIFunction> = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "implementation", type: "address" },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  { inputs: [], name: "ERC1967NonPayable", type: "error" },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "InvalidInitialization", type: "error" },
  { inputs: [], name: "NotInitializing", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "UUPSUnauthorizedCallContext", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "slot", type: "bytes32" }],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AdminSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "remoteChainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockNonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "FinalizedBlock",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "remoteChainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockNonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "FinalizedInvalidBlock",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "remoteChainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startBlockNonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endBlockNonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "finalizers",
        type: "address[]",
      },
    ],
    name: "FinalizedSnapshot",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "remoteChainId",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "nonce",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "timestamp",
        type: "uint64",
      },
    ],
    name: "LocalBlockCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "miner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalValue",
        type: "uint256",
      },
      {
        components: [
          { internalType: "uint64", name: "chainId", type: "uint64" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
          { internalType: "uint64", name: "timestamp", type: "uint64" },
        ],
        indexed: false,
        internalType: "struct QuantumPortalLib.Block",
        name: "blockMetadata",
        type: "tuple",
      },
    ],
    name: "MinedBlockCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "timestamp",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "remoteContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sourceMsgSender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sourceBeneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "method",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gas",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fixedFee",
        type: "uint256",
      },
    ],
    name: "RemoteTransactionRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERSION",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "authorityMgr",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "remoteChainId", type: "uint64" },
      { internalType: "uint64", name: "blockNonce", type: "uint64" },
      {
        components: [
          { internalType: "uint64", name: "timestamp", type: "uint64" },
          {
            internalType: "address",
            name: "remoteContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceMsgSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceBeneficiary",
            type: "address",
          },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes[]", name: "methods", type: "bytes[]" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "fixedFee", type: "uint256" },
        ],
        internalType: "struct QuantumPortalLib.RemoteTransaction[]",
        name: "transactions",
        type: "tuple[]",
      },
    ],
    name: "calculateBlockHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "targetChainId", type: "uint256" },
      { internalType: "uint256", name: "varSize", type: "uint256" },
    ],
    name: "calculateFixedFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeConvertor",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "remoteChainId", type: "uint256" },
      { internalType: "uint256", name: "blockNonce", type: "uint256" },
      {
        internalType: "uint256[]",
        name: "invalidBlockNonces",
        type: "uint256[]",
      },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint64", name: "expiry", type: "uint64" },
      { internalType: "bytes", name: "multiSignature", type: "bytes" },
    ],
    name: "finalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fixedFeeTarget",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "chainId", type: "uint64" },
      { internalType: "uint64", name: "nonce", type: "uint64" },
    ],
    name: "getBlockIdx",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "key", type: "uint256" }],
    name: "getLastFinalizedBlock",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "chainId", type: "uint64" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
          { internalType: "uint64", name: "timestamp", type: "uint64" },
        ],
        internalType: "struct QuantumPortalLib.Block",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "key", type: "uint256" }],
    name: "getLastLocalBlock",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "chainId", type: "uint64" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
          { internalType: "uint64", name: "timestamp", type: "uint64" },
        ],
        internalType: "struct QuantumPortalLib.Block",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "key", type: "uint256" }],
    name: "getLastMinedBlock",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "chainId", type: "uint64" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
          { internalType: "uint64", name: "timestamp", type: "uint64" },
        ],
        internalType: "struct QuantumPortalLib.Block",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "key", type: "uint256" },
      { internalType: "uint256", name: "idx", type: "uint256" },
    ],
    name: "getLocalBlockTransaction",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "timestamp", type: "uint64" },
          {
            internalType: "address",
            name: "remoteContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceMsgSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceBeneficiary",
            type: "address",
          },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes[]", name: "methods", type: "bytes[]" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "fixedFee", type: "uint256" },
        ],
        internalType: "struct QuantumPortalLib.RemoteTransaction",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "key", type: "uint256" }],
    name: "getLocalBlockTransactionLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "key", type: "uint256" }],
    name: "getLocalBlockTransactions",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "timestamp", type: "uint64" },
          {
            internalType: "address",
            name: "remoteContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceMsgSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceBeneficiary",
            type: "address",
          },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes[]", name: "methods", type: "bytes[]" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "fixedFee", type: "uint256" },
        ],
        internalType: "struct QuantumPortalLib.RemoteTransaction[]",
        name: "value",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "key", type: "uint256" }],
    name: "getLocalBlocks",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "uint64", name: "chainId", type: "uint64" },
              { internalType: "uint64", name: "nonce", type: "uint64" },
              {
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            internalType: "struct QuantumPortalLib.Block",
            name: "metadata",
            type: "tuple",
          },
        ],
        internalType: "struct IQuantumPortalLedgerMgr.LocalBlock",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "key", type: "uint256" }],
    name: "getMinedBlock",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "blockHash", type: "bytes32" },
          { internalType: "address", name: "miner", type: "address" },
          { internalType: "uint8", name: "invalidBlock", type: "uint8" },
          { internalType: "uint256", name: "stake", type: "uint256" },
          {
            internalType: "uint256",
            name: "totalValue",
            type: "uint256",
          },
          {
            components: [
              { internalType: "uint64", name: "chainId", type: "uint64" },
              { internalType: "uint64", name: "nonce", type: "uint64" },
              {
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            internalType: "struct QuantumPortalLib.Block",
            name: "blockMetadata",
            type: "tuple",
          },
        ],
        internalType: "struct IQuantumPortalLedgerMgr.MinedBlock",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "key", type: "uint256" }],
    name: "getMinedBlockTransactions",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "timestamp", type: "uint64" },
          {
            internalType: "address",
            name: "remoteContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceMsgSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceBeneficiary",
            type: "address",
          },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes[]", name: "methods", type: "bytes[]" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "fixedFee", type: "uint256" },
        ],
        internalType: "struct QuantumPortalLib.RemoteTransaction[]",
        name: "value",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
      { internalType: "address", name: "initialAdmin", type: "address" },
      {
        internalType: "uint256",
        name: "_minerMinimumStake",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "chainId", type: "uint64" }],
    name: "isLocalBlockReady",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "chainId", type: "uint64" }],
    name: "lastRemoteMinedBlock",
    outputs: [
      {
        components: [
          { internalType: "uint64", name: "chainId", type: "uint64" },
          { internalType: "uint64", name: "nonce", type: "uint64" },
          { internalType: "uint64", name: "timestamp", type: "uint64" },
        ],
        internalType: "struct QuantumPortalLib.Block",
        name: "_block",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ledger",
    outputs: [
      {
        internalType: "contract PortalLedgerUpgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "chainId", type: "uint64" },
      { internalType: "uint64", name: "blockNonce", type: "uint64" },
    ],
    name: "localBlockByNonce",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "uint64", name: "chainId", type: "uint64" },
              { internalType: "uint64", name: "nonce", type: "uint64" },
              {
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            internalType: "struct QuantumPortalLib.Block",
            name: "metadata",
            type: "tuple",
          },
        ],
        internalType: "struct IQuantumPortalLedgerMgr.LocalBlock",
        name: "",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint64", name: "timestamp", type: "uint64" },
          {
            internalType: "address",
            name: "remoteContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceMsgSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceBeneficiary",
            type: "address",
          },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes[]", name: "methods", type: "bytes[]" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "fixedFee", type: "uint256" },
        ],
        internalType: "struct QuantumPortalLib.RemoteTransaction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "remoteChainId", type: "uint64" },
      { internalType: "uint64", name: "blockNonce", type: "uint64" },
      {
        components: [
          { internalType: "uint64", name: "timestamp", type: "uint64" },
          {
            internalType: "address",
            name: "remoteContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceMsgSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceBeneficiary",
            type: "address",
          },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes[]", name: "methods", type: "bytes[]" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "fixedFee", type: "uint256" },
        ],
        internalType: "struct QuantumPortalLib.RemoteTransaction[]",
        name: "transactions",
        type: "tuple[]",
      },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint64", name: "expiry", type: "uint64" },
      { internalType: "bytes", name: "multiSignature", type: "bytes" },
    ],
    name: "mineRemoteBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "chainId", type: "uint64" },
      { internalType: "uint64", name: "blockNonce", type: "uint64" },
    ],
    name: "minedBlockByNonce",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "blockHash", type: "bytes32" },
          { internalType: "address", name: "miner", type: "address" },
          { internalType: "uint8", name: "invalidBlock", type: "uint8" },
          { internalType: "uint256", name: "stake", type: "uint256" },
          {
            internalType: "uint256",
            name: "totalValue",
            type: "uint256",
          },
          {
            components: [
              { internalType: "uint64", name: "chainId", type: "uint64" },
              { internalType: "uint64", name: "nonce", type: "uint64" },
              {
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            internalType: "struct QuantumPortalLib.Block",
            name: "blockMetadata",
            type: "tuple",
          },
        ],
        internalType: "struct IQuantumPortalLedgerMgr.MinedBlock",
        name: "b",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint64", name: "timestamp", type: "uint64" },
          {
            internalType: "address",
            name: "remoteContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceMsgSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceBeneficiary",
            type: "address",
          },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes[]", name: "methods", type: "bytes[]" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "fixedFee", type: "uint256" },
        ],
        internalType: "struct QuantumPortalLib.RemoteTransaction[]",
        name: "txs",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minerMgr",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minerMinimumStake",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registerMiner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "remoteChainId", type: "uint64" },
      {
        internalType: "address",
        name: "remoteContract",
        type: "address",
      },
      { internalType: "address", name: "msgSender", type: "address" },
      { internalType: "address", name: "beneficiary", type: "address" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes", name: "method", type: "bytes" },
    ],
    name: "registerTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "minedOnChainId", type: "uint64" },
      { internalType: "uint64", name: "localBlockNonce", type: "uint64" },
      {
        internalType: "uint64",
        name: "localBlockTimestamp",
        type: "uint64",
      },
      {
        components: [
          { internalType: "uint64", name: "timestamp", type: "uint64" },
          {
            internalType: "address",
            name: "remoteContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceMsgSender",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceBeneficiary",
            type: "address",
          },
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes[]", name: "methods", type: "bytes[]" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "fixedFee", type: "uint256" },
        ],
        internalType: "struct QuantumPortalLib.RemoteTransaction[]",
        name: "transactions",
        type: "tuple[]",
      },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint64", name: "expiry", type: "uint64" },
      { internalType: "bytes", name: "multiSignature", type: "bytes" },
      { internalType: "address", name: "rewardReceiver", type: "address" },
    ],
    name: "submitFraudProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "miner", type: "address" }],
    name: "unregisterMiner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_authorityMgr", type: "address" },
    ],
    name: "updateAuthorityMgr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_feeConvertor", type: "address" },
    ],
    name: "updateFeeConvertor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_varFeeTarget", type: "address" },
      {
        internalType: "address",
        name: "_fixedFeeTarget",
        type: "address",
      },
    ],
    name: "updateFeeTargets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_ledger", type: "address" }],
    name: "updateLedger",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_minerMgr", type: "address" }],
    name: "updateMinerMgr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "updateMinerMinimumStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "varFeeTarget",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];
