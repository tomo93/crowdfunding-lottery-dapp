import web3 from './web3';
//web3.eth.getAccounts().then(console.log);

const assetABI=[

  {
    "constant": true,
    "inputs": [],
    "name": "totalLandsCounter",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ownedLands",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "initialized",
        "type": "bool"
      },
      {
        "name": "manufacturer",
        "type": "string"
      },
      {
        "name": "ownerAddress",
        "type": "address"
      },
      {
        "name": "cost",
        "type": "uint256"
      },
      {
        "name": "assetId",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "ownerAssetCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "uuid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "manufacturer",
        "type": "string"
      }
    ],
    "name": "AssetCreate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "uuid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "message",
        "type": "string"
      }
    ],
    "name": "RejectCreate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "uuid",
        "type": "uint256"
      }
    ],
    "name": "AssetTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "uuid",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "message",
        "type": "string"
      }
    ],
    "name": "RejectTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "AssetDelete",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_manufacturer",
        "type": "string"
      },
      {
        "name": "_cost",
        "type": "uint256"
      }
    ],
    "name": "createAsset",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "deleteAsset",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_uuid",
        "type": "uint256"
      }
    ],
    "name": "transferAsset",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_uuid",
        "type": "uint256"
      }
    ],
    "name": "getAssetByUUID",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_uuid",
        "type": "uint256"
      }
    ],
    "name": "isOwnerOf",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_landHolder",
        "type": "address"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getAsset",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_landHolder",
        "type": "address"
      }
    ],
    "name": "getNoOfAssets",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getNoOfAssetsTotal",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }]



const  assetAddress='0x98ec4185a40c3b5299412efa3f27d0e54a0c2ee0';



const assetContract= new web3.eth.Contract(assetABI, assetAddress);
export {assetContract};
