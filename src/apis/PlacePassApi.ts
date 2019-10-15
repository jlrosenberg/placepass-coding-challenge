import fetch from 'node-fetch';
import chalk from 'chalk';

// const AUTH_TOKEN = 'zKPc1VOkLzE_lPfszkKi0DY8g0xX56dRP4oyDRSX923J3QD5J-16MnxOi6KCques-QTIDH2sYDsLzlwKgtaHCywAAAA'
const AUTH_TOKEN = 'tt9LvwYCtArvQVCmyeydTdIwfgx-DF-rwpuVY1Keh-0SfnBU4p1n5lxPVtYmp_6XyvSU_BBl7gYhN3vrLm9tAhYAAAA'
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

    if(!responseJson.ok){
      console.error(chalk.red(responseJson.error)) 
      process.exit(0)
    }

    return await responseJson.envs
  }

  static async getAppsAndReservationsForEnvironment(environment: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "GET"
    }

    // console.log(`http://interview.placepass.com/api/dibs/${environment}/`)
    const response = await fetch(`http://interview.placepass.com/api/dibs/${environment}/`, options);
    const responseJson = await response.json();
    if(!responseJson.ok){
      console.error(chalk.red(responseJson.error)) 
      process.exit(0)
    }


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

    const response = await fetch(postUrl, options)
    const responseJson = await response.json();
    if(!responseJson.ok){
      console.error(chalk.red(responseJson.error)) 
      process.exit(0)
    }

    console.log(chalk.green("Status of your new reservation is: " + responseJson.reservation.status))
    return await responseJson
  }

  static async getReservation(environment: string, id: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "GET"
    }

    const response = await fetch(`http://interview.placepass.com/api/dibs/${environment}/${id}/`, options)
    const responseJson = await response.json();

    if(!responseJson.ok){
      console.error(chalk.red(responseJson.error)) 
      process.exit(0)
    }

    return await responseJson.reservation
  }

  static async deleteReservationById(environment: string, id: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "DELETE"
    }

    const response = await fetch(`http://interview.placepass.com/api/dibs/${environment}/${id}`, options)
 
    const result = await response.json();
    if(!result.ok){
      console.error(chalk.red(result.error))
    }else{
      console.log(chalk.green("Success!"))
    }
  }

  static async deleteOldestReservation(environment: string){
    const options = {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      method: "DELETE"
    }

    const response = await fetch(`http://interview.placepass.com/api/dibs/${environment}/`, options)
    const result = await response.json();
    if(!result.ok){
      console.error(chalk.red(result.error))
    }else{
      console.log(chalk.green("Success!"))
    }

    return await result

  }
}
