import { CallArticles } from "./api/CallAPI";
import { ChangeEvent } from "react";
import style from "@/styles/Boards.module.scss";
import BestArticles from "@/components/BestArticles";
import Recentarticles from "@/components/Recentarticles/Recentarticles";
import DropDownSort from "@/components/DropDownSort";
import { useEffect, useState } from "react";

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
  const ArticlesLoad = async (keyword: string | undefined, order: string) => {
    const response: ArticlesResopnse = await CallArticles(keyWord, order, 20);
    setArticlesList(response.list);
  };

  const KeyWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  }

  const BestArticlesLoad = async () => {
    const response: ArticlesResopnse = await CallArticles(undefined, "like", 3);
    setBestArticlesList(response.list);
  };

  useEffect(() => {
    ArticlesLoad(keyWord, order);
    BestArticlesLoad();
  }, [keyWord, order]);

  return (
    <div className={style.container}>
      <div className={style.articleLayer}>
        <BestArticles datalist={bestArticlesList} />
        <div className={style.menuLayer}>
          <p className={style.article}>게시글</p>
          <button>글쓰기</button>
        </div>
        <div className={style.menuLayer}>
          {/* <img src="../assets/images/home/ic_search.svg" alt="검색 아이콘"/> */}
          <input placeholder="검색할 상품을 입력해주세요" onChange={KeyWordInput}/>
          <DropDownSort option={option} setOrder={setOrder} />
        </div>
        <Recentarticles datalist={articlesList} />
      </div>
    </div>
  );
}

export default boards;
