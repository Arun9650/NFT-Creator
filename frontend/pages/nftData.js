import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Image from 'next/image';

const NftData = ({ collections }) => {

  const [img, setImage] = useState([]);



  const fetchcollecion = async () => {


    const WALLET_ADDRESS = '0xe94Fdf72D2cF5Dc685F7DcE638c086dee62b4Ac0';

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
    }
    return collection
  }



  useEffect(
    () => {

      const hello = async () => {
        const tx = await fetchcollecion()

        setImage(tx);

      }
      hello();
    }, [])



  // console.log("cel",collections)
  return (
    <div
      className='px-10 overflow-hidden'
    >
      <Navbar />
      <div className=' m-10 flex flex-wrap p-10 overflow-hidden  justify-evenly '>
        {
          img.map((item) => (
            <div key={item.id} className="my-10  bg-white rounded-3xl  shadow-2xl">

              <Image src={item.owned[0].img} alt={item.name} className="rounded-t-2xl    " width={390} height={200} />
              <h2 className='text-2xl     text-center'>{item.owned[0].name}</h2>
            </div>
          ))
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


export default NftData