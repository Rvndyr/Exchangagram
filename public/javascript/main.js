(function() { // protect the lemmings
// render the igPosts
  GET('/posts')
    .then((posts) => {
      render(posts);
    });


})();
