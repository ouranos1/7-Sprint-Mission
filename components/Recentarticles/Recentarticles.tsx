import style from "./Recentarticles.module.scss"
import favoriteIcon from "@/assets/images/logo/favoriteIcon.svg";
import BlackImg from "@/assets/images/home/blankimg.jpg";
import DateFomet from "@/utils/DateFormet";
import Image from "next/image";
import MaskIcon from "@/assets/images/home/maskicon.png"

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

function Article({ item }: {item : ArticlesProps }) {
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
          <Image className={style.userIcon} src={MaskIcon} alt="유저아이콘" width={24} height={24}/>
          <p>{item.writer.nickname}</p>
          <p>{DateFomet(item.updatedAt)}</p>
        </div>
        <div>
          <Image src={favoriteIcon} alt="하트아이콘" width={16} height={16} />
          <p>{item.likeCount}</p>
        </div>
      </div>
    </div>
  );
}

function Recentarticles({ datalist } : {datalist: ArticlesProps[]}) {
    return (
      <div className={style.recentArticlesLayer}>
        {datalist.map((item) => (
          <div className={style.dataLayer}>
            <Article item={item} key={item.id} />
          </div>
        ))}
      </div>
    )
}

export default Recentarticles;