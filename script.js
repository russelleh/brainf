draw = function(program, program_pointer, tape, tape_pointer) {
  output = Array(program_pointer + 1).join(' ') + '^'
  output += '\n';
  for (i = 0; i < tape.length; i++) {
    if (i == tape_pointer) {
      point = "> ";
    } else {
      point = "  ";
    }
    output += point + tape[i] + '\n';
  }
  return output;
}

compute = function(program, program_pointer, tape, tape_pointer) {
  if (!tape.length) {
    tape = [0];
  }

  if (tape_pointer == tape.length) {
    tape.push(0);
  }

  if (program_pointer < program.length) {
    switch(program[program_pointer]) {
      case ' ':
        program_pointer += 1;
        break;
      case '>':
        tape_pointer    += 1;
        program_pointer += 1;
        if (tape_pointer >= tape.length) {
          tape.push(0);
        }
        break;
      case '<':
        if (tape_pointer) {
          tape_pointer -= 1;
        }
        program_pointer += 1;
        break;
      case '+':
        tape[tape_pointer] += 1;
        program_pointer    += 1;
        break;
      case '-':
        if (tape[tape_pointer]) {
          tape[tape_pointer] -= 1;
        };
        program_pointer += 1;
        break;
      case '[':
        program_pointer += 1;
        break;
      case ']':
        if (tape[tape_pointer] > 0) {
          nest = 1;
          while (nest > 0) {
            program_pointer -= 1;
            if (program[program_pointer] == '[') {
              nest -= 1;
            } else if (program[program_pointer] == ']') {
              nest += 1;
            }
          }
        } else {
          program_pointer += 1;
        }
    }

    return [program, program_pointer, tape, tape_pointer];
  }
}

document.addEventListener('DOMContentLoaded', function() {
  interval = null;
  program  = document.getElementById('program');
  program.addEventListener('keyup', function(e) {
    clearInterval(interval);

    tape            = [];
    tape_pointer    = 0;
    program         = e.target.value;
    program_pointer = 0;

    var element = document.getElementById('output');
    output = draw(program, program_pointer, tape, tape_pointer);
    element.innerHTML = output;

    interval = setInterval(function() {
      [program, program_pointer, tape, tape_pointer] = compute(program, program_pointer, tape, tape_pointer);
      output = draw(program, program_pointer, tape, tape_pointer);
      element.innerHTML = output;
    }, 250);
  }); 
  program.select(); 
}, false);
