const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const axios = require("axios");
const fs = require("fs");
const util = require('util');

const api = require('./utils/api.js');

// Require all npm packages and files

const questions = [
    // questions to user using "inquirer"
    {
        type: "input",
        message: "What is your GitHub user name?",
        name: "username",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },

    {
        type: "input",
        message: "What is your project Title?",
        name: "title",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid title for your project is required.");
            }
            return true;
        }
    },

    {
        type: "input",
        message: "What is your repo called?",
        name: "repo",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },

    {
        type: "input",
        message: "How do you describe your Project?.",
        name: "description",
    },

    {
        type: "input",
        message: "What are the steps required to install your project?",
        name: "install",
    },

    {
        type: "input",
        message: "Write instructions for using your project.",
        name: "usage",
    },

    {
        type: "input",
        message: "please enter git hub user names of the contributor if any (If there are mulitple contributor, seperate names with comma and no space! )",
        name: "contributors",
    },

    {
        type: "input",
        message: "Provide examples on how to run tests.",
        name: "test",
    },

    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license',
    }
];

//answers.username

function init() {
    inquirer.prompt(questions).then(answers => {
        console.log(answers);
        axios
            .get("https://api.github.com/users/" + answers.username)
            .then(response => {
                console.log(response);
                const imageURL = response.data.avatar_url;
                answers.image = imageURL;
                console.log(imageURL);
                fs.writeFile("README.md", generateMarkdown(answers), function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
    });
}

init();
