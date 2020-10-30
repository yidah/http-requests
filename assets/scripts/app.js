const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url) {
  const promise = new Promise((resolve, reject) => {
    // this object will allow us to send http requests is built in all browsers
    const xhr = new XMLHttpRequest();

    // configure request
    xhr.open(method, url);

    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.send();
  });
  return promise;
}

// // fetching data using raw promises
// function fetchPosts() {
//   sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
//     (responseData) => {
//       // convert JSON data (xhr.response) to JavaScript arrays or you can use xhr.responseType = 'json' before xhr.onload to omit parsing
//       const listOfPosts = JSON.parse(responseData);
//       for (const post of listOfPosts) {
//         const postEl = document.importNode(postTemplate.content, true);
//         postEl.querySelector('h2').textContent = post.title.toUpperCase();
//         postEl.querySelector('p').textContent = post.body;
//         listElement.append(postEl);
//       }
//     }
//   );
// }

// fetching data using async/await
async function fetchPosts() {
  const responseData = await sendHttpRequest(
    'GET',
    'https://jsonplaceholder.typicode.com/posts'
  );

  // convert JSON data (xhr.response) to JavaScript arrays or you can use xhr.responseType = 'json' before xhr.onload to omit parsing
  const listOfPosts = JSON.parse(responseData);
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    listElement.append(postEl);
  }
}

fetchPosts();
