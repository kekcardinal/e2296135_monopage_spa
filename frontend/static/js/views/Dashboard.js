import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Dashboard')
    }

    async getHtml(){
        return `
            <h1>Bienvenu SPA</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dicta veniam facere provident earum optio non iste tempore minima distinctio corporis adipisci nihil culpa, sit saepe repellat accusamus est molestiae!</p>
            <a href="/posts" data-link>Voir les articles</a>
        `
    }
}