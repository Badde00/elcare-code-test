import Client from "ssh2-sftp-client";
import "dotenv/config"
import { parseDysonXmlToDysonRepairOrders } from "../transformers/DysonParser"
import { dysonRepairOrderToNormalizedOrder } from "../transformers/ToNormalizedOrder";
import { NormalizedOrder } from "../types/NormalizedOrder";


let sftp = new Client();

/**
 * Connects to an sftp server, fetches all files, parses them to the data type the server stores them in, parses that to NormalizedOrder and returns it
 *
 * @returns The promise of a list of normalized orders
 */
export const gatherSftpOrders = async (): Promise<NormalizedOrder[]> => {
  /*
    I know that the folder given only contains a single file, but I wanted to make
    application able to handle any amount of files, which is why I built this
    function like this.
    This should in theory able todo that, but since I didn't want
    to mess with your mock server I wasn't really able to test it.

    I've documented this file more heavily than the others because I found it a bit hard to wrap my head around it myself
  */

  const dirPath = process.env.SFTP_DIRPATH;
  if (!dirPath) return []
  
  let orders: NormalizedOrder[] = []

  try {
    // Connect to server
    await sftp.connect({
      host: process.env.SFTP_HOST ?? '',
      port: 22,
      username: process.env.SFTP_USERNAME ?? '',
      password: process.env.SFTP_PASSWORD ?? '',
    })

    // Get a list of all files
    const fileList = await sftp.list(dirPath)

    // For every file object,
    const processingPromises = fileList.map(async (file) => {
      // Ignores directories
      if (file.type === 'd') return [];

      // Fetches the specific file
      const filePath = dirPath + file.name;
      const data = await sftp.get(filePath);

      // Parses the file from xml to the its internal data type
      const repairOrderList = await parseDysonXmlToDysonRepairOrders(data.toString());

      // Transforms RepairOrder[] to NormalizedOrder[]
      return repairOrderList
        ? repairOrderList.map((repairOrder) => {
          return dysonRepairOrderToNormalizedOrder(repairOrder)
        })
        : [];
    });

    // Waits for all files to have been fetched and processed
    const results = await Promise.all(processingPromises);
    // And flattens the lists into a single one, since each file would become a NormalizedOrder[] of its own
    orders = results.flat();
  } catch (e) {
    console.error('An error occurred: ', e);
    return [];
  } finally {
    await sftp.end();
  }

  return orders;
}