import React from 'react'
import css from '@emotion/css'
import Gallery from 'react-photo-gallery'
import _ from 'lodash'

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
          HI We welcome students of all ability levels. We host talks, classes and training to hone
          our skills. Every week On the Loose is sure to have something to excite you, on campus and
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
        <Gallery photos={photos} />
      </div>
      <div css={styles.clubDescription} style={{ fontSize: '0.95rem' }}>
        Web design and development by <a href="https://simpfish.me">Simon Posada Fishman</a>. Please
        reach out with any feedback or comments at{' '}
        <a href="mailto:otlstaff@gmail.com">otlstaff@gmail.com</a> or directly to Simon. This is
        still a work in progress and we apprecitate your feedback :)
      </div>
    </div>
  )
}

const photos = _.shuffle([
  {
    src:
      'https://lh3.googleusercontent.com/vCXs78q5letPZnUl41HEpaev8XHJx7Y-BN2J0pdLiYbYxylqnfz2Mwc9SiksWgC6xeO7b_QAUGB5ssdfjJyj19sSVVi3cbbIDnX0COPCw7wEHwpz_iS3mhGeBvys5Db2u0qfKHQfkQbhrEB9iqAt37eV1fjpqk_bZdnlpz1hAiZKc7K6n3Oyvoiwlqgax153fjQQLjJ_xpuVZo3-juu9frZ0zgGFAvapcUyNU_lHxPmVAAMQubOjB8cFtajekk6Arbe-ORPBgIyIc5AMN2XJBOhtvbfzrDGXwbruI27qKBGSM01pptGa03Ft0bx6riUA8XpsTFMUXxOgqUvcg4R9K8uOqrZ0Y08PBbIdyaQIgIkTXgfrsuVgBlCJ_Sncfo76v834gd-fFJ0ZoccAvEhKkjVhsxJttI04xXXdXg0OS4vzrXUsG4htLovuc6q1IGlmD6zlFOwuXtk05g0CORalMWJHxlTfClCNjfFXn_M1BfYZfJdWwgaNyxTH5IsUHuS8ngyy3symVA0sJOotBkqeX_JO7O3Ce8YzflB3aX6Dq8dmgFjcCJPFi-qn7QJ0CUEltmklzwQcOXE6AE2iYjydQphlQH2KUmkKqyRUWJUmf8-MvQv2zHi2hohdw5L8TLMMUg2ph4t46S9iFQnswKvuhpHSP331xZVqeV3D6jsBFY8Pr7H4ezJhqNgvspxL8w2kMdk6ewMshKu93H57W-jX_hny=w2044-h515-no',
    width: 4,
    height: 1
  },
  {
    src:
      'https://lh3.googleusercontent.com/IpctqUunrx_JIqqIChKLPMdhyr3uoHKS2FPHYc3IqtwoOACliTBowMOZ_XunRWDvK1Ii2cTzjhXSiVL3rahl8eCsGdot9xxXTWcRTlnZJAT4qPYqmu2v4f_FDXPYU9QesUuKGFKZUmtDzMkFd9QP91P8lN8gUT5AziFHKfX_vMFGwh2FxcRn-bAY_-bhbsC6J2LodXtYAULVtSqSywSdEcNBk1j36Qw231F8ks8dzNGzmEgNX6jgbG6_vlTGt4O8rTANL_e7uM5SsA9otYlTRaWaRkIAGFDp9EvkTX2RGGxM5mb9KsTJJ2UGB7EzRha3gryH0fSih-c7I97L14wD8WWDy-YrhW70qn25VdNC8vp4B4PUYiX3epoSsD6Y0VKUMMcXLl4NMkr8wyPOxmFWlENSYB0aCy_woLL9PIvLJHdQhhGSccLk7zwfWCEdbPmdBiQWHTwjwxxgEc7W1XVZiPi2sGPo8ixcYIJa8o6OyOhcnJDr1IxvIB8R7PFYAKKulrFTPD-mhg49lPKzPEtJrsVasCTmBIbPucUR87LjeUmKDOk8SDpddFizs6eroziLBELVTOSSfD9uMSUfrzqcNXs_8jIDemmiASPiN5B2PHoPPmcE5vmH0sgEZ5sePNNe4ZU0jPvHX4-p-_kh0ch1D2pPZIYXh_A=w2256-h1692-no',
    width: 2256,
    height: 1692
  },
  {
    src:
      'https://lh3.googleusercontent.com/ekTiMaSTpv2YGd8ZaHyphvpszR7GE4FUJP6Qudheh6zbFG1Lg89aAGd34Q7QHLs1UXSbW5IBWtiuFv-OpnukcvaXs2lYP0RqnIgzPOnVwlqUmHswqUVOY5gfpF4yAxVY-YoQvMODVa9ddeKIPJjgz4zBg9DWV32R7KaLQ2qR28W3VAg3t7gh0w7gDk9ANhA3jGtFVx1nJBGeuWagBiYBVMgaB47bLvVL_02zOjoK98fUveFUr7UKPdryQ0grpQ7nWzZgsscguVHkfL8OA8d2uhGZAeMd9O3KOHZGjbUMcbiDSeL6M5QgLB31E0Q1XUmsuM9xkzmTqnLwJjLl36KxvzFqdLyD8DvZ0xdcfzswP8DHg9NDH0AsIldOOHOXRWU1XuU56LbYyVNMDRN8PrAikO2FrZnb-vPT0M0nL68bq_A2ffdFYwzzVSlHrysA5JDYMkOPKSkckPsRjdT9OeyITvjZw89Ext3xw3rikJCD24bmI8It22D7KwldHF-8y0hUV9Q0zshOcrb5BvUYsqaJABg0Pa8fIkQq7KC81Q-4P4jrNa2GxjnI67SbLAB0heN827D1jXmLWbOaqajUbnlefhsH4aQ5cGEnz8tl9MEmD7hnbKV9uMeyQfHJaF_IU8acqEMsidMpwehDSgIYDmnyoWKz09F905jR6Hhjlh4svvogu_zHas0fXxSy4WSYaji-sr6xRlUdk1l2XUnRooNbwqPi=w2256-h1692-no',
    width: 2256,
    height: 1692
  },
  {
    src:
      'https://lh3.googleusercontent.com/fkEoH_G1NeLiKp5cq6ti02MRWC_6fSIR6gTMqkO-ZQByFeLDjgqmd_Zsbp_AczMccNhRgyczwLsN0wQkeeTdWkJ44PhylVPvz_aHe6JNe9m7lsTB8BTogbsPIseuiikm-0qpVZz7-S1Kt_KTD7FV8C4QWIl-VDiIyn1reMF_IjiH7o1hbmhs0_YPZqQMOrUGEIxrFluu2rYRmTbVzl9vmldnqeKWL3zDy02CxQWWB7Mk32n_twwR21akj0_95XljmbLUmkzRwklo91uWllBYWh1vpkhF-KLEAXRJPMoJc06A84zMpRGO60-0DA0i3DWn_WEcc5IxZHQVaKaXIVMN2xtjjL_InPadVpQVDWN0wWqRaaDLukwm178pU4RcvGXtc9WSqfJ7llyVsbuzLaHNrSC0PhhJuZ1jlWGj3FN1A9w92YmGjWkV75-uKkk-RkX2XNQEI-HesfMeaSjbHpshvkTBYQY6HMca2blT-3P02QgayL2xylRuc0uuM8FzIQUYPhcRfpjZHKqHP0Fz-bIoAL_4yyz--nTQBmD-sjx3-IgOVqrSPBQGzdUnyHTN96z8NvD-ECgFXWwlLFqQnhm0YArL6roK5zvQYV20n0g8aUYzKsnLaARuBwibcFmhrBIM7aO4lZ3yBoSNQPeWAHuff3G6zyPJayXiL7T47_C2h-Iqeo4gy-JdWMi0xwoesdo4nLQnx4MzZnSbUQLOfKjL1UZ0=w2256-h1692-no',
    width: 2256,
    height: 1692
  },
  {
    src:
      'https://lh3.googleusercontent.com/O3ZdIFAr397-Klwn2Lkyyc8OLK5cdFcTdHJ9x0NpjNXZdPEo7wwiLVyuqlt3k83ctvCxNwPRQHElGPeuBWS__wsg2cGfKqQpTel3H-aBk2guEeVpvZyv-PuxgMOXuA0g5LfPAuDVASGUoyAadEsnMYKmzQKS28P35PEOtV2cdcgO1_zzmiQW08GzjpNct7tjXtgZV3_qB7S6BL9mjwwZJiMUkDSKAubdKU_ncGXlpAnwmwAcsA7lavfHRUXr5iA3_Z0EEyKtE8HAZyG2GZNpyzlKbW0Bn54if_h3moQFpJFJC9qhRqDpzw5FRAHEap3XJoywd7y5HzcjSj6CrA2sJh4mFp7oz_FMqZTnO04ZNcjqqc5KMQ1pLOwNwwkI14Hju1fEjAqlFaG9p4W-fvKTX0sY3X1z9-WWOenKzTbPlk0ijCWbqRQGbtNL6jcjjYxcVzwA-docC862GRpT32jNpZYYcob3436xRSMHBOjLZG9T6A9AIwW8qgAFmGM4bhcG8bBDhV4_hkTpaQIOEe-uNnonhZwD6dsLiXC04fiI8h1uzKCCcel_u_-3TiUrMQZRa7d8Wsm4-3IerNIYYlQ3YSxEEVcLV4go2qhYUsg4sD4sFgryexmlYseDiHbOJh_kODrAH95VS3FjvUnNanMI-V_WKtzL36-JBmgmbuLCPK--_ltYlp1lZS0tqoxPJXETzdy42FlDu2SMLf4FFI_cUIIJ=w2256-h1504-no',
    width: 2256,
    height: 1504
  },
  {
    src:
      'https://lh3.googleusercontent.com/xn9-AcyQ1MvJBY8cBtE5m43HaLoByekoB-WNKMi64Rs5hOpKQfcCox_dPDI3OVvU-CVGXRepMjAgPmxBb0H5mHGfTazpKWtGrnoBYnX48wbOeWGEC9UQA4L5DF1q1y80MVrzeBvY-PcRYdAxfXu6-LFkTUohZRZvTqp_m_0q9osQF9imc_AEdviz9Ki4sGI10DsK8itvoFtwanpMK1H6B_Z3GTTf8VEuk3NqfDqyEyrTfDPrRSz0u7gy8wf1IQY2OL4SGhmnRMDRd6zxhguTqHEowfjaev_ExfIdw9lKL7Ug0_e7X4Fo3NArCpkp6sWPWkEXr62ZjH3_YPFvG8c2nBrviWkBH03PQ6tqsqgU4AT1QyURxd1j008w7-nBPUZ1pMvIpIBmiZCyUBaqMMaA4-K8i_2JdCXbkkLPFbfctREtPGLBNBR_0vvLZqueFqqyeDL7BxtNxZNxIjbx86ViT7ajxUiB6bOUlOcp3VJbe22ON0h2IhKPm9TC6zy3ANaYy7JVh69_iPWLmdO8V03m2k7X8QRjD7NyFhTrp2NeZGARrymRZSTJ8Iu--6-Icu02YzPjBzz6Eq9sg-VuqtNM2_kwQ9YYGSu36SZZYPZ-Unbh_3LqNr2anQHHIGbk-ombiZJ8KQPVAs5hyZ66bQr5ySSx0qP7P17LWdLPApRQJOHU0S-0VoNljc6V4Y9jBkQI2x6X4GqR_iJjUOMGD15ioqFa=w1280-h960-no',
    width: 1280,
    height: 960
  },
  {
    src:
      'https://lh3.googleusercontent.com/qD39B5LY_aMo2p5mtws_WXcITyntkFqWuz-rTwrkVgoU26BjCCtV-9A_fLlTYQiWVFnKlC_Gno86kRQF5ItfK6I_5XdX8k8bgV_9s56YmeMXPrwKprdpwPII3U2i4N8_LB5UEdUaTpBkM8nPqQlYtT1MbEsUpDHRgvZCci60m5lR3syJoQ_vaSyahmQuCDjMYY_oHX0xiH496xITf4UL_oaTe0ee_YupNU5BDtNVDKzgbdiaXXw4g8TLXV8mLhXTX5nzCXpb_pAT-SNtsQ3zHazHBVDvYu0LpU9AJjVGo8h1ZgJfNd9kQ9P_N8Z-udH2WwzhJ6cmx_4a7BFvNz-xVLq1F09Kff4Q8TtORbUhhR8NseCJB-WPv8dZ_JNddWeJpXfQxRFKaBC-zFZ-J1QUYb960k-WyZlXeg0fheJ1evIdbkFUqDfbx8D37xD80kd3XNDb3L3OZp2EQu4W_0k9tNAisuupEH8r1hNTYaqbLK4x6-So7QJo7qt7V0hLBwLp9fvwK9gs9VvYYhqzedeqtKz8TEEuGZVUV74Q7TGS7hemm7jwu9z7rHlcfTDpBjpW3yHSkhSi6DY0RyME_XAS9wELdky94SwqMmaj11AiG5COukm78UxRzXpZXYrSDJMYw8k5NtMxvr2kaxNJnjtsIfps0v6V_PMMZq8vqXJXwQY664vNADspWdMRz9B0n2zrAs1FzlSka6dYZdVCZX8IgZti=w1280-h960-no',
    width: 1280,
    height: 960
  },
  {
    src:
      'https://lh3.googleusercontent.com/wlra9ECui8FZUNrxFiyreTAaAZhqLaoK0BVii6GxIlZAhaFABTvDdICMmY28gwKiFpdAfJTLemwEYbzaNUnAiGjo-AZoyPL5tq-P_woCRt0v6lSkoeqvIdspgxl4rZo_PrFVlz5ZV93JwRACI8EUPManfS9CC_cL0pW6hNW6Rq64XT7IAIGxZyiVTVN-8uvbiV9w2fFYreAxQ3b2FchaXdTVI11NURH5JA2r1Ai0LScjeyEQK01t0Y9QcDvkGCj1ZmzlJKol-ZZPR8kK08-ZNNPrcE6fWX-gmPqW_JO610ux2OgcUn5XlNoqf3_erJAjYKhY0rVY6NtXuBa1ZdJRaABOH6Of_Kt6Ni0lvco_TGOi7Ymo9puAyYEXAena0wn1z6M5oXwM9AC33IxRFXTn5FqIM6IcVKeFrNpq6SFI5f1W7l2wC7_LhsmUotF83-XUo2g6ok6NxM_rjd35w37x2BZl2cACzVgEAJRXM-KEawY6UcjucyyFeNXjXbJOZmkUvw29YK4PhrQSMtnknOuQ7o0wDgB28JOKope8dlscBsBEz8InE2Tu4VhbRT_43Li2JbeEQpVnutBULgSpXRyeOlVU8hbE6YZLlxHYSK4hOuKGW_0vrzgElEZDQiLH2EQWMXeM9x-uytngMky6VHPJXJtRyzLm0ZEEUg1MnrxcbZKNZQ2ucYKKw9OIbT1Mh8RSdvZGIl6cfvwRK2m1x9P_wIq5=w1200-h301-no',
    width: 1200,
    height: 301
  },
  {
    src:
      'https://lh3.googleusercontent.com/UAAyZDYfc7wt2L4KphhfCgDJ_ThjXLGygMg5Cvpsl-FFPRL_7QRje4B5PaERFra-L7KlRBIJttXTMtIg6VGwiz7AqeaxonH7iZ3PP3Jku0nTKwXlQQTI_NMIbF71wJT-N8fk-gHYJIIAiaH6CdDSIbNl8dMfcoQwEW9fRnynpjK-Hqxaqr-LhluDj88p2Nm4LWhje50LwLmrzxs-8H6xmIFYE2RqVdm8Y-udJ8VwjqhSGmD2DLlrhnQg0TLMhrx2IveXXygxdXBcxyNz5qARnSLKUTYkUIKFbKZvI-nf2mrLSuzkcP6D5MIusXrT2BUbefrPF-k4labSMRIuQfkbjYuz9CE_lb4EL7ZLn2DeXm1usy63MXBCclZ0o5tjXfQFBL-5xvfZVlavdBvfDvYUXIOHoy1qAQsZPryEGxFCAg4Oue9Pl-YsUl7q_V7k3iawbjMcaGl041VDYQiaQ2F4pmDa6fJ1DH4uWrQGk1aSb6fQMlZFkCKXab_r7vzvAwqSJn7Owu2CqVs4-y-0VXh4Rn30pJ94mMaYcnyowjWWY1cZdskSyy36kEAJsKxK4-uKtaB2R5ZgoRpqongtK5yc44wlM0mTTAMVyovvcTnDYDQwY9uUd6DtTuLIvn7w-pHLAowM4Ke8Lk_4kVPPIbYzi5OD0XO1h7LNobhGSpXxgu5wEMgErmA8mLG54XN-6Nyj29R5JJ7Oh5Hk7746_ekj_oLP=w1280-h853-no',
    width: 1280,
    height: 853
  },
  {
    src:
      'https://lh3.googleusercontent.com/0qgOv1ZR7FRN7xjxtNZndH6h2tdibFsO6rfdsvQpi-3MqxgT9i2zjRHXmkm_eKmBFQYy6LtJwvyFsPSAQppIHrBT5GGwWGBGnwOd6zTA_DIbS4R3bULIsScAV9z3adSJMxYl-g8XUg5SJuY_dG7FdXNu7jQqLoP5-jOHt2yVdBdx9Ejqm7e00R6DFIutT6RZVWal3mUspuSTIh8cCIlDsERcmf-yRXFaqhJdqxYI_hmgXygLVzyl8aikS4euVtD19tNo6_SBWA0YZ3pLTLnKmZkxmBdZnmBHy3kJXkidVMPrLZgDe2h07vOuutLJfjRLtdjAqLEodcc5PEbPjhYPfLTsJYtlApRg-0C4VLCfUItlRxfSAla4Aya42lqE-F2sPc-XlNG5YzRYbVjY9HtPVQlOKWTOa_C4Fy-Oo5ic90K5lHTJY3sSznJVk-eWD7zxVhEHDtgnJE5FARtpo04C0_UznNOITkFo7IbaMcJe72C6JAdVXI4pYTaxEDKOlLiuyCJXoIEcpKVJfAWK7KmxW7CEJ_tA4MrghDh_YDTIyeukD9JfQ3F-Iq9EzddHj3IoqRJrMWlKNWIqyYpqljq3v4rnLwbh9e8-ZVYr_P5C_TmRaGhZNy97yErndKk8ZgVhTluEI9Se6gT_dz7tU7caWoO_ydGctKUrydQSkgxggkaePmyHdL1t5IO5O6LOjH_UriZrFUyc9QCYHCWw2vDw5NoJ=w1280-h853-no',
    width: 1280,
    height: 853
  },
  {
    src:
      'https://lh3.googleusercontent.com/HV8oUzLhZxePy9xVxYBUIMGWehsQAgJY_f0qUc9Bb9aKx0RWJVmABW8gWHesd-5kS-5-7JfbdKONsps63fV_0Glfta2tImvecSZe3nN13ZzZp2ztPfEkC26uKOjBhT6Sj6jftk3d1rnKhnMGTQd3ZPHGssU2goVon0T0W15fOqSJuD379Pt0lOdlqs6shjVQ3YdwGbIPbuKxwJcj5Qrz85PwPXlb4UXyb-zC-0a0VNlABoA1jZMtuh7z_qa63VAOIkkrhBsmaWQW_3BPvpH1XyHTzQMu67WdicEq4eFHqiU_txd5W4oTCbiksVbd3UGc1LJI1a9I8bNFj8O0wtT3OAxd5SyAH6QhZAm-LiuHmffGqJNxr4k_F8zH8I9_ICSmiBVN7ofwyjkL_EYjbYCqkCEU1N0En409xcC4Ymnk404zw6LC64GRaPDsl61deLLVDYjeYPGt38SXPmPiSr77nfgyi1yeS7MlclUKOCK9gD97WVy9-lIb7Vr1_cQk-_wHtOe1wjTYqrhUznOvPg-lN7gbi-uLpFqBaySQ0gzc7F6EMLaNyXgEierBnS2m3F0k0UNnUX9UBJh2-HBLJdQEqgKUaBLQdbbig5HXkLAFQ4-eGaeYEP938zJJi_pwQ01JmL9jet8doWHhmL2e-V7LKE9ZhYIU_zFuYnzI-7H_5VvMmhJ9dKf9s9TnqDiiitforJnC63j1bRFRVYUJ4xH9sL_G=w1024-h577-no',
    width: 1024,
    height: 577
  },
  {
    src:
      'https://lh3.googleusercontent.com/FQ7qEpeQ_NiCncgv8t9jzqwlKC9yJ_z6ArD-fs2zhNJB20mt5FyayOD7v25t4ofs72aaEzXaAIcMCgpCn78T_3h5GXqy5vJmgDIfHK0icRSdRU4W7pdhpf35AxHqiIK39oq7KN6I9zyBGFdF31DxsW9ou0AReFpf4CBZtr3n84KetrPfxF5bip0Ht5-62w5w8x4ZHPrdl5oUg4ReZZBs1MhmU2g_iqXJvwc5JZb-fCv7PWtdwuNWoUoDFQHXOIiCgf-IXC7k33ibPcvpMVKB3naPRhlocXoXXfuntEEDbthX3ah7XzVIqx2ZbHMl-PDSM7CCnMzBF1K5oSYZcnpB9RygMDPwXlaNQ04yL3dN5a7uy-jqdrYplBV6wGUHU5GRluisTQ9yWomoqY3Ua4BSfMnjXf8gdFNtqiismdcYmr1KzdgVP8-ypQ2vQWXnfL7xBYS09-WQ6DWBtGIBvi6XKm3jA8rPVmjU2onqZ1q9_BikV35hNWcvcWejqtXg0rSmavzwInBILpNfK-Kkj412WXyGRaIHIDJGUv3_7uamFCW4FU3PjGAyTyiPOQX2sPmaL5m05KQME7r39orxQ77n8x2letmOrbYhcfttjluhFy8r5D5F-p70LgTMPAqjFYk8iJefebpDtAMOdhrzKUwdC3AysKXc7GlBRhwuqcS0lM9YU1AF9anUw47VGGZXQxdTrZl24CjSOKb-AwKJB-O_IMOz=w960-h720-no',
    width: 960,
    height: 720
  },
  {
    src:
      'https://lh3.googleusercontent.com/psZ7KkWIYsHAIUCHJNB8wW1yEKr46j5wDimhmtRFzAayPDWYL_KsaLLnRSPwZ8UEd48zXWbCb1u0pXAx1C1AS8QlyubIfte0SDl6w8HEbNzo_Bot7mOkDBH38Dz4mLFALvN-v6swt-IRu9w2V9QGzq5yOYpVQ2GpeC9Wvgxf6YJ295p3JHCNOKR1wsPUbQ6lK_ZMEadnkw_UUPXvfcIy8KppXBRsOcCUhalyj4fMXnpfUj0KIYGspQvVbndmi-pgDdGb7WcTs5cEes3sPjrc6jYv6PYf3CFE8jApAAwzHbrKtvaP88vapVYmHc8nwdMtyCoKhxr-Hyc_Ch1kbpm_RCDkHQVE1jXR6yqqtIVjwtqU4__uCVj-xI_8JvWI33_oXEuZBQcwyQxpUwHzQCqOHhYE2DFkPipmtuJEoIJ4pXV8FRkgaSXOrFw0hzboZwTFiDgMgw7AuM4688M_hrTjJgWjlqsp6zVOdNkzmITU8ycyQPRWb__oQiHacSxTWSNVTd0VmMGnjYhmWzN-mhiVe1wIKU6HBszDdXbvu_nE21oCBp51wv3TtLKJsp1x-AY45awcHHxJP1CcTgowx2SJ5PBQfE7_y65Rh1bpXYX_Tf_2Y4enb-PgO6YxU8mr5V9Y20IwtnCLO_0_1OwOiHPXDk5dpu8ekkHSZkHQOF4H8bkot_Ls4TjYZReG9Rz99HuhroK_8C0COO_36jenntoOLJt3=w813-h610-no',
    width: 813,
    height: 610
  },
  {
    src:
      'https://lh3.googleusercontent.com/Jyjycs-VOM7Ygv_vXQmkR0FsczCsBkvaqK0ey3iI1iCRoZitXnyIFGmzWCG7NKoaO8ZZ5005lDGDqPVHvaTAJk8EBlfE9apTEuW8PCwXo_wf5RUIJaFWQDuyok_M54JnZA6yJO3MXmcP_iaKw8wV5I2kN6H-fM1mq2FInxxB2w1rvEimIK3t2R6bqI5TD2MXgmjueCKhshZp6wWdVTmS0n7gwWqhBM5XboF2VSX9ZMUk8prTJiTIivdPrzr-dhdoRNJSjYr6nsr5OeqlNxScrgbPKB01mHhXmmi98Eltt7BLYcYBZFeoRuw-PtrmCojMGQodLdM6TGR0EEWsXI-9Y7SOwj1L_f6JZPYoz5OINEYKu8Gwia2BBods2fbXaX-gbEvlBc2VexBlthHpmga7CbHBJ5JWDmfWtyknjRBZRp-T3huachqv1F5kr4eIHzC9iOfr_ZWBqo5q2JZz7iokxL8TKE4R0fesOTa9tQhypPuiSjdtgYn8vAE54bwGE0U72JYbASzxHpP8okYvu2z-AUkHqN7O2rQsxXi0r4gMY4dSziczi5ugeTzn77Y64UjbfQVyMEystXQAaVDX7AnOz3ZYizavfnYucevm4Mi5-WnPFr1hiox0mcP5RuLiHOlEao_VfbRoSh9PunS38VJ4qyteTHxXGOlomOooiIl_FP0QBdUakJ0RruYLcQ1K0h_bnqqMoBspCN9gRp5Mm2HQxAA6=w920-h610-no',
    width: 920,
    height: 610
  }
])

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
