// const customersListsContainer = document.querySelector('.reviewsContainer')
const customerReview = document.querySelector('.content')
const customerImgPath = document.querySelector('.customerImg')
const customerName = document.querySelector('.customerName')

customersList = [
  {
    name: "Chris Hemsworth",
    photo: "customer1.png",
    content: "I love it! My kids and I love trying out different games in short period of time! Fast shipping as well, thank you for the games!",
  },
  {
    name: "Henry Cavill",
    photo: "customer2.png",
    content: "Great way to save money from buying games! Excellent customer servce and fast shipping time",
  },
  {
    name: "Ninja",
    photo: "customer3.png",
    content: "Sweet! More games for my streams!",
  },
  {
    name: "TSM Myth",
    photo: "customer4.png",
    content: "I like the idea of renting games, saves me money.",
  },
];

let count = 1;

function switchCustomers() {

  customerName.innerHTML = customersList[count].name;
  customerImgPath.src = "../images/aboutUsImages/" + customersList[count].photo;
  customerReview.innerHTML = customersList[count].content;

  count += 1;

  if (count >= customersList.length) {
    count = 0;
  }

}

setInterval(switchCustomers, 10000);
