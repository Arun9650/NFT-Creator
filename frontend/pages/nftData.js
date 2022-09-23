import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Image from 'next/image';
import { useAccount } from 'wagmi'
import dynamic from 'next/dynamic';


const NftData = () => {

  const [img, setImage] = useState([]);


  const { address, isConnected } = useAccount()

  const fetchcollecion = async () => {


    const WALLET_ADDRESS = address;

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',

      },
    };

    const collectionResponse = await fetch(
      `https://testnets-api.opensea.io/api/v1/collections?asset_owner=${WALLET_ADDRESS}`,
      options,
    ).then(response => response.json());

    const collection = collectionResponse?.map(item => ({
      details: item.description,
      slug: item.slug,
      name: item.name,
      contractAddress: item.primary_asset_contracts[0].address,
      owned: [],
    }));

    for (const iterator of collection) {
      const assetsResponse = await fetch(
        `https://testnets-api.opensea.io/api/v1/assets?owner=${WALLET_ADDRESS}&asset_contract_address=${iterator.contractAddress}&include_orders=false`,
        options,
      ).then(response => response.json());

      iterator.owned = assetsResponse.assets?.map(item => ({
        name: item.name,
        img: item.image_url,
        id: item.token_id,
      }))
        .filter(item => item.name && item.img);

        console.log("iterator",assetsResponse)
    }
    return collection
  }



  useEffect(
    () => {

      const hello = async () => {
        const tx = await fetchcollecion()

        setImage(tx);

      }

      if (isConnected) {
        hello();
      }
    }, [])



  console.log("cel", img)
  return (
    <div
      className='px-10  overflow-hidden'
    >
      <Navbar />
      <div className='   flex flex-wrap  overflow-hidden '>


        {
          isConnected ?
            <div className='flex  py-10  w-full justify-evenly  flex-wrap'>

              {
                img ?

                  (

                    img.map((item) => (
                      <div key={item.contractAddress} className="my-10   bg-transperent rounded-3xl  shadow-2xl">
                         
                        <Image src={item.owned ? item.owned[0]?.img : "" } alt={item.name} className="rounded-t-2xl   object-contain " width={390} height={200} />
                        <h2 className='text-2xl     text-center'>{item.owned ? item.owned[0]?.name : "NFT Name"}</h2>
                      </div>
                    ))
                  )
                  :

                  <div className='text-3xl text-white '>
                    Loading...
                  </div>

              }


            </div> : (<div className='text-white my-20 p-20'> Please Connect a account </div>)
        }




      </div>
    </div>
  )
}



// export async function getServerSideProps() {

//     const fetchcollecion = async () => {


//       const WALLET_ADDRESS = '0xe94Fdf72D2cF5Dc685F7DcE638c086dee62b4Ac0';

//       const options = {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',

//         },
//       };

//       const collectionResponse = await fetch(
//         `https://testnets-api.opensea.io/api/v1/collections?asset_owner=${WALLET_ADDRESS}`,
//         options,
//       ).then(response => response.json());

//       const collection = collectionResponse?.map(item => ({
//         details: item.description,
//         slug: item.slug,
//         name: item.name,
//         contractAddress: item.primary_asset_contracts[0].address,
//         owned: [],
//       }));

//       for (const iterator of collection) {
//         const assetsResponse = await fetch(
//           `https://testnets-api.opensea.io/api/v1/assets?owner=${WALLET_ADDRESS}&asset_contract_address=${iterator.contractAddress}&include_orders=false`,
//           options,
//         ).then(response => response.json());

//         iterator.owned = assetsResponse.assets
//           .map(item => ({
//             name: item.name,
//             img: item.image_url,
//             id: item.token_id,
//           }))
//           .filter(item => item.name && item.img);
//       }
//      return collection
//     }

//     const reso = fetchcollecion();


//     return {
//       props: {
//        collections: reso  ? JSON.stringify(reso) : null
//       },
//     }
//   }


export default dynamic(() => Promise.resolve(NftData), { ssr: false }); 