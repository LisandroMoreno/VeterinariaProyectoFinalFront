const ImageC = ({ urlImagen, alternativo, ancho }) => {
  /*   console.log(urlImagen); */
  return (
    <>
      <img src={urlImagen} alt={alternativo} width={ancho} />
    </>
  );
};

export default ImageC;