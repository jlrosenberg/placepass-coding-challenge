import fetch from 'node-fetch';

const AUTH_TOKEN = 'zKPc1VOkLzE_lPfszkKi0DY8g0xX56dRP4oyDRSX923J3QD5J-16MnxOi6KCques-QTIDH2sYDsLzlwKgtaHCywAAAA'

export class PlacePassApi{
  static async getEnvironments(){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "GET"
    }

    const response = await fetch("http://interview.placepass.com/api/dibs/", options)
    const responseJson = await response.json();

    return await responseJson.envs
  }

  static async getAppsAndReservationsForEnvironment(environment: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "GET"
    }

    const response = await fetch(`http://interview.placepass.com/api/dibs/${environment}`, options);
    const responseJson = await response.json();

    return await responseJson;
  }

  static async postNewReservation(environment: string, apps: Array<string>, description?: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "POST"
    }

    const postUrl = `http://interview.placepass.com/api/dibs/${environment}/?app=${apps.join("&app=")}${description ? "&description="+description : ''}`

    const response = await fetch(postUrl, options);
    return await response.json()
  }

  static async getReservation(environment: string, id: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "GET"
    }

    const response = await fetch(`http://interview.placepass.com/api/dibs/${environment}/${id}`)
    const responseJson = await response.json();

    return await responseJson.reservation
  }

  static async deleteReservationById(environment: string, id: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "DELETE"
    }

    const response = await fetch(`http://interview.placepass.com/api/dibs/${environment}/${id}`)
    const responseJson = await response.json();

    return await responseJson.reservation

  }

  static async deleteMostRecentReservation(environment: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "DELETE"
    }

    const response = await fetch(`http://interview.placepass.com/api/dibs/${environment}/`)
    const responseJson = await response.json();

    return await responseJson.reservation

  }
}
