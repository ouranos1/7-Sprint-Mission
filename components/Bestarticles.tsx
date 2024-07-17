import style from "@/styles/BestArticles.module.scss";
import Image from "next/image";
import BestImage from "@/assets/images/logo/img_badge.svg";
import Article from "./Article/Article";

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

function BestArticles({ datalist }: { datalist: ArticlesProps[] }) {
  return (
    <div className={style.bestArticleLayer}>
      <p className={style.bestArtitlceTitle}>베스트 게시글</p>
      <div className={style.bestArticleList}>
        {datalist.map((item) => (
          <div className={style.bestArticle}>
            <Image className={style.bestIcon} src={BestImage} alt="베스트 아이콘" width={102} height={30} />
            <Article item={item} key={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestArticles;
