const developer = { name: "JavaScript Developer", level: "Beginner", day: 21 };

function greetDeveloper(person) {
  console.log("Hello, " + person.name + "!");
  console.log("Current Day: " + person.day);
  console.log("Level: " + person.level);
}

greetDeveloper(developer);
