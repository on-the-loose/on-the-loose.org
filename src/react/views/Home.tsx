import React from 'react'
import css from '@emotion/css'
import Gallery from 'react-photo-gallery'

export default function Home() {
  return (
    <div>
      <div css={styles.clubTitle}>On The Loose</div>
      <div css={styles.clubSubTitle}>The outdoors club of the Claremont Colleges</div>
      <div css={styles.clubDescription}>
        <p>
          Welcome! OTL helps students organize trips to destinations across California and the
          Southwestern states.
        </p>
        <p>
          We make it easy for students to backpack, climb, car-camp, surf, bike, and enjoy the
          outdoors in any fashion. To these ends, we offer a wide-ranging assortment of gear to all
          students for free in partnership with the Pomona College Outdoors Education Center. We
          also provide extensive subsidies for our adventures.
        </p>
        <p>
          We welcome students of all ability levels. We host talks, classes and training to hone our
          skills. Every week On the Loose is sure to have something to excite you, on campus and
          off. Whatever your level of experience, we hope to see you soon on trail, in the surf, on
          the rocks, or in a big comfy couch at one of our Shindigs! Happy trails!
        </p>
      </div>
      <div
        css={css`
          max-width: 45rem;
          margin: auto;
        `}
      >
        <Gallery direction="column" photos={photos} />;
      </div>
    </div>
  )
}

