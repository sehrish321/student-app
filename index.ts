#!/usr/bin/env node
import crypto from 'crypto'
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation  from 'chalk-animation';
import figlet from 'figlet';

const sleep=()=>new Promise((resolve)=>setTimeout((resolve),2000));

async function welcomeScreen(){
    let title=chalkAnimation.rainbow(figlet.textSync('STUDENT APP'))
    await sleep();
    title.stop();
}
await welcomeScreen();

class Student{
    name:string;
    id:string;
    course:string[];
    balance=0
    
    constructor(name:string,course:string[]){
        this.name=name;
        this.id=crypto.randomBytes(3).toString('hex');
        this.course=course
    }
    studentBalance=(amount:number)=>{

        this.balance=this.balance+amount

    }
    payFees=()=>{
        if(this.balance>=4500){
            this.balance=this.balance-4500
        }else{
            console.log('insufficent balance:')
        }
    }
    display=()=>{
        console.log(`
            ${chalk.bold("StudentName")}: ${chalk.red(this.name)}
            ${chalk.bold('id')}:          ${chalk.red(this.id)}
            ${chalk.bold('balance:')}:    ${chalk.red(this.balance)}
            ${chalk.bold('Course')}:      ${chalk.red(this.course)}
        `)
    }
}
const main=async()=>{
const input=await inquirer.prompt([
    {
        type:'string',
        name:"studentName",
        message:"Enter A Name:"
    },
    {
        type:"number",
        name:"studentAmount",
        message:"Enter Student Deposit Amount:"
    },
    {
        type:"checkbox",
        name:"Course",
        message:"Select Courses:",
        choices:["Web 3.0",'Generative AI']
    },
    {
        type:"list",
        name:"fee",
        message:"selec option:",
        choices:['pay fee','no']
    }
])

const student1=new Student(input.studentName,input.Course);
student1.studentBalance(input.studentAmount)
if(input.fee=='pay fee'){
    student1.payFees();
}
student1.display()

}

main();
