(function() { // protect the lemmings
// render the igPosts

    function render(posts) {
      const container = document.querySelector('.js-post');
      container.innerHTML = '';
      console.log(posts)
      for (const post of posts) {
        console.log(post)
        const div = document.createElement('div');
        div.innerHTML =
        `
          <div class="col s12 m7">
            <div class="card hoverable center-align">
              <div class="card-image z-depth-3">
                <img src="images/sample-1.jpg">
                <span class="card-title">Card Title</span>
              </div>
            </div>
          </div>
        `
        div.classList.add('row')
        container.appendChild(div)

        const posts = [{
          title: "test first post",
          img: "images/sample-1.jpg"
        }];
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