const photos = [
  {
    src:
      'https://lh3.googleusercontent.com/WZou5lrUNe5aNYcLWIcV2qnPESBWjH9PSOw-hHyfhq8B36SESCIQgtzLgrRqusvzpI4ovc4oiQqzAc6cvYEU6fL_99y2Lmbi8kByE5kX9w4SHxy1dMSPkC9YVJ9Gs7Ix3KFQ129t3igGHYVtGrOb5jj08Q9pouPaszBc2bJq85QIdQBolYw2QRaAw8dd7f2daE9wVbntYP-gnEvGD0F9iEbMgWZ76RxWYaICfxAtfJB-fRyJpLTaBCIMnsWpD7Ix9DeosPN6PEnCNanE2EbtF58EjMJIHgtjFDHh3aWOZrLNC7HTfP2gT38_-8uUj1xOiRrsRH43CRoQmwfTpgv64iExzXcYOhv0WUtnbqdnkyRyZhddZwzCsG4RKNd-tDNGG7Wblkb5Al_lHJ6loFqRN-SBiFTz5A9W3PsILGyFbvDK2sczVMQ7exI_tiahydDrXBnk8AH4CYTb_k8Y8cNHCkom2oo-6FJYyGOFFfnTZdFwIU0wwlwFdRQWMUJu8NiScBWh6GNFR5mjjx8LZUFlHEeNmQEFgYu11VeCnN5YAdSpJL8Faktz2OTUw5t15cdYPcOMwmsACNEr8WsR_WcmZL-1HARKUXv5ofXsQELfFwT5KSZ4YMBle0NGFvzepP1uNlNG_HqZkJlxOEDT7J20SwteuXIp3DSPjYtzyMq8uLj8nuGB9ons3OFCQ84uOxBULa6UJjxl9TKrEjVokxVPWu6V=w996-h747-no',
    width: 1.5,
    height: 1
  },
  {
    src:
      'https://lh3.googleusercontent.com/ekTiMaSTpv2YGd8ZaHyphvpszR7GE4FUJP6Qudheh6zbFG1Lg89aAGd34Q7QHLs1UXSbW5IBWtiuFv-OpnukcvaXs2lYP0RqnIgzPOnVwlqUmHswqUVOY5gfpF4yAxVY-YoQvMODVa9ddeKIPJjgz4zBg9DWV32R7KaLQ2qR28W3VAg3t7gh0w7gDk9ANhA3jGtFVx1nJBGeuWagBiYBVMgaB47bLvVL_02zOjoK98fUveFUr7UKPdryQ0grpQ7nWzZgsscguVHkfL8OA8d2uhGZAeMd9O3KOHZGjbUMcbiDSeL6M5QgLB31E0Q1XUmsuM9xkzmTqnLwJjLl36KxvzFqdLyD8DvZ0xdcfzswP8DHg9NDH0AsIldOOHOXRWU1XuU56LbYyVNMDRN8PrAikO2FrZnb-vPT0M0nL68bq_A2ffdFYwzzVSlHrysA5JDYMkOPKSkckPsRjdT9OeyITvjZw89Ext3xw3rikJCD24bmI8It22D7KwldHF-8y0hUV9Q0zshOcrb5BvUYsqaJABg0Pa8fIkQq7KC81Q-4P4jrNa2GxjnI67SbLAB0heN827D1jXmLWbOaqajUbnlefhsH4aQ5cGEnz8tl9MEmD7hnbKV9uMeyQfHJaF_IU8acqEMsidMpwehDSgIYDmnyoWKz09F905jR6Hhjlh4svvogu_zHas0fXxSy4WSYaji-sr6xRlUdk1l2XUnRooNbwqPi=w2088-h1566-no',
    width: 1.5,
    height: 1
  },
  {
    src:
      'https://lh3.googleusercontent.com/fkEoH_G1NeLiKp5cq6ti02MRWC_6fSIR6gTMqkO-ZQByFeLDjgqmd_Zsbp_AczMccNhRgyczwLsN0wQkeeTdWkJ44PhylVPvz_aHe6JNe9m7lsTB8BTogbsPIseuiikm-0qpVZz7-S1Kt_KTD7FV8C4QWIl-VDiIyn1reMF_IjiH7o1hbmhs0_YPZqQMOrUGEIxrFluu2rYRmTbVzl9vmldnqeKWL3zDy02CxQWWB7Mk32n_twwR21akj0_95XljmbLUmkzRwklo91uWllBYWh1vpkhF-KLEAXRJPMoJc06A84zMpRGO60-0DA0i3DWn_WEcc5IxZHQVaKaXIVMN2xtjjL_InPadVpQVDWN0wWqRaaDLukwm178pU4RcvGXtc9WSqfJ7llyVsbuzLaHNrSC0PhhJuZ1jlWGj3FN1A9w92YmGjWkV75-uKkk-RkX2XNQEI-HesfMeaSjbHpshvkTBYQY6HMca2blT-3P02QgayL2xylRuc0uuM8FzIQUYPhcRfpjZHKqHP0Fz-bIoAL_4yyz--nTQBmD-sjx3-IgOVqrSPBQGzdUnyHTN96z8NvD-ECgFXWwlLFqQnhm0YArL6roK5zvQYV20n0g8aUYzKsnLaARuBwibcFmhrBIM7aO4lZ3yBoSNQPeWAHuff3G6zyPJayXiL7T47_C2h-Iqeo4gy-JdWMi0xwoesdo4nLQnx4MzZnSbUQLOfKjL1UZ0=w2266-h1700-no',
    width: 1.5,
    height: 1
  },
  {
    src:
      'https://lh3.googleusercontent.com/O3ZdIFAr397-Klwn2Lkyyc8OLK5cdFcTdHJ9x0NpjNXZdPEo7wwiLVyuqlt3k83ctvCxNwPRQHElGPeuBWS__wsg2cGfKqQpTel3H-aBk2guEeVpvZyv-PuxgMOXuA0g5LfPAuDVASGUoyAadEsnMYKmzQKS28P35PEOtV2cdcgO1_zzmiQW08GzjpNct7tjXtgZV3_qB7S6BL9mjwwZJiMUkDSKAubdKU_ncGXlpAnwmwAcsA7lavfHRUXr5iA3_Z0EEyKtE8HAZyG2GZNpyzlKbW0Bn54if_h3moQFpJFJC9qhRqDpzw5FRAHEap3XJoywd7y5HzcjSj6CrA2sJh4mFp7oz_FMqZTnO04ZNcjqqc5KMQ1pLOwNwwkI14Hju1fEjAqlFaG9p4W-fvKTX0sY3X1z9-WWOenKzTbPlk0ijCWbqRQGbtNL6jcjjYxcVzwA-docC862GRpT32jNpZYYcob3436xRSMHBOjLZG9T6A9AIwW8qgAFmGM4bhcG8bBDhV4_hkTpaQIOEe-uNnonhZwD6dsLiXC04fiI8h1uzKCCcel_u_-3TiUrMQZRa7d8Wsm4-3IerNIYYlQ3YSxEEVcLV4go2qhYUsg4sD4sFgryexmlYseDiHbOJh_kODrAH95VS3FjvUnNanMI-V_WKtzL36-JBmgmbuLCPK--_ltYlp1lZS0tqoxPJXETzdy42FlDu2SMLf4FFI_cUIIJ=w388-h259-no',
    width: 1.5,
    height: 1
  }
]

const styles = {
  clubTitle: css`
    margin-top: 1rem;
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    font-family: 'Josefin Sans', sans-serif;

    @media (max-width: 750px) {
      margin-top: 0rem;
    }
  `,

  clubSubTitle: css`
    text-align: center;
    font-size: 1.2rem;
  `,

  clubDescription: css`
    margin: 4rem auto;
    max-width: 40rem;
    font-size: 1.1rem;
    background-color: rgba(247, 242, 237, 0.8);
    box-shadow: 0px 0px 100px 50px rgba(247, 242, 237, 0.8);

    @media (max-width: 750px) {
      margin-top: 2rem;
    }
  `
}
