// Switching Panel Animation

left = document.querySelector(".left");
right = document.querySelector(".right");
container = document.querySelector(".container");

left.addEventListener("mouseenter", function(){   // Anonymous function doesn't need seperate declaration: efficient
  container.classList.add('hover-left');
});
left.addEventListener("mouseleave", function(){
  container.classList.remove('hover-left');
});
right.addEventListener("mouseenter", function(){
  container.classList.add('hover-right');
});
right.addEventListener("mouseleave", function(){
  container.classList.remove('hover-right');
});
