import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../../store/actions/actions';
import SliderItemComponent from '../../../HomePage/sliderSection/SliderItemComponent';
import { StyledGridContainer, StyledPaginationBox } from './stylesProductsList';

const ProductsListComponent = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const allSoes = useSelector((state) => state.products.products);

  const getAllSoes = useCallback(async () => {
    await dispatch(getAllProducts(page));
  }, []);

  const handleChangePage = async (event, value) => {
    setPage(value);
    await dispatch(getAllProducts(value));
  };

  useEffect(() => {
    getAllSoes();
  }, [getAllSoes]);

  return (
    <StyledGridContainer
      container
      direction='row'
      justifyContent='flex-start'
      wrap='wrap'
    >
      {allSoes.map(({ name, currentPrice, brand, imageUrls, idProduct }) => {
        return (
          <Grid xs={12} sm={12} md={4} item key={idProduct}>
            <SliderItemComponent
              idProduct={idProduct}
              img={imageUrls[0]}
              heading={name}
              linkText={brand}
              price={`$${currentPrice}`}
            />
          </Grid>
        );
      })}
      <StyledPaginationBox>
        <Pagination onChange={handleChangePage} count={2} />
      </StyledPaginationBox>
    </StyledGridContainer>
  );
};

export default ProductsListComponent;
