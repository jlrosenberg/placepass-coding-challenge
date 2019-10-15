#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import path from 'path';
import { PlacePassApi } from './apis/PlacePassApi';
import { ReservationStore } from './stores/ReservationStore';
import { User } from './models/User';

main();

// placepass-cli display users {env}
// placepass-cli display environments 
// placepass-cli reserve {env}
// placepass-cli reserve {env} {microservice} {microservice} ...
// placepass-cli release {env}
// placepass-cli release {env} {reservation_id}
// placepass-cli help
// placepass-cli version

async function main(){
  // console.log(process.argv)
  // the first relevant argument is the third argument, first two are ts-node and path to this file
  if(process.argv.length == 2){
    console.error(chalk.red("No command provided. For more specific instructions on how to use this app, please try \"./placeplass-cli help\""))
  }
  // console.log(process.argv)

  if(process.argv[2] == "help"){
    help();
  }else if(process.argv[2] == "version"){
    version();
  }else if(process.argv[2] == "display"){
    await display();
  }else if(process.argv[2] == "reserve"){
    reserve();
  }else if(process.argv[2] == "release"){
    release();
  }else{
    console.error(chalk.red("Invalid command provided. For more specific instructions on how to use this app, please try \"./placeplass-cli help\""))
  }
}

function help(){
  console.log(
    chalk.blue(
      figlet.textSync('placepass-cli', { horizontalLayout: 'full' })
    )
  );
  console.log("\n\n")
  console.log("placepass-cli display users {env}")
  console.log("placepass-cli display environments ")
  console.log("placepass-cli reserve {env} {microservice} {microservice} ...")
  console.log("placepass-cli release {env}")
  console.log("placepass-cli release {env} {reservation_id}")
  console.log("placepass-cli help")
  console.log("placepass-cli version")
}

function version(){
  console.log("placepass-cli 0.1.0");
}

function release(){
  if(process.argv.length == 3){
    console.error(chalk.red("Invalid syntax. Specify the environment, an optionally the reservation id that you would like to release"))
  }else{
    // delete the oldest one
    if(process.argv.length == 4){
      PlacePassApi.deleteOldestReservation(process.argv[3])
    }else{
      PlacePassApi.deleteReservationById(process.argv[3], process.argv[4])
    }
  }

}

function reserve(){
  if(process.argv.length == 3 || process.argv.length == 4){
    console.error(chalk.red("Invalid syntax. Specify the environment and apps to reserve"));
  }else{
    let apps = []
    for(let i = 4; i<process.argv.length; i++){
      apps.push(process.argv[i])
    }
    
    PlacePassApi.postNewReservation(process.argv[3], apps)
  }
}

async function display(){
  const errorMessage = "Invalid syntax. The 'display' command must be followed by either 'environments' or 'users'"

  if(process.argv.length == 3){
    console.error(chalk.red(errorMessage))
  }else if(process.argv[3] == "environments"){
    await displayEnvironments()
  }else if(process.argv[3] == "users"){
    await displayUsersForEnvironment()
  }else{
    console.error(chalk.red(errorMessage))
  }
}

async function displayEnvironments(){
  const environments: Array<String> = await PlacePassApi.getEnvironments(); 
  
  console.log(chalk.bold("Environments:"))
  environments.forEach(env => {
    console.log(`  - ${env}`)
  });

}

async function displayUsersForEnvironment(){
  const errorMessage = "Invalid syntax. You must specify the environment to fetch the reservations for."
  if(process.argv.length == 4){
    console.error(chalk.red(errorMessage));
  }else{
    await ReservationStore.getInstance().loadReservationsForEnvironment(process.argv[4])
    let res = ReservationStore.getInstance().getReservationsByUser()
    console.log(chalk.bold("Reservations: "))
    res.forEach((value, key) => {
      console.log(`  Reservations for ${value[0].user.name}(${key})`)
      value.forEach(reservation => {
        console.log(`    Reservation ${reservation.id}`)
        if(reservation.description){
          console.log(`      Description: ${reservation.description}`)
        }
        console.log(`      Status: ${reservation.status}`)
        console.log(`      Apps: ${reservation.apps.join(", ")}`)
        console.log(`      Created: ${reservation.created.toString()}`)
        console.log(`      Updated: ${reservation.updated.toString()}\n`)
      })
    })
  }
}
