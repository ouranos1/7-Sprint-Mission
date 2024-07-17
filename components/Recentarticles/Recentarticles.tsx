import style from "./Recentarticles.module.scss"
import Image from "next/image";
import Article from "../Article/Article";
import DropDownSort from "../DropDownSort";

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

function Recentarticles({ datalist } : {datalist: ArticlesProps[]}) {
    return (
        <div className={style.recentArticlesLayer}>
          <div className={style.dataLayer}>
            {datalist.map((item) => (
              <Article item={item} key={item.id} />
            ))}
          </div>
        </div>
    )
}

export default Recentarticles;