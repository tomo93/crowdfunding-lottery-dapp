import React, { Component } from 'react';
//import ToDoItems from './ToDoItems';
import _ from 'lodash';
import { Link } from 'react-router-dom'
//import './AssetList.css';
 import Web3 from 'web3';

import { assetContract } from "./../../setupAssetContract";
import './AssetList.css';
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class AssetList extends Component {
  constructor(props) {
  super(props);

  this.state = {
     block_ids: [],
     block_hashes: [],
     curr_block: null,
     items: [],
     defaultAccount: '0x'
   }
   this.addItem=this.addItem.bind(this);
   this.getBlocks=this.getBlocks.bind(this);
  //console.log("dal costrutt "+localStorage.getItem('ticker'));
  }


  componentDidMount() {
    console.log("componentwillmount..");

    //recupero dell'account 0
    web3.eth.getAccounts().then((accounts) => {
      this.setState({defaultAccount:accounts[0]});
      console.log("accountCoinbase:["+this.state.defaultAccount+"]");
    });


    //recupero del numero di asset totali e degli asset
    this.getBlocks();
  }


/*
Recupero degli assetts registrati sulla blockchain
*/
 getBlocks() {
   //recupero del numero di asset totali e degli asset

   assetContract.methods.getNoOfAssetsTotal().call().then((result)=>{
     this.setState({curr_block:result});
     console.log("result "+ result);
     return result
   }).then((data) => {

        this.setState({items:[]  })
        console.log("dentro getBlocks"+data);

               for ( let x = 0; x < data; x++) {

                 assetContract.methods.getAsset(this.state.defaultAccount,x).call().then((result)=>{

                         //console.log("Nome dei prodotto: "+ x+"= "+result[0]);
                         var newItemRetrieved={
                           name: result[0],
                           description: result[1],
                           cost: result[2],
                           manufacturer: result[3],
                           ownerAddress:  result[4],
                           assetId: result[5]
                         };
                         const items = [...this.state.items]
                         items.push(newItemRetrieved)
                         this.setState({items:items  })
                   });
               }//fine for

   });


  }

  updatee(items){
    this.setState((prevState)=>{
      console.log("stato settatoo!");
      return {
        items: items
      };

    });

  }


/*
Aggiungere un elemento su smartcontract

*/
addItem(e){
      e.preventDefault();

      //scrivere su contracttto
      assetContract.methods.createAsset(this._inputElementb.value,this._inputElementc.value,this._inputElementd.value,this._inputElemente.value)
      .send({ from: this.state.defaultAccount ,

        gas: 1000000})
      .on("receipt", (receipt) =>{
      console.log("Successfully created "+JSON.stringify(receipt))

        // Transaction was accepted into the blockchain, let's redraw the UI
        //getZombiesByOwner(userAccount).then(displayZombies);

        this.getBlocks();

      })
      .on("error", function(error) {
        // Do something to alert the user their transaction has failed
        console.log("Not created ");
      });


      // var newItem={
      //   name: this._inputElementb.value,
      //   description: this._inputElementc.value,
      //   manufacturer: this._inputElementd.value,
      //   cost: this._inputElemente.value
      // };
      //
      // this.setState((prevState)=>{
      //   return {
      //     items: prevState.items.concat(newItem)
      //   };
      // });

      //this.getBlocks(this.state.curr_block);


    //resetto i campi del form
      this._inputElementb.value="";
      this._inputElementc.value="";
      this._inputElementd.value="";
      this._inputElemente.value="";
}


  deleteItem(key){
    var filteredItems =this.state.items.filter(function(item){
      return (item.key!==key)
    });

    this.setState({
      items:filteredItems
    });

  }


  render(){
    var tableRows = [];
    _.each(this.state.items, (value, index) => {
      tableRows.push(
        <tr key={this.state.items[index].assetId}>
          <td className="tdCenter">{this.state.items[index].assetId}</td>
          <td className="tdCenter">{this.state.items[index].name}</td>
          <td><Link to={`/asset/${this.state.items[index].assetId}`} params={{ asset: this.state.items[index] }}>{this.state.items[index].description}</Link></td>
          <td className="tdCenter">{this.state.items[index].manufacturer}</td>
          <td className="tdCenter">{this.state.items[index].cost}</td>
        </tr>
      )
    });


    //console.log(web3.eth.accounts);
    return (

      <div className="Home">
        <h2>I tuoi prodotti caricati su EtherMarket</h2>
        <div>Numero prodotti caricati: {this.state.curr_block}</div>
       <div> Your default account: [{this.state.defaultAccount}]</div>

       <div className="assetList">
         <div className="header">
               <p>
              Inserisci una risorsa da vendere sulla piattaforma
               </p>
               <form onSubmit={this.addItem}>
                 <input ref={(b) => this._inputElementb=b} type="text" placeholder="Name"></input>
                 <input ref={(c) => this._inputElementc=c} type="text" placeholder="Description"></input>
                 <input ref={(d) => this._inputElementd=d} type="text" placeholder="Manufacturer"></input>
                 <input ref={(e) => this._inputElemente=e} type="number" placeholder="Cost"></input>
                 <button type="submit">Invia</button>
               </form>

           </div>
       </div>

       {/*Lista dei prodotti/asset */}
        <table>
          <thead><tr>
          <th> Id</th>
            <th> Name</th>
            <th>Description</th>
            <th>Manufacture</th>
            <th>Cost</th>
          </tr></thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>



      </div>
    );
  }
}


export default AssetList;
