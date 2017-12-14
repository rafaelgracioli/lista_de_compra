import React, { Component } from 'react'

export default class Lista extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lista: [
                {props1: 'props1', props2: 'props2', props3: 'props3'},
                {props1: 'props1', props2: 'props2', props3: 'props3'},
                {props1: 'props1', props2: 'props2', props3: 'props3'}
            ]
        }

        this.renderItens = this.renderItens.bind(this)
    }

    renderItens(lista = []) {
        return lista.map((item, id) => (
            <div key={id} className="item">
                <div className="quantidade">{item.props1}</div>
                <div className="produto">{item.props2}</div>
                <div className="valor">{item.props3}</div>
                <div><button type="button" className="btn btn-default">Default1</button></div>
                <div><button type="button" className="btn btn-default">Default2</button></div>
            </div>
        ))
    }

    render() {
        return (
            <div>
                {this.renderItens(this.state.lista)}
            </div>
        )
    }
}