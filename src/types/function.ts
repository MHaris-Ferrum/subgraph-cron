import { ABIParameter } from "./abi";

export class Method {
  methodName: string;
  parameters: ABIParameter[];
  methodSignature: string;
  methodSelector: string;
  constructor(
    methodName: string,
    parameters: ABIParameter[],
    methodSignature: string,
    methodSelector: string
  ) {
    this.methodName = methodName;
    this.parameters = parameters;
    this.methodSignature = methodSignature;
    this.methodSelector = methodSelector;
  }
}
