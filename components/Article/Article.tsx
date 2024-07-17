import style from "./Article.module.scss";
import favoriteIcon from "@/assets/images/logo/favoriteIcon.svg";
import BlackImg from "@/assets/images/home/blankimg.jpg";
import DateFomet from "@/utils/DateFormet";
import Image from "next/image";

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

function Article({ item }: { item: ArticlesProps }) {
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

export default Article;
