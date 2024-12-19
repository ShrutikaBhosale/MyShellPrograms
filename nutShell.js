let promptMsg = "DreamShell%";
let currentDirectory = '~';
let files = [];

function changePrompt(currentDir) {
  currentDirectory = '\\' + currentDir;
}

function echo(args) {
  return args;
}

function cd(args) {
  changePrompt(args);
}

function pwd(args) {
  return ' ' + currentDirectory + ' ';
}

function touch(args) {
  files.push(args);
}

function ls(args) {
  return files.join(' ');
}

function rm(args) {
  files = files.filter(function (element) {
    return element !== args;
  });
}

const runCommand = function (command, args) {
  const commands = ['echo', 'cd', 'pwd', 'touch', 'ls', 'rm'];
  const commandFun = [echo, cd, pwd, touch, ls, rm];

  for (let index = 0; index < commands.length; index++) {
    if (commands[index] === command) {
      return commandFun[index](args);
    }
  }
  return 'command not found ' + command;
};

function runShell() {
  while (true) {
    const commandDescription = prompt(promptMsg + '\\' + currentDirectory);
    const [command, ...args] = commandDescription.split(' ');
    const result = runCommand(command, args.join(' '));

    if (result !== undefined) {
      console.log(result);
    }
  }
}

runShell();

