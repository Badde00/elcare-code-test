import { XMLParser } from "fast-xml-parser";
import { DysonDataType, repairOrder } from "../types/DysonDataType";

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
  isArray: (tagName, jPath, isLeafNode, isAttribute) => {
    const arrayTags = ['repairOrders', 'Products'];
    return arrayTags.includes(tagName);
  }
});

/**
 * Parses input string in the form of xml into a list of repairOrders
 *
 * @param input A string in the format of an xml file
 * @returns A list of repairOrders
 */
export const parseDysonXmlToDysonRepairOrders = async (input: string): Promise<repairOrder[] | null> => {
  // Parses input text to json and then casts that as DasonDataType
  const response = parser.parse(input) as DysonDataType;
  const dysonRepairOrders = response.repairOrders;

  if (dysonRepairOrders.length == 0) {
    return null;
  }

  const repairOrderList = dysonRepairOrders.flatMap(ro => {
    return ro.repairOrder;
  })

  return repairOrderList;
}