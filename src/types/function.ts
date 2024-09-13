export class Method {
  methodName: string;
  parameterTypes: string;
  methodSignature: string;
  methodSelector: string;
  constructor(
    methodName: string,
    parameterTypes: string,
    methodSignature: string,
    methodSelector: string
  ) {
    this.methodName = methodName;
    this.parameterTypes = parameterTypes;
    this.methodSignature = methodSignature;
    this.methodSelector = methodSelector;
  }
}
