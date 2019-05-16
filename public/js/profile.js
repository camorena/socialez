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

  var user = getId();

  if (user) {
    getUserStories();
  }

  function getUserStories() {
    $.get("/api/posts/user/" + user, function(data) {
      console.log("Stories :", data);
      $(".profile-bg-picture").css(
        "background-image",
        "url(" + data[0].imageUrl + ")"
      );
      $("#usrimg").attr("src", data[0].User.avatarUrl);
      $("#usrname").html(data[0].User.name);
      $("#cardname").html(data[0].User.name);
      $(".author-post")
        .find("img")
        .each(function(index, element) {
          if (index < 4) {
            $(element).attr("src", data[0].User.avatarUrl);
          }
          //console.log("Object <a> : ", element, index);
        });
      $(".entry-thumbnail")
        .find("img")
        .each(function(index, element) {
          if (index < 4) {
            $(element).attr("src", data[index].imageUrl);
          }
          //console.log("Object <img> : ", element, index);
        });
      $(".entry-title").each(function(index, element) {
        if (index < 4) {
          $(element).html(data[index].title);
        }
        //console.log("Object <img> : ", element, index);
      });
      $(".entry-title")
        .next()
        .each(function(index, element) {
          if (index < 4) {
            $(element).html(data[index].body);
          }
          //console.log("Object <img> : ", element, index);
        });
    });
  }

  // The API object contains methods for each kind of request we'll make
  var API = {
    viewed: function(id) {
      $.get("/api/posts/views" + id, function(data) {
        knum = formatToUnits(data[0].views, 2);
        var view = document.querySelector("li[post=" + id + "]");
        view[0].html(knum);
      });
    }
  };
});
