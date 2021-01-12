const commentForm = document.getElementById("comment-form");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const heart = document.getElementById("heart");
let pause = document.getElementById("pause");
const clock = document.getElementById("counter");
const likes = document.getElementsByClassName("likes");
const commentList = document.createElement("ul");
const comments = document.getElementById("list").appendChild(commentList);
const likeHash = {};
let isPaused = false;
let timerNum = 1;
const timer = function () {
  return setInterval(function () {
    clock.innerText++;
  }, 1000);
};
document.addEventListener("DOMContentLoaded", function () {
  timer();
  disable();
});

pause.addEventListener("click", function (e) {
  if (isPaused === false) {
    isPaused = true;
    clearInterval(timerNum);
    timerNum++;
    pause.innerText = "resume";
    disable();
  } else {
    timer();
    isPaused = false;
    pause.innerText = "pause";
    disable();
  }
});

function min() {
  clock.innerText--;
}
function add() {
  clock.innerText++;
}
function addLike() {
  const seconds = clock.innerText;
  if (likeHash[seconds]) {
    likeHash[seconds]++;
    document.getElementById(
      seconds
    ).innerText = `${seconds} seconds: ${likeHash[seconds]} likes`;
  } else {
    likeHash[seconds] = 1;
    let newLike = document.createElement("li");
    newLike.innerText = `${seconds} seconds: ${likeHash[seconds]} likes`;
    newLike.id = seconds;
    let num = 0;
    likes[num].appendChild(newLike);
    num++;
  }
}

function commentSubmit(event) {
  event.preventDefault();
  let comment = event.target.comment.value;
  let newLike = document.createElement("li");
  newLike.innerText = comment;
  const newComment = comments.appendChild(newLike);
}

function disable() {
  if (isPaused === false) {
    plus.addEventListener("click", add);
    minus.addEventListener("click", min);
    heart.addEventListener("click", addLike);
    commentForm.addEventListener("submit", function (e) {
      commentSubmit(e);
    });
  } else {
    minus.removeEventListener("click", min);
    plus.removeEventListener("click", add);
    heart.removeEventListener("click", addLike);
    commentForm.removeEventListener("submit", commentSubmit);
  }
}
