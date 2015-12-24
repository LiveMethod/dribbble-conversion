// get all dribbble shots
var allShots = document.getElementsByClassName("dribbble-shot");

// for every shot
for (var i = 0; i < allShots.length; i++){
  // var views = allShots[i].getElementsByClassName('views');

  // we can safely grab these based on 0 indeces
  // because there's only 1 views per shot, and 1 span per view
  
  // var span = views[0].getElementsByTagName('span')[0].textContent;
  var viewCount = allShots[i].getElementsByClassName('views')[0].getElementsByTagName('span')[0].textContent;

  // fav count is 2nd a tag (first is the clickable heart)
  var likeContainer = allShots[i].getElementsByClassName('fav')[0].getElementsByTagName('a')[1];
  var likeCount = likeContainer.textContent;

  // append originalLikeCount + (xx%)
  var likePercent = " (" + Math.round((likeCount/viewCount) * 100) + "%)";
  
  likeContainer.textContent = likeCount + likePercent;
} 