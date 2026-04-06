import { repairOrder } from "../types/DysonDataType";
import { CallInfo } from "../types/InsuranceResponse";
import { NormalizedOrder } from "../types/NormalizedOrder";


/**
 * Translates the insurance orders into the internal NormalizedOrder format
 *
 * @param dysonData A repairOrder
 * @returns A NormalizedOrder
 */
export const callInfoToNormalizedOrder = (callInfo: CallInfo): NormalizedOrder => {
  return {
    firstName: callInfo.ConsumerInfo.ConsumerFirstName,
    lastName: callInfo.ConsumerInfo.ConsumerLastName,
    brand: callInfo.ProductInfo.SPBrandDesc,
    model: callInfo.ProductInfo.SPProductDesc,
    serialNumber: callInfo.ProductInfo.SerialNo,
    problemDescription: callInfo.ProbelmDesc,
    // There was no clear field for order reference, so in liu of contacting the customer I used my best guess
    orderReference: callInfo.CallNumber + '/' + callInfo.FSSCallId,
    email: callInfo.ConsumerInfo.EmaiIld,
    phoneNumber: formatPhoneNumber(callInfo.ConsumerInfo.Phone1.toString(), callInfo.ConsumerInfo.Country),
    streetAddress: callInfo.ConsumerInfo.ConsumerAddress1,
    postalCose: callInfo.ConsumerInfo.Postcode.toString(),
    city: callInfo.ConsumerInfo.PostcodeLevel3,
    countryCode: callInfo.ConsumerInfo.Country,
  }
}

/**
 * Translates Dysons repair orders into the internal NormalizedOrder format
 *
 * @param dysonData A repairOrder
 * @returns A NormalizedOrder
 */
export const dysonRepairOrderToNormalizedOrder = (dysonData: repairOrder): NormalizedOrder => {
  return {
    firstName: dysonData.OutboundAddress.CSS_FirstName__c,
    lastName: dysonData.OutboundAddress.CSS_LastName__c,
    // Could not find anything looking definetively like brand or model in the Dyson data, so this is my best guess
    brand: dysonData.Products[0]?.OrderProduct.CSS_SKUNumber__c ?? '',
    model: dysonData.Products[0]?.OrderProduct.CSS_ProductName__c ?? '',
    serialNumber: dysonData.Order.CSS_SerialNumber__c,
    problemDescription: dysonData.Case.Description,
    orderReference: dysonData.Order.CSS_ExternalReference__c,
    // This does seem like the email of the repair workshop, but there are no other emails to be found
    email: dysonData.Order.CSS_Email__c,
    phoneNumber: formatPhoneNumber(dysonData.Order.CSS_Phone__c.toString(), getCountryCodeFromName(dysonData.OutboundAddress.CSS_Country__c)),
    streetAddress: dysonData.OutboundAddress.CSS_AddressLine1__c,
    postalCose: dysonData.OutboundAddress.CSS_PostalCode__c.toString(),
    city: dysonData.OutboundAddress.CSS_TownCity__c,
    countryCode: getCountryCodeFromName(dysonData.OutboundAddress.CSS_Country__c),
  }
}

/**
 * Takes an input string, validates that it's a phone number and fomrmats it to the international standard
 *
 * @param input A potential phone number
 * @param countryCode The country the phone belongs to in order to add the correct area code to the number
 * @returns A formatted international phone number
 */
const formatPhoneNumber = (input: string, countryCode: string): string => {
  const validPhonePattern = /^\+?[\d]+$/;

  if (!input || input == '0' || !validPhonePattern.test(input)) return '';

  // In a full, "production", application I'd use a library that handles the phone numbers,
  // but in this limited scope I deemed this enough and didn't want to bloat the imports
  const countryMap: Record<string, string> = {
    'no': '+47',
    'fi': '+358',
    'dk': '+45',
    'se': '+46',
    'is': '+354',
  };

  const countryCodeNumber = countryMap[countryCode.toLowerCase()] || '+46';

  if (input.startsWith('0')) {
    return countryCodeNumber + input.slice(1);
  }

  if (!input.startsWith('+')) {
    return '+' + input;
  }

  return input;
}

const getCountryCodeFromName = (countryName:string): string => {
  // Same as with phone number. In a full application I'd use a lib for this,
  // but I don't want the bloat for a relatively simple piece of code
  const countryMap: Record<string, string> = {
    'norge': 'NO',
    'norway': 'NO',
    'soumi': 'FI',
    'finland': 'FI',
    'danmark': 'DK',
    'denmark': 'DK',
    'sverige': 'SE',
    'sweden': 'SE',
    'ísland': 'IS',
    'island': 'IS',
    'iceland': 'IS',
  };

  return countryMap[countryName.toLowerCase()] ?? ''
}