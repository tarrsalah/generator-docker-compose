"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.port = 3000;
  }
  prompting() {
    this.log(
      yosay("Welcome to the  " + chalk.red("docker-compose") + " generator!")
    );

    const prompts = [
      {
        type: "confirm",
        name: "adminer",
        message: "Would you like to generate adminer service?",
        default: true
      },

      {
        type: "input",
        name: "port",
        message: "Main listening port",
        default: this.port
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("docker-compose.yaml"),
      this.destinationPath("docker-compose.yaml"),
      { port: this.props.port, adminer: this.props.adminer }
    );
  }
};
