function openFridge(...foods) {
 console.log(foods);
}

const food1 = "bread";
const food2 = "pizza";
const food3 = "ice cream";
const food4 = "hamburger";

openFridge(food1,food2,food3,food4);

function combineStrings(...strings) {
  return strings.join(" ");
}

const fullName = combineStrings("Mr.","spongebob","squarepants","III");
console.log(fullName);