import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.scss'
import { FC } from 'react'
import PageWithLayout from '@/layout/page.layout'
import MainLayout from '@/layout/main.layout'
import { Oxygen, Poppins } from 'next/font/google'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { gql, useQuery } from '@apollo/client'



const poppins = Poppins({
  weight: "500",
  subsets: [ "latin" ]
})

const oxygen = Oxygen({
  weight: "400",
  subsets: [ "latin" ]
})

const Home: FC = () => {
  const router = useRouter();

  const [ slider, setSlider ] = useState(1)


  useEffect(() => {
    const interval = setInterval(() => {
      setSlider(() => slider + 1)
      if (slider === 6) {
        setSlider(1)
      }
    }, 10000)


    return () => clearInterval(interval)
  })

  const [ cookies, setCookies ] = useState("")

  useEffect(() => {
    const token = Cookies.get("physio_token");
    if (token) {
      setCookies(token)
    }
  }, [ cookies ])



  const { loading, data } = useQuery(gql`query GetAllServices {
    getAllServices {
      services
      image
      descriptions
      servicesID
    }
  }`)


  const imagesBgSlider = [
    { name: "page1", path: "/slider/1.png", count: 1 },
    { name: "page2", path: "/slider/2.png", count: 2 },
    { name: "page3", path: "/slider/3.png", count: 3 },
    { name: "page4", path: "/slider/4.png", count: 4 },
    { name: "page5", path: "/slider/5.png", count: 5 },
    { name: "page6", path: "/slider/6.png", count: 6 },

  ]

  if (loading) return <p>Loading...</p>
  return (
    <>
      <Head>
        <title>Leonardo: Physical Therapy Rehabilitation Clinic</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>

        <div className={styles.tagline}>
          <h2 className={poppins.className}>Reclaiming Movement, Restoring Life.</h2>
          {cookies ? <button onClick={() => router.push("/patient/appointment/facetoface")}>BOOK NOW</button> : <button onClick={() => router.push("/auth/login")}>BOOK NOW</button>}
          <div className={styles.carousel}>
            {imagesBgSlider.map(({ name, path, count }) => (
              slider === count ? <Image key={name}
                blurDataURL={path}
                src={path}
                alt=""
                priority
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center"
                }} /> : null
            ))}
          </div>

        </div>
        <div className={styles.title}>
          <h2 className={poppins.className}>Services</h2>
        </div>
        <div className={styles.services}>
          {data?.getAllServices.map(({ services, image, servicesID, descriptions }: { services: string, image: string, servicesID: string, descriptions: string }) => (
            <div key={servicesID} className={styles.card}>
              <div className={styles.imgbox}>
                <Image src={image} alt="physical therapy" fill style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  imageResolution: "from-image"
                }} />
              </div>
              <div className={styles.content}>
                <h2 className={poppins.className}>{services}</h2>
                <p className={oxygen.className}>{descriptions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

(Home as PageWithLayout).layout = MainLayout
export default Home
