import React, { Component } from 'react';
//import ToDoItems from './ToDoItems';
import _ from 'lodash';
import { Link } from 'react-router-dom'
//import './AssetList.css';
 // import Web3 from 'web3';

import { assetContract } from "./../../setupAssetContract";
import './style.css';


class AssetTransfer extends Component{


transferAsset(e){
  e.preventDefault();

  //scrivere su contracttto
  assetContract.methods.createAsset(this._inputElementb.value,this._inputElementc.value,this._inputElementd.value,this._inputElemente.value)
  .send({ from: this.state.defaultAccount ,

    gas: 1000000})
  .on("receipt", (receipt) =>{
  console.log("TX Successfully created "+JSON.stringify(receipt))

    // Transaction was accepted into the blockchain, let's redraw the UI
    //getZombiesByOwner(userAccount).then(displayZombies);

    this.getBlocks();

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
