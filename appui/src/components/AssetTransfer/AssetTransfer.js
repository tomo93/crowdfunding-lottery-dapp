import React, { Component } from 'react';
//import ToDoItems from './ToDoItems';
import _ from 'lodash';
import { Link } from 'react-router-dom'
//import './AssetList.css';
import web3 from './../../web3';

import { assetContract } from "./../../setupAssetContract";
import './style.css';


class AssetTransfer extends Component{
  constructor(props) {
  super(props);

  this.state = {
    assetId:this.props.assetId,
    defaultAccount: "0x"
   }

   this.transferAsset=this.transferAsset.bind(this);
  }


  componentDidMount() {
    console.log("componentwillmount..");

    //recupero dell'account 0
    web3.eth.getAccounts().then((accounts) => {
      this.setState({defaultAccount:accounts[0]});
      console.log("accountCoinbase:["+accounts[0]+"]");
    });

  }

transferAsset(e){
  e.preventDefault();
  console.log("Trasferita a "+this._inputElementb.value)
  console.log("da  "+this.state.defaultAccount)
  console.log("della risorsa   "+this.state.assetId)
  //transferire un'asset ad un altro indirizzo
  assetContract.methods.transferAsset(this._inputElementb.value,this.state.assetId)
  .send({ from: this.state.defaultAccount ,

    gas: 1000000})
  .on("receipt", (receipt) =>{
  console.log("TX Successfully created "+JSON.stringify(receipt))
  console.log("Trasferita a "+this._inputElementb.value)
    // Transaction was accepted into the blockchain, let's redraw the UI
    //getZombiesByOwner(userAccount).then(displayZombies);

    //this.getBlocks();

  })
  .on("error", function(error) {
    // Do something to alert the user their transaction has failed
    console.log("TX Not created ");
  });

}

render(){


  return(
    <div>
    sono AssetTransfer ciao

    <div className="assetList">
      <div className="header">
            <p>
           Inserisci una risorsa da vendere sulla piattaforma
            </p>
            <form onSubmit={this.transferAsset}>
              <input ref={(b) => this._inputElementb=b} type="text" placeholder="Indirizzo Destinatario"></input>
              <button type="submit">Transferisci oggetto</button>
            </form>

        </div>
    </div>
    </div>
  );
}
}
export default AssetTransfer;
