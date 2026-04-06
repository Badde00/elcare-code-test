import { fetchInsurance } from "./fetchInsurance";
import { parseInsuranceXmlToCallInfo } from "../transformers/InsuranceParser";
import { callInfoToNormalizedOrder } from "../transformers/ToNormalizedOrder";
import { NormalizedOrder } from "../types/NormalizedOrder";


/**
 * Makes a call to an api endpoint, fetches all files, 
 * parses them to the data type the company stores them in, parses that to NormalizedOrder and returns it
 * 
 * @returns The promise of a list of normalized orders
 */
export const gatherApiOrders = async (): Promise<NormalizedOrder[]> => {
  let orders: NormalizedOrder[] = []
  await fetchInsurance().then((response) => {
    parseInsuranceXmlToCallInfo(response).then((callInfoList) => {
      if (callInfoList) {
        orders = callInfoList.map((callInfo) => {
          return callInfoToNormalizedOrder(callInfo);
        });
      };
    });
  })
  return orders;
}