import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import favicon from "../../src/images/logo/favoriteIcon.svg";
import { CallItemSearch } from "../api/CallAPI";
import "../style/AllItemsSection.css";
import SeachInput from "./SeachInput";
import DropDownSort from "./DropDownSort";
import Pageination from "./Pageination";

function getWidth() {
  let width = window.innerWidth;
  let count = 0;
  if (width < 768) {
    count = 4;
  } else if (width < 1280) {
    count = 6;
  } else {
    count = 10;
  }

  return count;
}

interface AllItemProps {
  images: string;
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
}

interface AllItemsResponse {
  list: AllItemProps[];
  totalCount: number;
}

function AllItem({ item }: { item: AllItemProps }) {
  return (
    <div className="BestItem">
      <NavLink to={`/items/${item.id}`}>
        <img src={item.images} alt={item.name} />
      </NavLink>
      <div className="ItemHistory">
        <p>{item.name}</p>
        <h1>{item.price.toLocaleString()}원</h1>
        <div className="Itemfav">
          <img src={favicon} alt="하트" />
          <p>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

function AllItemsSection() {
  const [AlltItemsList, setAllItemsList] = useState<AllItemProps[]>([]);
  const [ItemCount, setItemCount] = useState<number>(getWidth());
  const [Order, setOrder] = useState<string>("recent");
  const [Poninter, setPoninter] = useState<number>(1);
  const [Title, setTitle] = useState<string>("전체 상품");
  const [pageSize, setPageSize] = useState<number>(0);

  const AllItemsLoad = async (ItemCount: number, Order: string) => {
    const response: AllItemsResponse = await CallItemSearch(Poninter, ItemCount, Order);
    setAllItemsList(response.list);
    setPageSize(Math.ceil(response.totalCount / ItemCount));
  };
  useEffect(() => {
    const ReCount = () => {
      const newWidth = getWidth();
      setItemCount(newWidth);
    };

    window.addEventListener("resize", ReCount);

    return () => {
      window.removeEventListener("resize", ReCount);
    };
  }, []);

  const onPageChange = (pageNumber: number) => {
    setPoninter(pageNumber);
  };

  useEffect(() => {
    AllItemsLoad(ItemCount, Order);
    if (ItemCount < 10) {
      setTitle("판매 중인 상품");
    } else {
      setTitle("전체 상품");
    }
  }, [ItemCount, Order, Poninter]);

  return (
    <div className="AllItemLayer">
      <div className="AllItemMenu">
        <div className="AllItemTitle">
          <h1>{Title}</h1>
          <Link to="/additem">
            <button className="AddItemButton">상품 등록하기</button>
          </Link>
        </div>
        <div className="ItemCustom">
          <SeachInput></SeachInput>
          <Link to="/additem">
            <button className="AddItemButton">상품 등록하기</button>
          </Link>
          <DropDownSort setOrder={setOrder}></DropDownSort>
        </div>
      </div>
      <div className="ItemList">
        {AlltItemsList.map((item) => (
          <AllItem item={item} />
        ))}
      </div>
      <div className="Pagination">
        <Pageination
          pageSize={pageSize}
          activePage={Poninter}
          onPageChange={onPageChange}
        ></Pageination>
      </div>
    </div>
  );
}

export default AllItemsSection;
