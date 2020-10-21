// Hämta html-element
const apiUrl = "https://jsonplaceholder.typicode.com/";
const postsElement = document.querySelector(".posts");
const userContainer = document.querySelector(".user-container");

// Ladda in alla inlägg

// Fetcha inlägg
fetch(apiUrl + "posts")
  .then((res) => res.json())
  .then((data) => {
    const posts = data;

    // Bygg html för posts
    posts.forEach((element) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postsElement.appendChild(postElement);

      // Title
      const postTitleElement = document.createElement("h3");
      postTitleElement.className = "post-title";
      postTitleElement.innerText = element.title;
      postElement.appendChild(postTitleElement);

      // Body
      const postBodyElement = document.createElement("div");
      postBodyElement.className = "post-body";
      postBodyElement.innerText = element.body;
      postElement.appendChild(postBodyElement);

      // Comment button
      const commentButton = document.createElement("button");
      commentButton.className = "comment-button";
      commentButton.dataset.postid = element.id;
      commentButton.innerText = "Read comments";
      postElement.appendChild(commentButton);

      // Author info button
      const authorButton = document.createElement("button");
      authorButton.className = "author-button";
      authorButton.dataset.userid = element.userId;
      authorButton.innerText = "Author info";
      postElement.appendChild(authorButton);
    });

    // Lyssna efter klick på author button
    postsElement.addEventListener("click", (event) => {
      const userId = event.target.dataset.userid;

      // Fetcha användar-info
      fetch(`${apiUrl}users/${userId}`)
        .then((res) => res.json())
        .then((userData) => {
          // Display användar-info till höger på sidan
          userContainer.innerHTML = "";

          const user = document.createElement("div");
          user.className = "user";
          userContainer.appendChild(user);

          const author = document.createElement("h2");
          author.innerText = "Author";

          const name = document.createElement("div");
          name.innerText = userData.name;

          const email = document.createElement("div");
          email.innerText = userData.email;

          const phone = document.createElement("div");
          phone.innerText = "Phone: " + userData.phone;

          const br = document.createElement("br");

          const company = document.createElement("div");
          company.innerText = "Company: " + userData.company.name;
          user.append(author, name, email, phone, br, company);
        });
    });
  });

// <div class="post">
//   <h3 class="post-title">sunt aut facere</h3>
//   <div class="post-body">quia et suscipit</div>

//   <button class="comment-button" data-postid="1">Read comments</button>
//   <button class="author-button" data-userid="1">Author info</button>
//   <ul class="comments">
//     <li class="comment">
//       <div>Eliseo@gardner.biz</div>
//       <div>laudantium enim quasi est</div>
//     </li>
//   </ul>
// </div>

// Lyssna efter klick på "read comments"-knappen

// Fetcha comments

// Display comments
