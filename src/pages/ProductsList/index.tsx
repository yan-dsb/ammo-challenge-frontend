import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { api } from '../../services/api';
import {
  Container,
  Header,
  ProductsListContainer,
  QueryContainer,
  ProductsFound,
  Products,
  ProductItem,
  ProductImages,
  ProductDetails,
  ProductName,
  ProductDescription,
  ProductDiscount,
  Divider,
  PaginationContainer,
  Pagination,
  PaginationNumber
} from './styles';
import logoImg from '../../assets/logo_martan.png';
import Input from '../../components/Input';
import { API_URL } from '../../utils/apiURL';

const LIMIT_OPTIONS = [10, 20, 50];

type ImageItem = {
  image_name: string;
};

type ProductItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  discount_percentage: number;
  discountPriceFormatted: string;
  images: ImageItem[];
};

type ResponseData = {
  data: ProductItem[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
};

const ProductsList: React.FC = function ProductsList() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pagesLength, setPagesLength] = useState<[number]>([0]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    api
      .get<ResponseData>('/products', {
        params: { page, take: limit, keyword: query }
      })
      .then(response => {
        const { data, total, lastPage } = response.data;

        const producsFormatted = data.map(product => {
          const discountPrice = product.price * product.discount_percentage;

          const priceDiscounted = product.price - discountPrice;

          return {
            ...product,
            priceFormatted: new Intl.NumberFormat('PT-br', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.price),
            discountPriceFormatted: new Intl.NumberFormat('PT-br', {
              style: 'currency',
              currency: 'BRL'
            }).format(priceDiscounted)
          };
        });

        setProducts(producsFormatted);
        setTotalProducts(total);
        const paginationLength = Array.from(
          { length: lastPage },
          (v, i) => i
        ) as [number];
        setPagesLength(paginationLength);
      });
  }, [page, limit, query]);

  const handleLimitChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLimit = event.target.value;
      setPage(1);
      setLimit(Number(newLimit));
    },
    []
  );

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setQuery(event.target.value);
    },
    []
  );

  const totalRecords = useMemo(() => {
    return products.length;
  }, [products]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  return (
    <Container>
      <Header>
        <img src={logoImg} alt="Logo martan" />
        <div>
          <Input icon={FiSearch} value={query} onChange={handleQueryChange} />
        </div>
      </Header>
      <QueryContainer>
        <p>{query || 'Lista de Produtos'}</p>
      </QueryContainer>
      <ProductsListContainer>
        <ProductsFound>
          <p>{totalProducts} PRODUTOS ENCONTRADOS</p>
        </ProductsFound>
        <Products>
          {products.map(product => (
            <ProductItem key={product.id}>
              <ProductImages>
                {product.images.map(image => (
                  <img
                    key={image.image_name}
                    src={`${API_URL}/product/${image.image_name}`}
                    alt={product.name}
                  />
                ))}
              </ProductImages>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
              </ProductDetails>
              <ProductDiscount>
                <p>
                  <span>
                    <s>{product.priceFormatted}</s> por
                  </span>{' '}
                  {product.discountPriceFormatted}
                </p>
              </ProductDiscount>
            </ProductItem>
          ))}
        </Products>
        <Divider />
        <PaginationContainer>
          <p>
            Listando {totalRecords} de {totalProducts} de registros
          </p>
          <Pagination>
            <select onChange={handleLimitChange} value={limit}>
              {LIMIT_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option} produtos por página
                </option>
              ))}
            </select>
            <PaginationNumber>
              {pagesLength.map(number => {
                const pageNumber = number + 1;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => handlePageChange(pageNumber)}
                    disabled={pageNumber === page}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </PaginationNumber>
          </Pagination>
        </PaginationContainer>
      </ProductsListContainer>
    </Container>
  );
};

export { ProductsList };
