(function() { // protect the lemmings
    // render the igPosts

    function render(users) {
        console.log("here");
        const container = document.querySelector('.js-users');
        container.innerHTML = '';
        console.log(users)
        for (const user of users.users) {
            console.log(user);

            const div = document.createElement('div');
            div.innerHTML =
                `
        <div class="row">
          <div class="col s6 m6">
            <div class="card">
              <div class="card-image">
                <img src=${user.ACTIVITY_PAYLOAD}>
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


    const pageType = document.querySelector('body').getAttribute('data-template-name');

    if (pageType === 'feed') {
        // do some shit
        ajax.GET('/api/feed/:id')
            .then((users) => {
                // render(users);
            });
    } else if (pageType === 'login') {
        // do some other stuff etc
        loginPage();
    }
    else if (pageType === 'signup') {
        signupPage(); 
    }

    function signupPage() {
        const btn = document.querySelector('.js-login');

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.querySelector('.js-name').value;
            const email = document.querySelector('.js-email').value;
            const pw = document.querySelector('.js-password').value;

            ajax.POST('/auth/signup', {
                name: name,
                email: email,
                password: pw
            }).then((data) => {
                console.log(data)
                if (data.success) {
                    window.location.href = '/login.html'
                }
            });
        });
    }; 

    function loginPage() {
        const email = document.querySelector('.js-email');
        const pw = document.querySelector('.js-password');
        const btn = document.querySelector('.js-login')
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            ajax.POST('/auth/login', {
                email: email.value,
                password: pw.value,
            })
            .then((data) => {
                console.log('POST auth/login data', data);
                if (data.success) {
                    window.location.href = '/index.html'
                }
            });
        }); 
    };


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
