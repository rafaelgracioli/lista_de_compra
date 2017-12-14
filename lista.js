import React, { Component } from 'react'

export default class ListaCompras extends Component {
    constructor(props) {
        super(props)
        this.state = {  
            list: [
                [2, 'produto 1', 50.01],
                [5, 'produto 2', 1.75],
                [1, 'produto 3', 7.12]
            ] 
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        
        this.renderItens  = this.renderItens.bind(this)

        //this.refresh()
    }

    renderItens() {
        const lista = this.state.list || []
        console.log(lista)

        return lista.map((item, id) => (
            <div className="item" key={id}>
                <div className="quantidade">{item[0]}</div>
                <div className="produto">{item[1]}</div>
                <div className="valor">{item[2]}</div>
            </div>
        ))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value })
    }

    render() {        
        return (
            <div>
                {this.renderItens()}
            </div>
        )
    }
}