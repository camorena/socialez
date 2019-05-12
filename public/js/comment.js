$(document).ready(function() {
  /* global moment */

  // commentContainer holds all of our comments
  var commentContainer = $(".comment-container");
  var commentCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleCommentDelete);
  $(document).on("click", "button.edit", handleCommentEdit);
  // Variable to hold our comments
  var comments;

  // The code below handles the case where we want to get comment comments for a specific post
  // Looks for a query param in the url for post_id
  var url = window.location.search;
  var postId;
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getComments(postId);
  }
  // If there's no postId we just get all comments as usual
  else {
    getComments();
  }

  // This function grabs comments from the database and updates the view
  function getComments(post) {
    postId = post || "";
    if (postId) {
      postId = "/?post_id=" + postId;
    }
    $.get("/api/comments" + postId, function(data) {
      console.log("Comments", data);
      comments = data;
      if (!comments || !comments.length) {
        displayEmpty(post);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete comments
  function deleteComment(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + id
    }).then(function() {
      getComments(commentCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed comment HTML inside commentContainer
  function initializeRows() {
    commentContainer.empty();
    var commentsToAdd = [];
    for (var i = 0; i < comments.length; i++) {
      commentsToAdd.push(createNewRow(comments[i]));
    }
    commentContainer.append(commentsToAdd);
  }

  // This function constructs a comment's HTML
  function createNewRow(comment) {
    var formattedDate = new Date(comment.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newCommentCard = $("<div>");
    newCommentCard.addClass("card");
    var newCommentCardHeading = $("<div>");
    newCommentCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newCommentTitle = $("<h2>");
    var newCommentDate = $("<small>");
    var newCommentPost = $("<h5>");
    newCommentPost.text("Written by: " + comment.Post.name);
    newCommentPost.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    var newCommentCardContent = $("<div>");
    newCommentCardContent.addClass("card-content");
    var newCommentContent = $("<p>");
    newCommentContent.text(comment.content);
    newCommentDate.text(formattedDate);
    newCommentTitle.append(newCommentDate);
    newCommentCardHeading.append(deleteBtn);
    newCommentCardHeading.append(editBtn);
    newCommentCardHeading.append(newCommentPost);
    newCommentCardContent.append(newCommentContent);
    newCommentCard.append(newCommentCardHeading);
    newCommentCard.append(newCommentCardContent);
    newCommentCard.data("comment", comment);
    return newCommentCard;
  }

  // This function figures out which comment we want to delete and then calls deleteComment
  function handleCommentDelete() {
    var currentComment = $(this)
      .parent()
      .parent()
      .data("comment");
    deleteComment(currentComment.id);
  }

  // This function figures out which comment we want to edit and takes it to the appropriate url
  function handleCommentEdit() {
    var currentComment = $(this)
      .parent()
      .parent()
      .data("comment");
    window.location.href = "/cms?comment_id=" + currentComment.id;
  }

  // This function displays a message when there are no comments
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Post #" + id;
    }
    commentContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No comments yet" +
        partial +
        ", navigate <a href='/cms" +
        query +
        "'>here</a> in order to get started."
    );
    commentContainer.append(messageH2);
  }
});
