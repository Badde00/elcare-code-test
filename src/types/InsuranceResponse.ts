type ConsumerInfo = {
  ConsumerFirstName: string,
  ConsumerLastName: string,
  ConsumerAddress1: string,
  ConsumerAddress2: string,
  PostcodeLevel1: string,
  PostcodeLevel2: string,
  PostcodeLevel3: string,
  Postcode: number,
  Country: string,
  Phone1: number,
  Phone2: number,
  CellPhone: number,
  EmaiIld: string,
}

type ProductInfo = {
  SPBrandId: string,
  SPBrandDesc: string,
  SPProductId: string,
  SPProductDesc: string,
  MobelNo: string,
  SerialNo: string,
  InstallDate: string,
  ServiceContractNumber: string,
  // For all the ones defined like this with {'@_nil':string}
  // It is because the example data I found via postman were defined as <ServiceContractExpireDate xsi:nil="true"/>
  // Which the xml parser handles like this if I don't intervene with typing.
  // Unfortunately, I have no 'proper' typing to go on with the data I have
  ServiceContractExpireDate: {
    '@_nil'?: string,
  }
  PoNumber: string,
  PoAmount: string,
  CopayAmount: string,
}

export type CallInfo = {
  ServicerAccount: string,
  GroupKey: string,
  TechKey: string,
  CallNumber: number,
  MfgId: string,
  FSSCallId: number,
  ServiceCenter: string,
  WarrantyType: string,
  ServicetType: string,
  ServiceLocation: string,
  ScheduleDate: string,
  ProblemType: string,
  ProbelmDesc: string,
  RepeatCall: string,
  ForcedCall: string,
  CallStatus: string,
  SPCallStatusID: number,
  CallSubStatus: string,
  SPCallSubStatusID: number,
  ConsumerInfo: ConsumerInfo,
  ProductInfo: ProductInfo,
  ShippingInfo: {
    '@_nil'?: string,
  },
  CallCreatedOn: string,
  AuthNo: {
    '@_nil'?: string,
  }
}

type ErrorInfo = {
  Code: string,
  Description: string,
  Cause: string
}

export type InsuranceResponse = {
  '?xml'?: {
    '@_version': string,
    '@_encoding': string,
  },
  Envelope: {
    Body: {
      getCallInfoResponce: {
        numberOfCalls: number,
        CallInfo: CallInfo[],
        ErrorInfo: ErrorInfo,
      }
    }
  }
}