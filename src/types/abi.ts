// import { ByteArray, crypto, log } from "@graphprotocol/graph-ts";

// // Define a type for ABI input components (for tuples)
// export class ABIComponent {
//   name: string;
//   type: string;
//   components: Array<ABIComponent> | null;

//   constructor(
//     name: string,
//     type: string,
//     components: Array<ABIComponent> | null = null
//   ) {
//     this.name = name;
//     this.type = type;
//     this.components = components;
//   }
// }

// // Define a type for ABI inputs
// export class ABIInput {
//   name: string;
//   type: string;
//   internalType: string | null;
//   components: Array<ABIComponent> | null;

//   constructor(
//     name: string,
//     type: string,
//     internalType: string | null = null,
//     components: Array<ABIComponent> | null = null
//   ) {
//     this.name = name;
//     this.type = type;
//     this.internalType = internalType;
//     this.components = components;
//   }
// }

// // Define a type for ABI methods
// export class ABIMethod {
//   name: string;
//   type: string;
//   stateMutability: string;
//   inputs: Array<ABIInput>;

//   constructor(
//     name: string,
//     type: string,
//     stateMutability: string,
//     inputs: Array<ABIInput>
//   ) {
//     this.name = name;
//     this.type = type;
//     this.inputs = inputs;
//     this.stateMutability = stateMutability;
//   }
// }

export class ABIParameter {
  name: string;
  type: string;
  components: ABIParameter[] | null = null;

  constructor(
    name: string,
    type: string,
    components: ABIParameter[] | null = null
  ) {
    this.name = name;
    this.type = type;
    this.components = components;
  }
}

export class ABIMethod {
  name: string;
  parameters: ABIParameter[];

  constructor(name: string, parameters: ABIParameter[]) {
    this.name = name;
    this.parameters = parameters;
  }
}

// Define a type for the Method class you're using to store function selectors
export class Method {
  name: string;
  inputs: string;
  signature: string;
  selector: string;
  inputNames: string;

  constructor(
    name: string,
    inputs: string,
    signature: string,
    selector: string,
    inputNames: string
  ) {
    this.name = name;
    this.inputs = inputs;
    this.signature = signature;
    this.selector = selector;
    this.inputNames = inputNames;
  }
}
