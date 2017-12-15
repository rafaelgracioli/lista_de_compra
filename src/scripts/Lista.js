import React, { Component } from 'react'

export default class Lista extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produto: '',
            quantidade: '',
            edit: '',
            lista: [
                {quantidade: 2, Produto: 'miojo',              marcado: false},
                {quantidade: 1, Produto: 'pacote de salsicha', marcado: false},
                {quantidade: 1, Produto: 'pacote de bolacha' , marcado: false}
            ]
        }

        this.renderItens     = this.renderItens.bind(this)
        this.delete          = this.delete.bind(this)
        this.valueProduto    = this.valueProduto.bind(this)
        this.valueQuantidade = this.valueQuantidade.bind(this)
        this.add             = this.add.bind(this)
        this.edit            = this.edit.bind(this)
    }

    renderItens(lista = []) {
        return lista.map((item, id) => (
            <div key={id} className="item">
                {this.state.edit !== '' && id === this.state.edit? 
                    (
                        <div>
                            <div><input type={Text} value={item.quantidade} onChange={this.valueQuantidade}/></div>
                            <div><input type={Text} value={item.Produto}    onChange={this.valueProduto}/></div>
                            <div><button type="button" className="btn btn-default" onClick={()=>{this.delete(id)}}>Delete</button></div>
                            <div><button type="button" className="btn btn-default">salvar</button></div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <div>{item.quantidade}</div>
                            <div className="produto">{item.Produto}</div>
                            <div><button type="button" className="btn btn-default" onClick={()=>{this.delete(id)}}>Delete</button></div>
                            <div><button type="button" className="btn btn-default" onClick={()=>{this.edit(id)}}>Editar</button></div>
                        </div>
                    )
                }
            </div>
        ))
    }

    delete(item) {
        let lista = this.state.lista;
        delete lista.splice( item, 1 );
        this.setState({lista: lista, edit: ''})        
    }

    valueProduto(e) {
        this.setState({produto: e.target.value, edit: ''})
    }

    valueQuantidade(e) {
        this.setState({quantidade: e.target.value, edit: ''})
    }

    add() {
        let lista = this.state.lista
        lista.push({quantidade: this.state.quantidade, Produto: this.state.produto})
        this.setState({produto: '', quantidade: '', lista: lista, edit: ''})       
    }

    edit(item) {
        this.setState({edit: item}) 
    }

    render() {
        return (
            <div>
                <input type={Text} value={this.state.quantidade} onChange={this.valueQuantidade}/>
                <input type={Text} value={this.state.produto} onChange={this.valueProduto}/>
                <button type="button" className="btn btn-default" onClick={this.add}>+</button>
                {this.renderItens(this.state.lista)}
            </div>
        )
    }
}