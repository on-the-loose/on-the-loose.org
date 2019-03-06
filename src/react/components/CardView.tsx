import React, { PropsWithChildren } from 'react'
import css from '@emotion/css'
import { Button } from 'antd'

export interface Props {
  headerImage?: string
}

export default function CardView(props: PropsWithChildren<Props>) {
  return (
    <div css={styles.container}>
      {props.headerImage && (
        <div css={styles.headerImageWrap}>
          <img css={styles.headerImage} src={props.headerImage} alt="trip image" />
        </div>
      )}
      <div css={styles.content}>{props.children}</div>
    </div>
  )
}

const styles = {
  headerImageWrap: css`
    width: 100%;
    height: 10rem;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
  `,
  headerImage: css`
    width: 100%;

    transform: translateY(-25%);
  `,
  container: css`
    position: absolute;

    top: 7rem;
    bottom: 2rem;
    left: 10rem;
    right: 10rem;

    @media (max-width: 950px) {
      top: 6rem;
      bottom: 2rem;
      left: 5rem;
      right: 5rem;
    }

    @media (max-width: 750px) {
      top: 6rem;
      bottom: 2rem;
      left: 1rem;
      right: 1rem;
    }

    margin: auto;

    background-color: white;
    border-radius: 0.5rem;

    max-width: 50rem;
    max-height: 100%;
    overflow: scroll;
  `,

  content: css`
    padding: 1rem 2rem;
  `
}
