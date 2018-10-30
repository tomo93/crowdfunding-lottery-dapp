import React, { Component } from 'react';
//import ToDoItems from './ToDoItems';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import AssetTransfer from '../AssetTransfer/AssetTransfer';
 // import Web3 from 'web3';
import Web3 from 'web3';
import { assetContract } from "./../../setupAssetContract";
import './style.css';
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));



class AssetInfo extends Component {
  constructor(props) {
  super(props);

  this.state = {
    assetId:this.props.match.params.assetinfo,
    asset :[]
   }
   // this.addItem=this.addItem.bind(this);
   this.getBlocksById=this.getBlocksById.bind(this);
   this.delete=this.delete.bind(this);
  //console.log("dal costrutt "+localStorage.getItem('ticker'));
  }



  componentDidMount() {
    console.log("componentwillmount..");
    console.log(this.state.assetId);

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
        manufacturer: result[2]
      };

      this.setState({asset:newItemRetrieved});
    })

   }

   delete(){
         assetContract.methods.deleteAsset(this.state.assetId)
         .send({ from: this.state.defaultAccount ,

           gas: 1000000})
         .on("receipt", (receipt) =>{
         console.log("Successfully created "+JSON.stringify(receipt))

           // Transaction was accepted into the blockchain, let's redraw the UI
           //getZombiesByOwner(userAccount).then(displayZombies);

           //this.getBlocks();

         })
         .on("error", function(error) {
           // Do something to alert the user their transaction has failed
           console.log("Not created ");
         });
   }




  render() {
    return (
      <div className="Block">
        <h2>Asset Info</h2>

        <p>Nome: {this.state.asset.name}</p>
        <p>Dsscrizone : {this.state.asset.description}</p>
        <p>Manufacturer: {this.state.asset.manufacturer}</p>
        <button onClick={this.delete}>Rimuovi Prodotto da EtherMarket</button>
        <AssetTransfer/>
      </div>
    );
  }
}
export default AssetInfo;
