import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Visualiser Article");
  }

  async getHtml() {
    //console.log(this.params.id)

    const nu = Number(this.params.id);

    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    const data = await getData("/static/js/views/liste-complete.json");
    var tableau_data = data["hits"];

    const article = tableau_data.find((item) => item.id === nu);

    //console.log(article)

    return (
      `<div class="container my-5">
      <div class="row">
      <div class="col-lg-6">
      <img class="w-100" src="` +
      article.largeImageURL +
      `"/></div><div class="col-lg-6"><div class="p-5 mt-4"><p class="lead"><i class="fa-sharp fa-solid fa-eye"></i> ` +
      article.views +
      `</p><p class="lead"><i class="fa-solid fa-heart"></i> : ` +
      article.likes +
      `</p>
      <p class="lead"><i class="fa-solid fa-comment"></i> :` +
      article.comments +
      `
      </p><p class="lead"><i class="fa-solid fa-download"></i>:` +
      article.downloads +
      `
      </p>
      <p class="lead">Auteur : ` +
      article.user +
      `</p>
        
        <br>
        <a href='/posts' data-link>Retourner</a></div></div></div>`
    );
  }
}
{
  /* <div class="container my-5">
  <div class="row">
    <div class="col-lg-6">
      <img class="w-100 shadow" src="https://via.placeholder.com/824x552" />
    </div>
    <div class="col-lg-6">
      <div class="p-5 mt-4">
          <h1 class="display-4">H1 Heading</h1>
          <p class="lead">Crow's nest schooner ho scallywag hail-shot gabion salmagundi. Doubloon careen code of conduct lugsail hulk ye long clothes. </p>
          <a href="#" class="btn btn-outline-dark">Read More</a>
        </div>
    </div>
</div> */
}
