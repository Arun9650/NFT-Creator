
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import styles from '../styles/Home.module.css'
import  Hero  from '../components/Hero'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Navbar from '../components/Navbar'
// import dynamic from 'next/dynamic'

// const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit'), {
//   ssr: false,
// })

export default function Home() {

  const {isConnected} = useAccount();

  return (
   <div
   className='container px-20 h-screen '
   >

      <Navbar/>


      <Hero/>





   </div>
  )
}
