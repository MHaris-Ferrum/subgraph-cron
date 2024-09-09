import { log, ethereum, Address, Bytes } from "@graphprotocol/graph-ts";
import { Account } from "../../generated/schema";

export function handleAccount(address: Address): Bytes {
  log.info("handleAccount", [address.toHexString()]);
  let account = Account.load(address);
  if (account == null) {
    account = new Account(address);
    account.id = address;
    account.balance = ethereum.getBalance(address);
    account.isContract = ethereum.hasCode(address).inner ? true : false;
    account.save();
  }
  return account.id as Bytes;
}
