(function() { // protect the lemmings
// render the igPosts
const posts = [{
  title: "test first post",
  img: "images/sample-1.jpg"
}]
render(posts)


  // GET('/posts')
  //   .then((posts) => {
  //     render(posts);
  //   });
  //
  //   const post = document.querySelector('.js-add-post');
  //
  //   if (post !== null) {
  //     post.addEventListener('click', (e) => {
  //       const input = document.querySelector('.js-todo-body');
  //       const inputTitle = document.querySelector('.js-todo-title');
  //       input.setAttribute('disabled', 'disabled');
  //
  //       POST('/posts', {
  //       }).then((posts) => {
  //         input.removeAttribute('disabled');
  //         input.value = '';
  //         inputTitle.removeAttribute('disabled');
  //         inputTitle.value = '';
  //         render(posts);
  //       });
  //     })
  //     }

})();
