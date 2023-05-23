import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Post");
  }

  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    // const data = await getData("/static/js/views/posts.json");
    const data = await getData("/static/js/views/liste-complete.json");
    // let listPosts = "<ul>";
    let listPosts = "";
    //     <div class="card" style="width: 18rem;">
    //   <img class="card-img-top" src="..." alt="Card image cap">
    //   <div class="card-body">
    //     <h5 class="card-title">Card title</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>
    //   </div>
    // </div>

    var tableau_data = data["hits"];

    console.log(tableau_data);

    for (let i in tableau_data) {
      listPosts +=
        "<div class='card' style='width: 18rem;'><div class='thumbnail'><img alt='Card image cap' class='card-img-top image_gallery' src=" +
        tableau_data[i]["webformatURL"] +
        "></div>" +
        "<div class='card-body'><a class='btn btn-link' href='/post-view/" +
        tableau_data[i]["id"] +
        "'>Afficher les détails</a></div></div>";
    }
    // for (let i in tableau_data) {
    //   console.log(tableau_data[i]["id"]);
    //   listPosts +=
    //     "<li><a href='/post-view/" +
    //     tableau_data[i]["id"] +
    //     "' data-link><img src=" +
    //     tableau_data[i]["webformatURL"] +
    //     ">" +
    //     "</a></li>";
    // }
    // listPosts += "</ul>";

    return (
      `
      <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4"><i class="fa fa-camera-retro"></i>Pixabay Api</h1>
        <p class="lead">Voici un site qui prend les informations venant de l'Api de Pixabay et qui affiche les 200 premières images du site.</p>
      </div>
    </div><div class="row">
        ` +
      listPosts +
      `</div>`
    );
  }
}
