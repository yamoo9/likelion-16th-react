interface ImageProps {
  alt: string
  src: string
  width: number
  height: number
}

function Image(props: ImageProps) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      loading="lazy"
    />
  )
}

export default Image
