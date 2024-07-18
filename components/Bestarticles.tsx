import style from "@/styles/BestArticles.module.scss";
import Image from "next/image";
import BestImage from "@/assets/images/logo/img_badge.svg";
import BlackImg from "@/assets/images/home/blankimg.jpg";
import favoriteIcon from "@/assets/images/logo/favoriteIcon.svg";
import DateFomet from "@/utils/DateFormet";

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

function Article({ item }: {item : ArticlesProps} ) {
  return (
    <div className={style.articleData}>
      <div className={style.articleDescription}>
        <p className={style.articleTitle}>{item.title}</p>
        {item.image ? (
          <div className={style.articleImg}>
            <Image src={item.image} alt="게시글 사진" fill />
          </div>
        ) : (
          <div>
            <Image
              src={BlackImg}
              alt="빈 이미지"
              className={style.blankImage}
            />
          </div>
        )}
      </div>
      <div className={style.articleInfo}>
        <div>
          <p>{item.writer.nickname}</p>
          <Image src={favoriteIcon} alt="하트아이콘" width={16} height={16} />
          <p>{item.likeCount}</p>
        </div>
        <p>{DateFomet(item.updatedAt)}</p>
      </div>
    </div>
  );
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
