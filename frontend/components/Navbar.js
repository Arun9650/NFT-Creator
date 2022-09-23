import React from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import dynamic from 'next/dynamic'
import { useAccount } from 'wagmi'


function Navbar() {



    const { isConnected } = useAccount();
    return (
        <div>

            <nav className=' pt-10 flex  justify-between'>

                <Link href={'/'}>
                    <div
                        className=' cursor-pointer text-3xl font-Bungee  '
                    >
                        Create NFT&apos;s
                    </div>
                </Link>

                {/* {console.log(isConnected)} */}
<div className='flex ' >
    
                    {isConnected && (
                        <ConnectButton />
                    )}
    
                        <Link href={'nftData'}>
                            <a className='text-white '>
    
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-11 text-4xl w-11" data-v-81440b78=""><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </a>
    
                        </Link>    
    
</div>
            </nav>
        </div>
    )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });