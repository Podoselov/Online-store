import axios from 'axios';

const getSearchProducts = async (search, genderCategory = [], page = 1) => {
  if (search) {
    if (genderCategory.length > 0) {
      console.log(genderCategory.join());
      try {
        const response = await axios.get(
          `http://localhost:5000/products?q=${search}${genderCategory.join(
            ''
          )}&_page=${page}&_limit=9`
        );
        return {
          data: response.data,
          totalCount: response.headers['x-total-count'],
        };
      } catch (error) {
        return console.log(error);
      }
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/products?_page=${page}&_limit=9&q=${search}`
      );
      return {
        data: response.data,
        totalCount: response.headers['x-total-count'],
      };
    } catch (error) {
      return console.log(error);
    }
  }
  if (genderCategory.length > 0) {
    try {
      const response = await axios.get(
        `http://localhost:5000/products?${genderCategory.join(
          ''
        )}&_page=${page}&_limit=9`
      );
      return {
        data: response.data,
        totalCount: response.headers['x-total-count'],
      };
    } catch (error) {
      return console.log(error);
    }
  }
  try {
    const response = await axios.get(
      `http://localhost:5000/products?_page=${page}&_limit=9`
    );
    return {
      data: response.data,
      totalCount: response.headers['x-total-count'],
    };
  } catch (error) {
    return console.log(error);
  }
};

export default getSearchProducts;