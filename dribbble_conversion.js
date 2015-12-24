var lastShotCount = 0;
var allShots = undefined;

function updateShotStats(){

  // for every shot
  for (var i = 0; i < allShots.length; i++){

    // we can safely grab these based on 0 indeces
    // because there's only 1 views per shot, and 1 span per view
    var viewCount = allShots[i].getElementsByClassName('views')[0].getElementsByTagName('span')[0].textContent;

    // fav count is 2nd a tag (first is the clickable heart)
    var likeCount = allShots[i].getElementsByClassName('fav')[0].getElementsByTagName('a')[1].textContent;

    viewCount = parseFloat(viewCount.replace(',',''));
    likeCount = parseFloat(likeCount.replace(',',''));

    // calculate percentage of viewers who liked, as string "(xx%)"
    var likePercent = Math.round((likeCount/viewCount) * 100) + "%";


    // the group (contains views, comments, likes, and soon pcnt)
    var group = allShots[i].getElementsByClassName('group')[0];

    // if a percentage LI exists,
    if (group.getElementsByClassName('percent').length > 0){
      pcnt = group.getElementsByClassName('percent')[0];
      pcnt.textContent = likePercent;
    } else {
      // create new LI to add to the group
      var pcnt = document.createElement('li');
      // add class
      pcnt.className += ' percent';
      // set its text
      pcnt.textContent = likePercent;

      // group.appendChild(pcnt);
      // group LIs are reverse floated, so first = last
      group.insertBefore(pcnt, group.firstChild);
      // append it
    }
  } // for every shot
}

function getAllShots(){
  shots = document.getElementsByClassName("dribbble-shot");
  return shots;
}

function checkShots(){
  allShots = getAllShots();

  if (allShots.length > lastShotCount){
    lastShotCount = allShots.length;
    updateShotStats();
  }
}

// init
checkShots();

// 4x/s 
setInterval(
  function(){
    checkShots();
  }, 
  250
);
