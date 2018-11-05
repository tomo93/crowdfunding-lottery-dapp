import React, { Component } from 'react';
//import ToDoItems from './ToDoItems';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import AssetTransfer from '../AssetTransfer/AssetTransfer';
 // import Web3 from 'web3';
//import Web3 from 'web3';
import { assetContract } from "./../../setupAssetContract";
import './style.css';
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
import web3 from './../../web3';


class AssetInfo extends Component {
  constructor(props) {
  super(props);

  this.state = {
    assetId:this.props.match.params.assetinfo,
    asset :[],
    defaultAccount:this.props.match.params.defaultAccount
   }
   // this.addItem=this.addItem.bind(this);
   this.getBlocksById=this.getBlocksById.bind(this);
   this.delete=this.delete.bind(this);
  //console.log("dal costrutt "+localStorage.getItem('ticker'));
  }



  componentDidMount() {
    console.log("componentwillmount..");
    console.log("assetId selezionato = "+this.state.assetId);

    //recupero dell'account 0
    web3.eth.getAccounts().then((accounts) => {
      this.setState({defaultAccount:accounts[0]});
      console.log("accountCoinbase:["+this.state.defaultAccount+"]");
    });


    this.setState({assetId: this.props.match.params.assetinfo}, () => {
    // Do something here.
      this.getBlocksById();
    });



  }


  getBlocksById() {
    //recupero del numero di asset totali e degli asset
    console.log(this.state.assetId);
    assetContract.methods.getAssetByUUID(this.state.assetId).call().then((result)=>{
      console.log(JSON.stringify(result));
      var newItemRetrieved={
        name: result[0],
        description: result[1],
        manufacturer: result[2],
        cost: result[3],
        ownerAddress: result[4]
      };

      this.setState({asset:newItemRetrieved});
    })

   }

   delete(){
         assetContract.methods.deleteAsset(this.state.assetId)
         .send({ from: this.state.defaultAccount ,

           gas: 1000000})
         .on("receipt", (receipt) =>{
         console.log("Tx Successfully created "+JSON.stringify(receipt))
         console.console.log("Asset è stato eliminato");
           // Transaction was accepted into the blockchain, let's redraw the UI
           //getZombiesByOwner(userAccount).then(displayZombies);

           //this.getBlocks();

         })
         .on("error", function(error) {
           // Do something to alert the user their transaction has failed
           console.log("Tx Not created ");
         });
   }




  render() {
    return (
      <div className="Block">
        <h2>Asset Info</h2>

        <p>Nome: {this.state.asset.name}</p>
        <p>Dsscrizone : {this.state.asset.description}</p>
        <p>Manufacturer: {this.state.asset.manufacturer}</p>
        <p>Costo: {this.state.asset.cost}</p>
        <p>ownerAddress: {this.state.asset.ownerAddress}</p>

        <button onClick={this.delete}>Rimuovi Prodotto da EtherMarket</button>

        {/*Componente per trasferire quesa risorsa ad un altra persona quindi ad un altro indirizzo */}
        <AssetTransfer assetId={this.state.assetId}/>
      </div>
    );
  }
}
export default AssetInfo;
