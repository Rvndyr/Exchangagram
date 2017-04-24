(function() { // protect the lemmings

////render all users in the app; following and non following////
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
                <img src=${user.ACTIVITY_PAYLOAD}>
                </div>
                <div class="card-content">
                <span class="card-title">${user.EMAIL}</span>
                <a class="waves-effect waves-light btn right js-follow">Follow</a>
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
/////////////////////////////////////////////////
const followBtn = document.querySelector('.js-follow');
followBtn.addEventListener('click', (e) => {
  console.log("LOL Im wokring")
})

})();
