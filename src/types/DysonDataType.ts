type Order = {
  CSS_ExternalReference__c: string,
  OrderNumber: number,
  Status: string,
  EffectiveDate: string,
  CSS_Salutation__c: string,
  CSS_FirstName__c: string,
  CSS_LastName__c: string,
  CSS_Phone__c: number,
  CSS_Email__c: string,
  CSS_SerialNumber__c: string,
  CSS_CustomerFriendlyName__c: string,
  CSS_InboundShippingSpecialInstructions__c: string,
  CSS_ChargeType__c: string,
  CSS_RepairServiceFee__c: string,
  CSS_WarrantyStatus__c: string,
  CSS_WarrantyEndDate__c: string,
  CSS_PaymentType__c: string,
  CSS_UsedPartsReturn__c: boolean,
  CSS_InboundShippingAddressType__c: string,
  CSS_CollectionDateAndTime__c: string,
  CSS_OutboundShippingAddressType__c: string,
  CSS_SpecialInstructions__c: string,
  CSS_PreRepairVisualSafetyInspection__c: boolean,
  CSS_PreRepairInsulationTest__c: string,
  CSS_PreRepairFunctionTest__c: boolean,
  CSS_PreRepairDiagnosticToolTest__c: boolean,
  CSS_PreRepairSuctionTest__c: string,
  CSS_PreRepairContinuityTest__c: boolean,
  CSS_PreRepairPowerDrawTest__c: string,
  CSS_ProductSuitableForRepair__c: boolean,
  CSS_PostRepairInsulationTest__c: string,
  CSS_PostRepairFunctionTest__c: boolean,
  CSS_PostRepairSuctionTest__c: string,
  CSS_PostRepairAirflowTestMax__c: string,
  CSS_PostRepairAirflowTestMed__c: string,
  CSS_PostRepairAirflowTestMin__c: string,
  CSS_PostRepairTemperatureTestMax__c: string,
  CSS_PostRepairTemperaturenTestMed__c: string,
  CSS_PostRepairTemperatureTestMin__c: string,
  CSS_PostRepairDiagnosticToolTest__c: boolean,
  CSS_ProductCleaned__c: boolean,
  CSS_EngineerNotes__c: string,
  CSS_PreRepairIsolationTest__c: boolean,
  CSS_PreRepairEarthContinuityTest__c: string,
  CSS_PreRepairEarthLoopImpedanceTest__c: string,
  CSS_PreRepairVoltageTest__c: boolean,
  CSS_PreRepairPolarityTest__c: boolean,
  CSS_PostRepairEarthLoopImpedanceTest__c: string,
  CSS_PostRepairPolarityTest__c: boolean,
  CSS_PostRepairVoltageTest__c: boolean,
  CSS_FailureReason__c: string
}

type Case = {
  CaseNumber: number,
  Subject: string,
  Description: string,
  CSS_ResolveSteps__c: string,
  CSS_ResolveResult__c: string
}

type Contact = {
  CSS_Market__c: string,
}

type MachineRegistration = {
  CSS_Variant__c: string,
  CSS_MaterialNumber__c: string
}

type Address = {
  CSS_Salutation__c: string,
  CSS_FirstName__c: string,
  CSS_LastName__c: string,
  CSS_AddressLine1__c: string,
  CSS_AddressLine2__c: string,
  CSS_PostalCode__c: number,
  CSS_TownCity__c: string,
  CSS_State__c: string,
  CSS_Country__c: string
}

type OrderProduct = {
  CSS_SKUNumber__c: string,
  CSS_ProductName__c: string,
  Quantity: number,
  CSS_ChargeType__c: string,
  CSS_Reason__c: string,
  UnitPrice: number,
  CSS_UnitPriceFormatted__c: string,
  CSS_DiscountValue__c: string,
  TotalPrice: number,
  CSS_TotalPriceFormatted__c: string
}

export type repairOrder = {
  Contact: Contact,
  Order: Order,
  Case: Case,
  MachineRegistration: MachineRegistration,
  InboundAddress: Address,
  OutboundAddress: Address,
  BillingAddress: Address,
  Products: { OrderProduct: OrderProduct }[],
}

type repairOrderList = {
  repairOrder: repairOrder
}[]

export type DysonDataType = {
  '?xml'?: {
    '@_version': string,
    '@_encoding': string,
  },
  repairOrders: repairOrderList
}