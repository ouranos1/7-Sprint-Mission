import { useEffect, useState } from "react";
import favicon from "@/assets/images/logo/favoriteIcon.svg";
import { CallItemSearch } from "@/pages/api/CallAPI";
import style from "@/styles/BestItemsSection.module.css";
import Link from "next/link";
import Image from "next/image";

function getWidth() {
  if (typeof window !== "undefined") {
    let width = window.innerWidth;
    let count = 0;
    if (width < 768) {
      count = 1;
    } else if (width < 1280) {
      count = 2;
    } else {
      count = 4;
    }
    return count;
  }
  return 4;
}

interface BestItemProps {
  images: string[];
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
}

interface BestItemsResponse {
  list: BestItemProps[];
}

function BestItem({ item }: { item: BestItemProps }) {
  return (
    <div className={style.BestItem}>
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

function BestItemsSection() {
  const [BestItemsList, setBestItemsList] = useState<BestItemProps[]>([]);
  const [ItemCount, setItemCount] = useState<number>(getWidth());

  const BestItemsLoad = async (ItemCount: number) => {
    const response: BestItemsResponse = await CallItemSearch(1, ItemCount);
    setBestItemsList(response.list);
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

  useEffect(() => {
    BestItemsLoad(ItemCount);
  }, [ItemCount]);

  return (
    <div className={style.BestItemLayer}>
      <h1>베스트 상품</h1>
      <div className={style.ItemList}>
        {BestItemsList.map((item) => (
          <BestItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default BestItemsSection;
