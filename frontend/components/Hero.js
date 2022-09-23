import React from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";

 const Hero = () => {

        const router = useRouter();

    const { openConnectModal } = useConnectModal();
    const {isConnected} = useAccount();


 
    
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
            <a className="mb-6 sm:mx-auto">
              <div className="flex items-center justify-center w-12 h-12  rounded-full bg-indigo-50">
                <svg
                  className="w-10 h-10 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </a>
            <div className="max-w-xl  mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 text-center text-3xl font-bold leading-none tracking-tight font-Bungee sm:text-4xl md:mx-auto">
                <span className="relative text-gray-50  inline-block">
                
                  <span className="relative">The</span>
                </span>{' '}
               NFT Creator so you do&apos;t have to code
              </h2>
              <p className="text-base text-gray-300 text-center  font-extrabold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-red-600 md:text-lg">
               create nft&apos;s with just one click and exloper the power of blockchain 
               with the help with nft creator
              </p>
            </div>
            <div>
             {
                isConnected ? (

                    <a
                    onClick={() => router.push("/MIntNFT")}
                     className="inline-flex cursor-pointer items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                   >
                     Get started
                   </a>
                ) :
                (
                    <a
                    
                    onClick={openConnectModal}
                   
                     className="inline-flex cursor-pointer items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                   >
                     Get started
                   </a>
                )
             }
            </div>
          </div>
        </div>
      </div>
    );
  };


export default Hero