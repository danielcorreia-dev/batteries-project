import Header from '@/components/Header'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Header/>
    {/* <section>
      <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"'>
        <div className='mr-auto place-self-center'>
          <h1 className='text-4xl font-bold' >Contribua, Cresça, Ganhe.</h1>
          <p>Participe de ume rede pioneira na proteção do ambiental e na interativade sustentável com benefícios.</p>
        </div>
        <div>
          <h1>teste</h1>
        </div>
      </div>
    </section> */}
    </>
  )
}
