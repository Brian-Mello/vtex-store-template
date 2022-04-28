import { RequestData } from "../interfaces/home/FirstVisitModal";
import axios from 'axios'

export const checkExistentEmail = async (requestData: RequestData, callbackMethod?: any) => {
  console.log("request data", requestData)
    try {
      const result = await axios.get(`${window.location.origin}/api/dataentities/${requestData.entity}/search?_where=(${requestData.field}=${requestData.searchField})&fields=_all`);

      if(result.data.length > 0){
        return false
      } else {
        if(requestData.hasPostMethod === false) {
          return result.data;
        }
        mdRequest(requestData)
        callbackMethod()
        return true
      }

    } catch (error) {
      console.log(error);
      return false
    }
}

const mdRequest = async ({entity, data}: RequestData) => {

  const postData: any = {
    entity,
    data
  }

  try {
    await axios.post(
      `${window.location.origin}/api/dataentities/${entity}/documents`,
      postData
    );

  } catch (error) {
    console.log(error);
  }
};