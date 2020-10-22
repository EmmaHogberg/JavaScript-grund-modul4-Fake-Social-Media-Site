// Hämta API-url och html-element
const apiUrl = "https://jsonplaceholder.typicode.com/";
const postsElement = document.querySelector(".posts");
const userContainerElement = document.querySelector(".user-container");

// Fetcha inlägg
fetch(apiUrl + "posts")
  .then((res) => res.json())
  .then((data) => {
    const posts = data;

    // Bygg html för varje inlägg
    posts.forEach((element) => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postsElement.append(postElement);

      // Title
      const postTitleElement = document.createElement("h3");
      postTitleElement.className = "post-title";
      postTitleElement.innerText = element.title;
      postElement.append(postTitleElement);

      // Body
      const postBodyElement = document.createElement("div");
      postBodyElement.className = "post-body";
      postBodyElement.innerText = element.body;
      postElement.append(postBodyElement);

      // Comment button
      const commentButton = document.createElement("button");
      commentButton.className = "comment-button";
      commentButton.dataset.postid = element.id;
      commentButton.innerText = "Read comments";
      postElement.append(commentButton);

      // Author info button
      const authorButton = document.createElement("button");
      authorButton.className = "author-button";
      authorButton.dataset.userid = element.userId;
      authorButton.innerText = "Author info";
      postElement.append(authorButton);

      // Lyssna efter klick på "author button"-knappen
      authorButton.addEventListener("click", (event) => {
        const userId = event.target.dataset.userid;

        // Fetcha användar-info och bygg html för användar-info
        fetch(`${apiUrl}users/${userId}`)
          .then((res) => res.json())
          .then((userData) => {
            userContainerElement.innerHTML = "";

            const user = document.createElement("div");
            user.className = "user";
            userContainerElement.appendChild(user);

            const author = document.createElement("h2");
            author.innerText = "Author";

            // Namn
            const name = document.createElement("div");
            name.innerText = userData.name;

            // Epost
            const email = document.createElement("div");
            email.innerText = userData.email;

            // Telefonnummer
            const phone = document.createElement("div");
            phone.innerText = "Phone: " + userData.phone;

            const br = document.createElement("br");

            // Företag
            const company = document.createElement("div");
            company.innerText = "Company: " + userData.company.name;
            user.append(author, name, email, phone, br, company);
          });
      });

      // Lyssna efter klick på "read comments"-knappen
      commentButton.addEventListener("click", (event) => {
        const postId = event.target.dataset.postid;

        // Fetcha kommentarer och bygg html för varje kommentar
        fetch(`${apiUrl}posts/${postId}/comments`)
          .then((res) => res.json())
          .then((commentData) => {
            commentData.forEach((element) => {
              const comments = document.createElement("ul");
              comments.className = "comments";
              postElement.append(comments);

              const comment = document.createElement("li");
              comment.className = "comment";
              comments.append(comment);

              // Avsändare
              const sender = document.createElement("div");
              sender.innerText = element.email;
              comment.append(sender);

              // Kommentar
              const commentContent = document.createElement("div");
              commentContent.innerText = element.body;
              comment.append(commentContent);

              // Inaktivera knapp när kommentarerna är hämtade för det inlägget
              event.target.disabled = true;
            });
          });
      });
    });
  });
