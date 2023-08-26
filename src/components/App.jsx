import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { GlobalStyle } from './GlobalStyled';
import { Layout } from './Layout.js';
import { Loader } from './Loader/Loader';
import { fetchApi } from './Api';
import { BtnLoadMore } from './ButtonLoadMore/ButtonLoadMore';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);

    const getImages = async () => {
      const dataImages = await fetchApi(query, page);
      const imagesHits = dataImages.hits;
      console.log(dataImages.total);

      if (!imagesHits.length) {
        toast.error(
          'No results were found for your search, please try something else.'
        );
      }
      try {
        setImages(prevState => [...prevState, ...imagesHits]);
        setIsLoading(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleFormSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage(prevState => prevState + 1);

  return (
    <Layout>
      <Searchbar onFormSubmit={handleFormSubmit}></Searchbar>

      <ImageGallery images={images}></ImageGallery>
      {isLoading && <Loader />}
      {images.length > 0 && (
        <BtnLoadMore onClick={handleLoadMore}></BtnLoadMore>
      )}
      <Toaster autoClose={3000} />
      <GlobalStyle />
      {error &&
        toast.error(
          'Something happened. Please refresh the page and try again.'
        )}
    </Layout>
  );
};
