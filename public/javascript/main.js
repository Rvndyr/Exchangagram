(function() { // protect the lemmings // render the igPosts
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
                </div>
                <div class="card-content">
                <span class="card-title">${user.EMAIL}</span>
                <a class="waves-effect waves-light btn right js-dyn" data-user-id="${user.ID}">Follow</a>
              </div>
            `
            div.classList.add('row')
            container.appendChild(div)
        }
    };


    const pageType = document.querySelector('body').getAttribute('data-template-name');

    if (pageType === 'feed') {
          ajax.GET('api/user/'+localStorage.getItem('user_id'))
          .then((activities)=> {
            renderMyFeed(activities);
          });
          ajax.GET(`api/${localStorage.getItem('user_id')}/followedusers`)
              .then((activities)=> {
                console.log("2");
                renderFeed(activities);
              });

    } else if (pageType === 'login') {
        // do some other stuff etc
        loginPage();
    } else if (pageType === 'signup') {
        signupPage();
    }
    else if (pageType === 'profile') {
      ajax.GET('/api/feed/'+localStorage.getItem('user_id'))
          .then((activity) => {
            renderMyFeed(activity);
    });
  }
    else if (pageType === 'users') {
        ajax.GET('/api/users')
            .then((users) => {
                 render(users);
            });
        follow();
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
                    username: email.value,
                    password: pw.value,
                })
                .then((data) => {
                    console.log('POST auth/login data', data);
                    localStorage.setItem('user_id', data.Id)
                    if (data.success) {
                        window.location.href = '/index.html'
                    }
                });
        })
    };

    // render posts on the myProfile page
    function renderMyFeed(activities) {
        const userId = localStorage.getItem('user_id')
        console.log(activities);
        if(document.querySelector('.js-profileFeed') === null){
           const container = document.querySelector('.js-Feed');

           container.innerHTML = '';
           console.log(activities);
           for (const post of activities.user) {
               console.log(post);

               const div = document.createElement('div');
               div.innerHTML =
                   `
           <div class="row">
             <div class="col s6 m6">
               <div class="card">
                 <div class="card-content">
                   <span class="card-title">${userId}</span>
                 </div>
                 <div class="card-image">
                   <img src="${post.ACTIVITY_PAYLOAD}">
                   </div>
                 </div>
               </div>
             </div>
           `
               div.classList.add('row')
               container.appendChild(div)
               console.log(post.ACTIVITY_PAYLOAD);
           }
        }
        else {
          const container = document.querySelector('.js-profileFeed');
          console.log(container);
          container.innerHTML = '';
          for (const post of activities.activity) {
              console.log(post);

              const div = document.createElement('div');
              div.innerHTML =
                  `
          <div class="row">
            <div class="col s6 m6">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">${userId}</span>
                </div>
                <div class="card-image">
                  <img src="${post.ACTIVITY_PAYLOAD}">
                  </div>
                </div>
              </div>
            </div>
          `
              div.classList.add('row')
              container.appendChild(div)
              console.log(post.ACTIVITY_PAYLOAD);
          }

        }
      }

      function renderFeed (activities) {
        const userId = localStorage.getItem('user_id')
        console.log(activities);
        const container = document.querySelector('.js-Feed');
        container.innerHTML = '';
        for (const post of activities.followed_users) {
            console.log(post);

            const div = document.createElement('div');
            div.innerHTML =
                `
        <div class="row">
          <div class="col s6 m6">
            <div class="card">
              <div class="card-content">
                <span class="card-title">${userId}</span>
              </div>
              <div class="card-image">
                <img src="${post.ACTIVITY_PAYLOAD}">
                </div>
              </div>
            </div>
          </div>
        `
            div.classList.add('row')
            container.appendChild(div)

      }
    }

      function renderFollowers (activities) {
        const userId = localStorage.getItem('user_id')
        console.log(activities);
        const container = document.querySelector('.js-Followers');
        container.innerHTML = '';
        for (const post of activities.activity) {
            console.log(post);

            const div = document.createElement('div');
            div.innerHTML =
                `
        <div class="row">
          <div class="col s6 m6">
            <div class="card">
              <div class="card-content">
                <span class="card-title">${userId}</span>
              </div>
              <div class="card-image">
                <img src="${post.ACTIVITY_PAYLOAD}">
                </div>
              </div>
            </div>
          </div>
        `
            div.classList.add('row')
            container.appendChild(div)
}
      }

    function follow() {
        const userId = localStorage.getItem('user_id')
        document.querySelector('body').addEventListener('click', e => {
            const currEl = e.target;
            const followerId = currEl.getAttribute('data-user-id');
            if (!followerId) return;
            console.log(currEl);
            if (currEl.classList.contains('js-dyn')) {
                console.log('clicked!')
                ajax.POST(`/api/${userId}/follow/${followerId}`)
                 .then((e) => {
                    console.log(e)
                })
            }
        });
    };

})();
