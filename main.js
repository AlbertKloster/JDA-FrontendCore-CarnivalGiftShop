const input = require('sync-input');

let totalTickets = 0;

function Gift(name, price, id) {
  this.name = name;
  this.price = price;
  this.id = id;
}

const gifts = [
  new Gift("Teddy Bear", 10, 1),
  new Gift("Big Red Ball", 5, 2),
  new Gift("Huge Bear", 50, 3),
  new Gift("Candy", 8, 4),
  new Gift("Stuffed Tiger", 15, 5),
  new Gift("Stuffed Dragon", 30, 6),
  new Gift("Skateboard", 100, 7),
  new Gift("Toy Car", 25, 8),
  new Gift("Basketball", 20, 9),
  new Gift("Scary Mask", 75, 10),
];

const printWelcome = () => {
   console.log(`WELCOME TO THE CARNIVAL GIFT SHOP!
Hello friend! Thank you for visiting the carnival!`);
};

const printList = () => {
  console.log("Here's the list of gifts:\n");
  gifts.forEach(gift => console.log(`${gift.id}- ${gift.name}, Cost: ${gift.price} tickets`));
};

const getNumber = (message) => {
  return Number(input(message));
};

const getAction = () => {
  let number;
  while (true) {
    number = getNumber(`What do you want to do?
1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n`);
    if (isNaN(number)) printPleaseEnterValidNumber();
    else if (number < 1 || number > 5) printPleaseEnterValidNumber();
    else return number;
  }
};

const printPleaseEnterValidNumber = () => {
  console.log("Please enter a valid number!");
};

const printPleaseEnterNumberBetween = (min, max) => {
  console.log(`Please enter a valid number between ${min} and ${max}.`);
};

const buyGift = () => {
  if (gifts.length === 0) {
    console.log("Wow! There are no gifts to buy.")
    return;
  }
  const id = getNumber("Enter the number of the gift you want to get: ");
  if (isNaN(id)) {
    printPleaseEnterValidNumber();
    return;
  }
  const gift = getGift(id);
  if (gift === null) {
    console.log("There is no gift with that number!");
    return;
  }
  if (totalTickets < gift.price) {
    console.log("You don't have enough tickets to buy this gift.");
    return;
  }
  removeGift(id);
  console.log(`Here you go, one ${gift.name}!`);
  totalTickets -= gift.price;
  printTotalTickets();
};

const getGift = (id) => {
  for (let gift of gifts) {
    if (gift.id === id) return gift;
  }
  return null;
}

const removeGift = (gift) => {
  const index = getIndex(gift);
  if (index === -1) return null;
  return gifts.splice(index, 1)[0];
};

const getIndex = (id) => {
  for (let i = 0; i < gifts.length; i++) {
    if (gifts[i].id === id) return i;
  }
  return -1;
};

const printTotalTickets = () => {
  console.log(`Total tickets: ${totalTickets}`);
};

const addTickets = () => {
  const amount = getNumber("Enter the ticket amount: ");
  if (isNotAmount(amount)) {
    printPleaseEnterNumberBetween(0, 1000);
    return;
  }
  totalTickets += amount;
  printTotalTickets();
};

const isNotAmount = (amount) => {
  return isNaN(amount) || amount < 0 || amount > 1000;
}

const performAction = () => {
  while (true) {
    const action = getAction();
    if (action === 1) buyGift();
    if (action === 2) addTickets();
    if (action === 3) printTotalTickets();
    if (action === 4) printList();
    if (action === 5) return;
  }
};

const printBye = () => {
  console.log("Have a nice day!");
};

printWelcome();
printList();
performAction();
printBye();