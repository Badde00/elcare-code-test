/*
I am intentionally not fixing the typo here. In the email where you explained the assignment,
one of the fields was named postalCose. It should obviously be 'postalCode',
but since I want to follow the instructions in this case, I'll leave it as is.
*/

export type NormalizedOrder = {
  firstName: string,
  lastName: string,
  brand: string,
  model: string,
  serialNumber: string,
  problemDescription: string,
  orderReference: string,
  email: string,
  phoneNumber: string,
  streetAddress: string,
  postalCose: string,
  city: string,
  countryCode: string,
}