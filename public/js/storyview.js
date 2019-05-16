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

  autenticatedUser();

  //var userId = getUserId();
  var postId = getPostId();

  $.get("/api/posts/view/" + postId, function(data) {
    console.log(data);
    $("#story").css("background-image", "url(" + data.imageUrl + ")");
    $(".banner-comment").css("background-image", "url(" + data.imageUrl + ")");
    $(".entry-modified-time").attr("src", data.updatedAt);
    $("#title").html(data.title);
    $(".header-avatar")
      .find("img")
      .attr("src", data.User.avatarUrl);
    $("#usrname").html(data.User.name);
    $(".entry-content")
      .find("h4")
      .html(data.title);
    $("#body").html(data.body);
  });
});
