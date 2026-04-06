import { gatherApiOrders } from "./gatherApiOrders"
import { gatherSftpOrders } from "./gatherSftpOrders";


/**
 * Collects orders from the api and sftp connection, gathers them into one list and prints it
 */
export const printOrders = async () => {
  const apiOrders = await gatherApiOrders();
  const sftpOrders = await gatherSftpOrders();

  const collectedOrders = [
    ...apiOrders,
    ...sftpOrders,
  ]

  console.log(collectedOrders);
}