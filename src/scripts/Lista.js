import React, { Component } from 'react'

export default class Lista extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produto: '',
            quantidade: '',
            edit: '',
            produto_edit:
                {quantidade: '', produto: '', marcado: false}
            ,
            lista: []
        }

        this.renderItens       = this.renderItens.bind(this)
        this.delete            = this.delete.bind(this)
        this.valueproduto      = this.valueproduto.bind(this)
        this.valueQuantidade   = this.valueQuantidade.bind(this)
        this.add               = this.add.bind(this)
        this.edit              = this.edit.bind(this)
        this.save              = this.save.bind(this)
        this.cancel            = this.cancel.bind(this)
        this.editProduto       = this.editProduto.bind(this)
        this.editQuantidade    = this.editQuantidade.bind(this)
        this.marcar            = this.marcar.bind(this)
        this.desmarcar         = this.desmarcar.bind(this)
    }

    renderItens(lista = []) {
        return lista.map((item, id) => (
            <div key={id} className="row item">
                {this.state.edit !== '' && id === this.state.edit? 
                    (
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-9">
                                    <span className="qtd">< input type="Text" value={this.state.produto_edit.quantidade} onChange={this.editQuantidade}/></span>
                                    <span className="prod"><input type="Text" value={this.state.produto_edit.produto}    onChange={this.editProduto}/></span>
                                </div>
                                <div className="col-md-3 botoes">
                                    <button type="button" className="btn btn-danger" onClick={()=>{this.cancel(id)}}>
                                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                    </button>
                                    <button type="button" className="btn btn-success" onClick={()=>{this.save(id)}}>
                                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className={`col-md-12 ${item.marcado ? 'marcado' : ''}`}>
                            <div className="row">
                                <div className="col-md-1 check">
                                    {item.marcado == true ?
                                        (
                                            <button type="button" className="btn btn-default" onClick={()=>{this.desmarcar(id)}}>✔️</button>
                                        )
                                        :
                                        (
                                            <button type="button" className="btn btn-default" onClick={()=>{this.marcar(id)}}>&nbsp;</button>
                                        )
                                    }
                                </div>
                                <div className="col-md-8 qtd">
                                    <span className="qtd"><b>{item.quantidade}</b></span>&nbsp; <span className="prod">{item.produto}</span>
                                </div>
                                <div className="col-md-3 botoes">
                                    <button type="button" className="btn btn-danger" onClick={()=>{this.delete(id)}}>
                                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={()=>{this.edit(id)}}>
                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                    </button>                                    
                                </div>
                            </div>
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
    marcar(item) {
        let lista = this.state.lista
        lista[item].marcado = true
        this.setState({lista: lista, edit: ''})        
    }
    desmarcar(item) {
        let lista = this.state.lista
        lista[item].marcado = false
        this.setState({lista: lista, edit: ''})        
    }

    valueproduto(e) {
        this.setState({produto: e.target.value, edit: ''})
    }

    valueQuantidade(e) {
        this.setState(
            {
                quantidade: e.target.value, 
                edit: '',
                produto_edit: {
                    produto: '',
                    quantidade: ''
                }
            }
        )
    }

    add() {
        if(this.state.quantidade != '' && this.state.produto != ''){
            let lista = this.state.lista
            lista.push({quantidade: this.state.quantidade, produto: this.state.produto})
            this.setState({produto: '', quantidade: '', lista: lista, edit: ''})
        }       
    }

    edit(item) {
        this.setState({
            edit: item, 
            produto_edit: {
                quantidade: this.state.lista[item].quantidade,
                produto: this.state.lista[item].produto
            }
        })
    }
    editProduto(e){
        this.setState({produto_edit: {produto: e.target.value, quantidade: this.state.lista[this.state.edit].quantidade}}) 
    }
    editQuantidade(e){
        this.setState({produto_edit: {produto: this.state.lista[this.state.edit].produto, quantidade: e.target.value}}) 
    }
    save(item){
        let newProduto    = this.state.produto_edit.produto
        let newQuantidade = this.state.produto_edit.quantidade
        let lista = this.state.lista
        lista[item].produto = newProduto
        lista[item].quantidade = newQuantidade
        this.setState(
            {
                edit: '',
                produto_edit: {
                    produto: '',
                    quantidade: ''
                },
                lista: lista
            }
        )        
    }
    cancel(){
        this.setState(
            {
                edit: '',
                produto_edit: {
                    produto: '',
                    quantidade: ''
                }
            }
        ) 
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="row form">
                            <div className="col-md-3">
                                <label>Qtd: </label>
                                <input type={Text} className="qtd"  value={this.state.quantidade} onChange={this.valueQuantidade}/>
                            </div>
                            <div className="col-md-7">
                                <label>produto: </label>
                                <input type={Text} className="prod" value={this.state.produto} onChange={this.valueproduto}/>
                            </div>
                            <div className="col-md-2 botoes">
                                <button type="button" className="btn btn-warning" onClick={this.add}>
                                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Adicionar
                                </button>
                            </div>
                        </div>
                        <h2>Lista</h2>
                        {this.renderItens(this.state.lista)}
                    </div>
                </div>                
            </div>
        )
    }
}