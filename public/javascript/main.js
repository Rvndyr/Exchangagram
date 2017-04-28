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
    ajax.GET('/api/users')
        .then((users) => {
            render(users);
        });

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
    } else if (pageType === 'signup') {
        signupPage();
    }

    function signupPage() {
        const btn = document.querySelector('.js-login');

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.querySelector('.js-name').value;
            const email = document.querySelector('.js-email').value;
            const pw = document.querySelector('.js-password').value;
            console.log("button clicked")
            ajax.POST('/signup', {
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
    // render posts on the feed page
    // function render(feed) {
    //     console.log("feed function here!");
    //     const container = document.querySelector('.js-posts');
    //     container.innerHTML = '';
    //     console.log(feed)
    //     for (const feed of users.users) {
    //         console.log(feed);
    //
    //         const div = document.createElement('div');
    //         div.innerHTML =
    //             `
    //     <div class="row">
    //       <div class="col s6 m6">
    //         <div class="card">
    //           <div class="card-image">
    //             <img src=${user.ACTIVITY_PAYLOAD}>
    //             </div>
    //             <div class="card-content">
    //             <span class="card-title">${user.EMAIL}</span>
    //             <a class="waves-effect waves-light btn right">Follow</a>
    //           </div>
    //           </div>
    //         </div>
    //       </div>
    //     `
    //         div.classList.add('row')
    //         container.appendChild(div)
    //     }


})();
