import { useState } from 'react';
import { GalleryItemStyled, ImageStyled } from './ImageGalleryItem.styled';
import Modal from 'react-modal';
import { ImageModal } from 'components/Modal/Modal';
import { Loader } from '../Loader/Loader';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(135, 198, 237, 0.75)',
  },
};

Modal.setAppElement('#root');

export const ImageGalleryItem = ({ srcWeb, srcLarge, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsLoading(false);
  };

  return (
    <GalleryItemStyled>
      {isLoading && <Loader />}
      <ImageStyled src={srcWeb} alt={alt} onClick={openModal} />
      <ImageModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        customStyles={customStyles}
        src={srcLarge}
        alt={alt}
      />
    </GalleryItemStyled>
  );
};
