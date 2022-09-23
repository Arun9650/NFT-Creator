import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar';
import { NFTStorage, File } from 'nft.storage'
import { ERC721ABI } from '../constants/ERC721ABI';
import { ERC721Address } from '../constants/ERC721Address';
import { Contract } from 'ethers';
import {  useSigner } from 'wagmi';
import Link from 'next/link';

const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg2Qjg5MkM2MjkwN2IyNEQyOERlMTM1QmVCZjRmNTk4MDdkN0M2NzQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Mzg0MTUyMjE1NSwibmFtZSI6Ik5GVCBDcmVhdGlvbiJ9.ntrzHPZetumAdREWNL6CPqu_jBLTv2q-R_sqS8wxDeU' })

function MIntNFT() {

    const [metadata, setMetadata] = useState("");
    const [loading, setLoading] = useState("Create");
    const { data: signer } = useSigner()

    const [state, setState] = useState({
        name: '',
        Symbol: "",
        collectionName: "",
        description:"",
    });

    const [imageState, setImageState] = useState([]);


    const imageHandler = (e) => {
        setImageState(e.target.files[0])
        console.log(imageHandler);
        // console.log(e.target.files[0])
    }

    console.log("image",imageState.name )


    const create = async () => {

        const baseurl = "https://ipfs.io/ipfs/";

        setLoading("creating metadata")
        const metadata = await client.store({
            name: state.name,
            description: state.description,
            image: new File(
                [
                   imageState
                ],
                imageState.name,
                { type: 'image/jpg' }
            ),
        })

      
        const url = baseurl +  metadata.url.slice(7);
        setMetadata(url);
        console.log(url);
        
        try {

            setLoading("creating NFT")
            const instance =  new Contract(ERC721Address,ERC721ABI,signer);
            console.log(instance);
            const token =   await  instance.create(state.collectionName, state.Symbol, url);
            // const mint  = await instance.mintToken(metadata);

            // console.log(mint);
            setLoading("please wait ... ")
            token.wait();
            setLoading("Create ")
            

            

            console.log(token);
   
           
   
   
   
   
           } catch (error) {
                console.log(error)
           }

        

    }
    console.log(state)

    const handleOnChange = (evt) => {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        })

    }

  





    return (
        <div
            className='container px-20'
        >

            <Navbar />
            <div className=' flex  mx-auto md:mx-0 items-center justify-center w-2/3'>
                <div className='md:w-7/12 '>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-white font-bold text-xl   underline underline-offset-4'>Name of NFT* :</label>
                        <input type="text" id="name" name='name' value={state.name} onChange={handleOnChange} className=' bg-transparent focus:outline-none  text-white px-8 py-1 contrast-more:border-slate-400 border border-2  rounded-md' />
                    </div>

                   

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-white font-bold text-xl   underline underline-offset-4'>Collection name* :</label>
                        <input type="text" name='collectionName' onChange={handleOnChange} id="name" className=' bg-transparent focus:outline-none  text-white px-8 py-1 contrast-more:border-slate-400 border border-2  rounded-md' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-white font-bold text-xl   underline underline-offset-4'>Symbol of Collection* :</label>
                        <input type="text" name='Symbol' id="name" onChange={handleOnChange} value={state.Symbol} className=' bg-transparent focus:outline-none  text-white px-8 py-1 contrast-more:border-slate-400 border border-2  rounded-md' />
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-white font-bold text-xl   underline underline-offset-4'>Description* :</label>
                        <input type="text" name='description' onChange={handleOnChange} id="name" className=' bg-transparent focus:outline-none  text-white px-8 py-1 contrast-more:border-slate-400 border border-2  rounded-md' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-white font-bold text-xl   underline underline-offset-4'>Image*</label>
                        <input type="file" onChange={imageHandler} name="image" id='name' />
                    </div>


                    <div className='mt-5  float-right'>
                        <button type='submit' className='inline-flex font-sans  cursor-pointer items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none' 
                        onClick={() => create()}
                        >
                            {loading}
                        </button>
                    </div>


                <Link href={metadata}>
                    <a target={'_blank'} className="text-blue-700 ">
                        metadata: {`${metadata}`}
                    </a>
                    </Link>
                </div>



            </div>
        </div>
    )
}

export default MIntNFT