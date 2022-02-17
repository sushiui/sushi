var changeBackground = function() {
  console.log("in change background");
  var ssContainer = document.getElementsByClassName('ss-container')[0];
  ssContainer.style.backgroundImage = "url('https://source.unsplash.com/1440x1440?sig=" + Math.random();
}

