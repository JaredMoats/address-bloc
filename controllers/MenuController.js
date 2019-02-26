const inquirer = require('inquirer');
const ContactController = require("./ContactController");

module.exports = class MenuController {
  constructor() {
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
          "Date",
          "Exit"
        ]
      }
    ];
    this.book = new ContactController();
  }

  addContact() {
    this.clear();
    inquirer.prompt(this.book.addContactQuestions).then(answers => {
      this.book.addContact(answers.name, answers.phone).then(contact => {
        console.log("Contact added successfully!");
        this.main();
      }).catch(error => {
        console.log(error);
        this.main();
      })
    });
  }

  clear() {
    console.log("\x1Bc");
  }

  exit() {
    console.log("Thanks for using AddressBloc!");
    process.exit();
  }

  getContactCount() {
    return this.contacts.length;
  }

  getDate() {
    let dateObject = new Date();
    let time= dateObject.getHours() + ":" + dateObject.getMinutes();

    let date = (dateObject.getMonth() + 1) + "/" + dateObject.getDate()
               + "/" + dateObject.getFullYear();

    this.clear();
    console.log(`It is ${time} on ${date}`);
    this.main();
  }

  main() {
    console.log(`Welcome to AddressBloc!`);
    inquirer.prompt(this.mainMenuQuestions).then(response => {
      switch(response.mainMenuChoice) {
        case "Add new contact":
          this.addContact();
          break;
        case "Date":
          this.getDate();
          break;
        case "Exit":
          this.exit();
        default:
          console.log("Invalid input");
          this.main();
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  remindMe() {
    return "Learning is a life-long pursuit";
  }
}//end of class
