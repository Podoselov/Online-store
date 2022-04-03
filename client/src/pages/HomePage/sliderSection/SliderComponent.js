import React, { useCallback, useEffect } from 'react';
import {
  StyledBoxContainer,
  StyledTypography,
  StyledItemBox,
} from './stylesSliderComponent';
import SliderItemComponent from './SliderItemComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../store/actions/actions';
import Carousel from 'react-elastic-carousel';

const SliderComponent = () => {
  const dispatch = useDispatch();
  const popularSoes = useSelector((state) => state.products.products);

  const filterPopularShoe = popularSoes.filter((element) => element.urlImg);

  const getPopularSoes = useCallback(async () => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    getPopularSoes();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 850, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3, itemsToScroll: 1 },
  ];
  return (
    <StyledBoxContainer>
      <StyledItemBox>
        <StyledTypography variant='h4'>Popular Right Now</StyledTypography>
        <Carousel breakPoints={breakPoints}>
          {filterPopularShoe.map(
            ({ name, currentPrice, brand, urlImg, idProduct }) => {
              return (
                <SliderItemComponent
                  idProduct={idProduct}
                  key={idProduct}
                  img={urlImg}
                  heading={name}
                  linkText={brand}
                  price={`$${currentPrice}`}
                />
              );
            }
          )}
        </Carousel>
      </StyledItemBox>
    </StyledBoxContainer>
  );
};

export default SliderComponent;
