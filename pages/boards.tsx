import { CallArticles } from "./api/CallAPI";
import { ChangeEvent, useMemo } from "react";
import style from "@/styles/Boards.module.scss";
import BestArticles from "@/components/BestArticles";
import Recentarticles from "@/components/Recentarticles/Recentarticles";
import DropDownSort from "@/components/DropDownSort";
import { useEffect, useState } from "react";
import Image from "next/image";
import seachIcon from "@/assets/images/home/ic_search.svg";
import useDevice from "@/hook/useDevice";

interface ArticlesProps {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

interface ArticlesResopnse {
  list: ArticlesProps[];
  totalCount: number;
}

const option = { "recent" : "최신순", "like" : "좋아요순"};

function boards() {
  const [keyWord, setKeyWord] = useState<string>();
  const [order, setOrder] = useState<string>("recent");
  const [articlesList, setArticlesList] = useState<ArticlesProps[]>([]);
  const [bestArticlesList, setBestArticlesList] = useState<ArticlesProps[]>([]);
  const ArticlesLoad = async (keyWord: string | undefined, order: string) => {
    const response: ArticlesResopnse = await CallArticles(keyWord, order, 20);
    setArticlesList(response.list);
  };

  const KeyWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  }

  const BestArticlesLoad = async () => {
    const response: ArticlesResopnse = await CallArticles(undefined, "like", bestCount);
    setBestArticlesList(response.list);
  };
  const { mode } = useDevice();
  const bestCount = useMemo<number>(() => {

    console.log(mode);

    switch (mode) {
      case "desktop":
        return 3
      case "tablet":
        return 2
      case "mobile":
        return 1
    }
  }, [mode])

  useEffect(() => {
    ArticlesLoad(keyWord, order);
  }, [keyWord, order]);

  useEffect(() => {
    BestArticlesLoad();
  }, [bestCount]);

  return (
    <div className={style.container}>
      <div className={style.articleLayer}>
        <BestArticles datalist={bestArticlesList} />
        <div className={style.menuLayer}>
          <p className={style.articleTitle}>게시글</p>
          <button>글쓰기</button>
        </div>
        <div className={style.menuLayer}>
          <Image src={seachIcon} alt="검색 아이콘" className={style.seachIcon}/>
          <input placeholder="검색할 상품을 입력해주세요" onChange={KeyWordInput}/>
          <DropDownSort option={option} setOrder={setOrder} />
        </div>
        <Recentarticles datalist={articlesList} />
      </div>
    </div>
  );
}

export default boards;
