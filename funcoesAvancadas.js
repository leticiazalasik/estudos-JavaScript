class CarrinhoCompras {
    constructor() {
        this.itens = [];
        
        // Usando arrow function para manter o this
        document.getElementById('btnAdicionar').addEventListener('click', () => {
            this.adicionarItem('Produto');
        });
    }
    
    adicionarItem(produto) {
        this.itens.push(produto);
        console.log('Item adicionado ao carrinho');
    }
}