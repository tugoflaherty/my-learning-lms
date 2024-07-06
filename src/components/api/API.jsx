import { API_URL, API_KEY } from "./APIConfig.jsx";

export const apiRequest = async (endpoint, method="GET", body=null) => {
  let requestObj = { method: method };
  if (body) requestObj = {
    ...requestObj,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(body)
  };
  try {
    const endpointAddress = API_URL + endpoint + API_KEY;
    const response = await fetch(endpointAddress, requestObj);
    if ((response.status >= 200) && (response.status <= 299))
      return { success: true, response: await response.json() };
    else return { success: false, response: response };
  }
  catch (error) {
    return { success: false, response: error };
  }
}