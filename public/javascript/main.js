(function() { // protect the lemmings
// render the igPosts

    function render(users) {
      console.log("here");
      const container = document.querySelector('.js-users');
      container.innerHTML = '';
      console.log(users)
      for(const user of users.users){
        console.log(user);

        const div = document.createElement('div');
        div.innerHTML =
        `
        <div class="row">
          <div class="col s6 m6">
            <div class="card">
              <div class="card-image">
                <img src="images/sample-1.jpg">
                </div>
                <div class="card-content">
                <span class="card-title">${user.EMAIL}</span>
                <a class="waves-effect waves-light btn right">Follow</a>
              </div>
              </div>
            </div>
          </div>
        `
        div.classList.add('row')
        container.appendChild(div)
      }
    };


ajax.GET('/api/users')
		.then((users) => {
			render(users);
    });

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
