import "dotenv/config"

const url = process.env.API_URL;

/*
I didn't know how I should deal with the dates in the api.
In full application, I'd either allow the user to choose a specific date,
or pull all orders thats been made but the api only allows a limited
range of dates and from the description of the test it didn't seem like
you wanted an application with inputs, so I used a static date.
*/
const soapBody =
  `<x:Envelope
    xmlns:x="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:urn="urn:SPDServicerService">
    <x:Header/>
    <x:Body>
        <urn:getCallInfoSearch>
            <UserInfo>
                <UserID>${process.env.INSURANCE_USER_ID}</UserID>
                <Password>${process.env.INSURANCE_PASSWORD}</Password>
                <SvcrAcct>${process.env.INSURANCE_USER_ID}</SvcrAcct>
            </UserInfo>
            <FromDateTime>10/27/2025 12:00:00</FromDateTime>
            <ToDateTime>10/28/2025 12:00:00</ToDateTime>
            <Callno></Callno>
            <Versionno></Versionno>
        </urn:getCallInfoSearch>
    </x:Body>
</x:Envelope>`;

/**
 * Fetches data from an api, where the expected format is that of xml
 *
 * @returns A string in the format of xml
 */
export const fetchInsurance = async (): Promise<string> => {
  if (!url) return '';
  
  const headers = new Headers();
  headers.set('Content-Type', 'text/xml; charset=utf-8')
  headers.set('SOAPAction', '{N/A}')

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: soapBody,
  }

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    console.error('Error occured: ' + response.status + '\nReason: ' + response.statusText)
    return '';
  }

  return await response.text();
}