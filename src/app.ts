#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import path from 'path';
import program from 'commander';
import { PlacePassApi } from './apis/PlacePassApi';

main();

// placepass-cli display users
// placepass-cli display environments
// placepass-cli display user {usercode}
// placepass-cli reserve {env}
// placepass-cli reserve {env} {microservice} {microservice} ...
// placepass-cli release {env}
// placepass-cli release {env} {reservation_id}
// placepass-cli help
// placepass-cli version

async function main(){
  console.log(process.argv)
  // the first relevant argument is the third argument, first two are ts-node and path to this file
  if(process.argv.length == 2){
    console.error(chalk.red("No command provided. For more specific instructions on how to use this app, please try \"./placeplass-cli help\""))
  }
  console.log(process.argv)

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
    chalk.green(
      figlet.textSync('placepass-cli', { horizontalLayout: 'full' })
    )
  );
}

function version(){
  console.log("placepass-cli 0.1.0");
}

function release(){

}

function reserve(){

}

async function display(){
  if(process.argv[3] == "environments"){
    await displayEnvironments()
  }else if(process.argv[3] == "users"){
    await displayUsers()
  }else{
    console.error(chalk.red("Invalid syntax. The 'display' command must be followed by either 'environments' or 'users'"))
  }
}

async function displayEnvironments(){
  const environments: Array<String> = await PlacePassApi.getEnvironments(); 
  
  console.log("Environments:")
  environments.forEach(env => {
    console.log(`\t${env}`)
  });

}

async function displayUsers(){

}