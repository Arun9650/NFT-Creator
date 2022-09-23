
const ERC721ABI  = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "collectionName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "collectionSymbol",
          "type": "string"
        }
      ],
      "name": "created",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "collectionName_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "collectionSymbol_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "metadata",
          "type": "string"
        }
      ],
      "name": "create",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  export { ERC721ABI }