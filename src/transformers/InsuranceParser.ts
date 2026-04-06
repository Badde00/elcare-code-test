import { XMLParser } from "fast-xml-parser";
import { CallInfo, InsuranceResponse } from "../types/InsuranceResponse";


const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
});

/**
 * Parses XML and casts it to the form of a list of CallOrders
 *
 * @param input A string in the form of xml
 * @returns A list of orders in the form of CallOrder
 */
export const parseInsuranceXmlToCallInfo = async (input: string): Promise<CallInfo[] | null> => {
  const response = parser.parse(input) as InsuranceResponse;
  const callInfo = response.Envelope.Body.getCallInfoResponce;

  // If there exists an error code, something went wrong
  if (callInfo.ErrorInfo && callInfo.ErrorInfo.Code && callInfo.ErrorInfo.Code.length > 0) {
    console.error('Something went wrong: ', callInfo.ErrorInfo.Description);
    return [];
  }

  return callInfo.CallInfo;
}