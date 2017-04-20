window.ajax = (function() {
    function GET(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };
            request.send();
        });
    } // GET
    function POST(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', url);
            request.setRequestHeader('Content-Type', 'application/json');
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };
            request.send(JSON.stringify(data));
        });
    } // POST
    function PUT(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('PUT', url);
            request.setRequestHeader('Content-Type', 'application/json');
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };
            request.send(JSON.stringify(data));
        });
    } // PUT
    function DELETE(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('DELETE', url);
            request.setRequestHeader('Content-Type', 'application/json');
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };
            request.send(JSON.stringify(data));
        });
    } // DELETE

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


})();
