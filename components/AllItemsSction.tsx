import { useState, useEffect } from "react";
import Link from "next/link";
import favicon from "@/assets/images/logo/favoriteIcon.svg";
import { CallItemSearch } from "@/pages/api/CallAPI";
import style from "@/styles/AllItemsSection.module.css";
import SeachInput from "./SeachInput";
import DropDownSort from "./DropDownSort";
import Pageination from "./Pageination";
import Image from "next/image";

function getWidth() {
  if (typeof window !== "undefined") {
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
  return 10;
}

interface AllItemProps {
  images: string[];
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
    <div className={style.AllItem}>
      <Link href={`/items/${item.id}`}>
        <Image src={item.images[0]} alt={item.name} className={style.img} width={221} height={221} />
      </Link>
      <div className={style.ItemHistory}>
        <p>{item.name}</p>
        <h1>{item.price.toLocaleString()}원</h1>
        <div className={style.Itemfav}>
          <Image src={favicon} alt="하트" className={style.img} />
          <p>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

const option = {"recent" : "최신순", "favorite" : "좋아요순"};

function AllItemsSection() {
  const [alltItemsList, setAllItemsList] = useState<AllItemProps[]>([]);
  const [itemCount, setItemCount] = useState<number>(getWidth());
  const [order, setOrder] = useState<string>("recent");
  const [poninter, setPoninter] = useState<number>(1);
  const [title, setTitle] = useState<string>("전체 상품");
  const [pageSize, setPageSize] = useState<number>(0);
  const AllItemsLoad = async (ItemCount: number, Order: string) => {
    const response: AllItemsResponse = await CallItemSearch(poninter, ItemCount, Order);
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
    AllItemsLoad(itemCount, order);
    if (itemCount < 10) {
      setTitle("판매 중인 상품");
    } else {
      setTitle("전체 상품");
    }
  }, [itemCount, order, poninter]);

  return (
    <div className={style.AllItemLayer}>
      <div className={style.AllItemMenu}>
        <div className={style.AllItemTitle}>
          <h1>{title}</h1>
          <Link href="/additem">
            <button className={style.AddItemButton}>상품 등록하기</button>
          </Link>
        </div>
        <div className={style.ItemCustom}>
          <SeachInput />
          <Link href="/additem">
            <button className={style.AddItemButton}>상품 등록하기</button>
          </Link>
          <DropDownSort option={option} setOrder={setOrder}></DropDownSort>
        </div>
      </div>
      <div className={style.ItemList}>
        {alltItemsList.map((item, index) => (
          <AllItem item={item} key={index} />
        ))}
      </div>
      <div className={style.Pagination}>
        <Pageination
          pageSize={pageSize}
          activePage={poninter}
          onPageChange={onPageChange}
        ></Pageination>
      </div>
    </div>
  );
}

export default AllItemsSection;
