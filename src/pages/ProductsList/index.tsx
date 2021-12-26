import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FiSearch,
  FiChevronRight,
  FiChevronLeft,
  FiChevronsRight,
  FiChevronsLeft
} from 'react-icons/fi';
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
  PaginationNumber,
  PaginationIcon
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
  const [pagesNumbers, setPagesNumbers] = useState<[number]>([0]);
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
        setPagesNumbers(paginationLength);
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

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  const goToNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const goToLastPage = useCallback(() => {
    setPage(pagesNumbers.length);
  }, [pagesNumbers]);

  return (
    <Container>
      <Header>
        <img src={logoImg} alt="Logo martan" />
        <div>
          <Input icon={FiSearch} value={query} onChange={handleQueryChange} />
        </div>
      </Header>
      <QueryContainer>
        <h1>{query || 'Lista de Produtos'}</h1>
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
                <ProductDescription>
                  {product.description.length > 30
                    ? `${product.description.substring(0, 30)}...`
                    : product.description}
                </ProductDescription>
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
              <PaginationIcon disabled={page === 1} onClick={goToFirstPage}>
                <FiChevronsLeft />
              </PaginationIcon>
              <PaginationIcon disabled={page === 1} onClick={goToPreviousPage}>
                <FiChevronLeft />
              </PaginationIcon>
              {pagesNumbers.map(number => {
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
              <PaginationIcon
                disabled={page === pagesNumbers.length}
                onClick={goToNextPage}
              >
                <FiChevronRight />
              </PaginationIcon>
              <PaginationIcon
                disabled={page === pagesNumbers.length}
                onClick={goToLastPage}
              >
                <FiChevronsRight />
              </PaginationIcon>
            </PaginationNumber>
          </Pagination>
        </PaginationContainer>
      </ProductsListContainer>
    </Container>
  );
};

export { ProductsList };
