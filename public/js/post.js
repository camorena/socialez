$(document).ready(function() {
  $(".dual-nav").on("shown.bs.collapse", function() {
    $(".dual-navv").collapse("show");
  });
  $(".dual-nav").on("hidden.bs.collapse", function() {
    $(".dual-navv").collapse("hide");
  });

  $("ul.nav li.dropdown").hover(
    function() {
      $(this)
        .find(".dropdown-menu")
        .stop(true, true)
        .delay(200)
        .fadeIn(500);
    },
    function() {
      $(this)
        .find(".dropdown-menu")
        .stop(true, true)
        .delay(200)
        .fadeOut(500);
    }
  );

  //When distance from top = 250px fade button in/out
  $(window).scroll(function() {
    if ($(this).scrollTop() > 250) {
      $("#scrollup").fadeIn(300);
    } else {
      $("#scrollup").fadeOut(300);
    }
  });

  //On click scroll to top of page t = 1000ms
  $("#scrollup").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

  // Display Content on postContainer
  var postContainer = $(".container-fluid");

  AutenticatedUser();

  getPosts(getStorePostId());

  function getPosts(postId) {
    $.get("/api/posts/" + postId, function(data) {
      console.log(data);
      $(".header.page-post-2").css("background-image", "url('+data[0].imageUrl+')");
      
      //$("entry-content-2")
      //.find(".col-lg-8 offset-lg-2 col-md-10 offset-md-1").html(data[0]//.body);

      $(".author-avatar")
        .find("img").attr("src", data[0].User.avatarUrl);

      $(".comments-list")  
        .find("img-fluid")
        .each(function(index, element) {
          if (index < 3) {
            $(element).attr("src", data[index].User.avatarUrl);
          }
        });

      $(".post-comments").find("comments-list").find("img-fluid")
      .each(function(index, element) {
        if (index < 3) {
          $(element).html(data[index].User.name);
        }
      });
    
  
    //*  $(".comment-list")
    //    .find("author-name").html(data[0].User.name)
    //    .find("author-post").html(data[0].title)
    //    .find("author-time").html(data[0].updatedAt);
    //  $(".comment-content")
    //    .find("author-name").html(data[0].User.name)
    //    .find("author-post").html(data[0].title)
    //    .find("author-time").html(data[0].updatedAt)