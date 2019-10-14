import http from "http";
import fetch from 'node-fetch';

export class PlacePassApi{
  static async getEnvironments(){
    const options = {
      headers: {
        Authorization: 'Bearer zKPc1VOkLzE_lPfszkKi0DY8g0xX56dRP4oyDRSX923J3QD5J-16MnxOi6KCques-QTIDH2sYDsLzlwKgtaHCywAAAA'
      },
      method: "GET"
    }

    const response = await fetch("http://interview.placepass.com/api/dibs/", options)
    const responseJson = await response.json();

    return await responseJson.envs
  }
}
