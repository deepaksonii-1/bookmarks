// fetching bookmarks if having
fetchBookmarks();


// listern for form submit
$('#myForm').on('submit',function(e){
  $siteName = $('#siteName').val();
  $siteUrl = $('#siteUrl').val();


if(!validation($siteName, $siteUrl)){
  console.log('false');
  return false;

}

  $bookmark = {
    name: $siteName,
    url: $siteUrl
  }

/*
   localStorage.setItem('test','my site hrere');
   console.log(localStorage.getItem('test'));
   localStorage.removeItem('test');
   console.log(localStorage.getItem('test'));

  */
  if(localStorage.getItem('bookmarks') === null){
    $bookmarks = [];
    $bookmarks.push($bookmark);
    localStorage.setItem('bookmarks', JSON.stringify($bookmarks));
  } else {
  $bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  $bookmarks.push($bookmark);
  localStorage.setItem('bookmarks', JSON.stringify($bookmarks));
  }

  document.getElementById("myForm").reset();
  fetchBookmarks();
  e.preventDefault();

});

//delete bookmarks
function deleteBookmark($url){
  $bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for ($i = 0; $i < $bookmarks.length; $i++) {
    if($bookmarks[$i]['url'] == $url){
      $bookmarks.splice($i,1);
      localStorage.setItem('bookmarks', JSON.stringify($bookmarks));
      fetchBookmarks();
    }
  }

}
//validation
function validation($siteName, $siteUrl){
  if(!$siteName || !$siteUrl){
    alert('Pleaes fill the form');
    return false;
  }

  $expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  $regex = new RegExp($expression);
  if(!$siteUrl.match($regex)){
    alert('Wrong url formate entered');
    return false;
  }
  return true;
}

// fetch bookmarks
function fetchBookmarks(){

$bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
$items ="";

if($bookmarks.length == 0){
  $items = "";
  $(".bookmarksResults").html($items);
}

for ($i = 0; $i < $bookmarks.length; $i++) {
  $name = $bookmarks[$i].name;
  $url = $bookmarks[$i].url;
  $items += '<div class="well">'+
            '<h3>'+$name+
            '<a class="btn btn-default" target="_blank" href="'+$url+'">Visit</a>'+
            '<a onclick="deleteBookmark(\''+$url+'\')" class="btn btn-default" href="#">Delete</a>'+
            '</h3>'+
            '</div>';
  $(".bookmarksResults").html($items);
}

};
/*'<div class="well">'+
          '<h3>'+$name+
          '</h3>'+
          '</div>'*/
