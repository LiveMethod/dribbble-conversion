// store the number of shots when last checked
var lastShotCount = 0;
// will become an array of shot DOM nodes
var allShots = undefined;

// loop for pages with many shots
function updateMultiShotPage(){
  // for every shot
  for (var i = 0; i < allShots.length; i++){

    // we can safely grab these based on 0 indeces
    // because there's only 1 views per shot, and 1 span per view
    var viewCount = allShots[i].getElementsByClassName('views')[0].getElementsByTagName('span')[0].textContent;
    // strip commas
    viewCount = cleanDigits(viewCount);

    // fav count is 2nd a tag (first is the clickable heart)
    var likeCount = allShots[i].getElementsByClassName('fav')[0].getElementsByTagName('a')[1].textContent;
    // strip commas
    likeCount = cleanDigits(likeCount);

    // calculate percentage of viewers who liked, as string "(xx%)"
    var likePercent = Math.round((likeCount/viewCount) * 100) + "%";

    // the group (contains views, comments, likes, and soon pcnt)
    var group = allShots[i].getElementsByClassName('group')[0];

    // if a percentage LI exists,
    if (group.getElementsByClassName('percent').length > 0){
      // use existing tag
      pcnt = group.getElementsByClassName('percent')[0];
      pcnt.textContent = likePercent;
    } else {
      // create new li to add to the group
      var pcnt = document.createElement('li');
      // add class
      pcnt.className += ' percent';
      // set its text
      pcnt.textContent = likePercent;

      // group LIs are reverse floated, so first = last
      group.insertBefore(pcnt, group.firstChild);
      // append it
    }
  } // for every shot
}

// individual shot pages
function updateSinglePage(){
  // get the main shot
  var mainShot = document.getElementsByClassName('main-shot')[0];
  
  var viewCount = mainShot.getElementsByClassName('meta-views')[0].textContent;
  // split string
  viewCount = viewCount.split(' ')[0];
  // strip commas
  viewCount = cleanDigits(viewCount);


  // regex the numbers out of the "x likes" string
  var likeCount = mainShot.getElementsByClassName('fav-number')[0].getElementsByTagName('a')[0].textContent;
  // strip commas
  likeCount = cleanDigits(likeCount);
  
  // // calculate percentage of viewers who liked, as string "(xx%)"
  var likePercent = "(" + Math.round((likeCount/viewCount) * 100) + "%)";

  // if a percentage li already exists,
  if (mainShot.getElementsByClassName('percent').length > 0){
    // use existing tag
    pcnt = mainShot.getElementsByClassName('percent')[0];
    pcnt.textContent = likePercent;
  } else {
    // make a span
    var pcnt = document.createElement('span');
    // add class
    pcnt.className += ' percent';
    // set its text
    pcnt.textContent = likePercent;
    // append to doc
    mainShot.getElementsByClassName('fav-number')[0].getElementsByTagName('a')[0].appendChild(pcnt);
  }
}

// get all shots on a multiple shot page
function getAllShots(){
  shots = document.getElementsByClassName("dribbble-shot");
  return shots;
}

// check for new shots
function checkShots(){
  allShots = getAllShots();

  // the 'main-shot' class is distinct to the single page,
  // so this is a cheap way to determine which page type we're on
  if (document.getElementsByClassName('main-shot').length > 0){
    updateSinglePage();
  }

  // if there are new shots (due to ajax loads), update.
  if (allShots.length > lastShotCount){
    lastShotCount = allShots.length;
    updateMultiShotPage();
  }
}

// clean up numbers with commas
function cleanDigits(data){
  return parseFloat(data.replace(',',''));
}

// init
checkShots();

// 4x/s
var lazyLoadChecker = setInterval(
  function(){
    checkShots();
  },
  // this number could be tweaked...
  250
);
