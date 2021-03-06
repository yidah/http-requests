const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    // this object will allow us to send http requests is built in all browsers
    const xhr = new XMLHttpRequest();

    // configure request
    xhr.open(method, url);

    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.send(JSON.stringify(data));
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
    postEl.querySelector('li').id = post.id;
    listElement.append(postEl);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  // make sure we comply with the API format as stated here https://jsonplaceholder.typicode.com/
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

async function deletePost(title, content) {
  sendHttpRequest(title, content);
}

// GET
fetchButton.addEventListener('click', fetchPosts);

//POST
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // currentTarget -  It always refers to the element to which the event handler has been attached
  // target - identifies the element on which the event occurred  (add button in this case)
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;
  createPost(enteredTitle, enteredContent);
});

// DELETE
postList.addEventListener('click', (event) => {
  // make sure it was the button that was clicked and not other element in the list
  if (event.target.tagName === 'BUTTON') {
    // target is the element that originated the even (in this case delete button)
    // closest -  traverses the Element and its parents (heading toward the document root)
    const postId = event.target.closest('li').id;
    console.log(postId);
    deletePost(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
