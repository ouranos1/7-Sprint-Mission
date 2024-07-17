import { useEffect, useState } from "react";
import heartIcon from "@/assets/images/logo/favoriteIcon.svg";
import { CallItemDetail } from "@/pages/api/CallAPI";
import { CallItemComment } from "@/pages/api/CallAPI";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import BackIcon from "@/assets/images/home/ic_back.svg";
import More from "/assets/images/home/ic_kebab.svg";
import UserIcon from "@/assets/images/home/maskicon.png"
import NotComment from "/assets/images/home/not_comment.svg";
import Image from "next/image";

const ItemDetailLayer = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    padding-bottom: 32px;
    border-bottom: solid 1px #E5E7EB;
    margin-bottom: 24px;
    gap: 24px;

    /* 테블릿버전 */
    @media (768px < width < 1280px) {
        gap: 16px;
    }

    /* 모바일버전 */
    @media (400px < width < 768px) {
        flex-direction: column;
        gap: 16px;
    }

`;

const ItemImg = styled.img`
    width: 486px;
    height: 486px;
    border-radius: 16px;

        /* 테블릿버전 */
    @media (768px < width < 1280px) {
        width: 340px;
        height: 340px;
    }

    /* 모바일버전 */
    @media (400px < width < 768px) {
        width: 343px;
        height: 343px;
    }
`;

const ItemNamePrice = styled.div `
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;
    border-bottom: solid 1px #DFDFDF;
    position: relative;
    img {
        position: absolute;
        width: 24px;
        height: 24px;
        right: 0;
    }
    /* 테블릿버전 */
    @media (768px < width < 1280px) {

    .addItemLayer {
        max-width: 696px;
    }

    .itemSubmitButton {
        max-width: 696px;
    }
    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const ItemName = styled.p `
    font-size: 24px;
    line-height: 28.64px;
    font-weight: 600;
    color: #1f2937; 
    /* 테블릿버전 */
    @media (768px < width < 1280px) {
        font-size: 20px;
        line-height: 23.87px;
    }

    /* 모바일버전 */
    @media (400px < width < 768px) {
        font-size: 16px;
        line-height: 19.09px;
    }
`;

const ItemPrice = styled.p `
    font-size: 40px;
    line-height: 47.73px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #1f2937;
        /* 테블릿버전 */
    @media (768px < width < 1280px) {
        font-size: 32px;
        line-height: 38.19px;
    }

    /* 모바일버전 */
    @media (400px < width < 768px) {
        font-size: 24px;
        line-height: 28.64px;
    }
`;

const DescriptionLayer = styled.div `

    display: flex;
    flex-direction: column;
    gap: 8px;

    h1 {
        color: #4b5563;
        font-size: 14px;
        font-weight: 500;
        line-height: 16.71px;
    }

    p {
        font-weight: 400;
        font-size: 16px;
        line-height: 22.4px;
        color: #1f2937;
        margin-bottom: 23px;
    }
            /* 테블릿버전 */
    @media (768px < width < 1280px) {
        h1 {
            line-height: 19.6px;
        }
    }

    /* 모바일버전 */
    @media (400px < width < 768px) {
        
    }
`;

const ItemTags = styled.p `
    color: #4b5563;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
    margin-top: 24px;
    margin-bottom: 8px;
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const TageList = styled.div `
    display: flex;
    gap: 8px;
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const Tag = styled.button `
    border-radius: 26px;
    padding: 6px 16px;
    background-color: #f3f4f6;
    color: #1f2937;
    height: 36px;
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const FavoriteCount = styled.div `
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: fit-content;
    border-radius: 35px;
    padding: 4px 12px;
    gap: 4px;
    border: solid 1px #E5E7EB;
            /* 테블릿버전 */
    @media (768px < width < 1280px) {
        margin-top: 25px;
    }

    /* 모바일버전 */
    @media (400px < width < 768px) {
        margin-top: 24px;
    }
`;

const Detail = styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const Question = styled.div `
    display: flex;
    width: 100%;
    max-width: 1200px;
    flex-direction: column;
    margin-bottom: 40px;
    gap: 16px;

    h1 {
        font-size: 16px;
        font-weight: 600;
        line-height: 19.09px;
        color: #111827;
    }

    input {
        max-width: 1200px;
        width: 100%;
        height: 104px;
        padding: 16px 24px;
        background-color:#F3F4F6;
        box-sizing: border-box;
    }
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const ButtonLayer = styled.div `
    display: flex;
    justify-content: flex-end;
    
    button {
        width: fit-content;
        border-radius: 8px;
        padding: 12px 23px;
        background-color: #9ca3af;
        color: #ffffff;
    }
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const UserQuestionList = styled.div `
    display: flex;
    flex-direction: column;
    gap: 24px;
    
    p {
        font-size: 16px;
        color: #1f2937;
        line-height: 22.4px;
        font-weight: 400;
    }
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const Comment = styled.div `
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-bottom: solid 1px #E5E7EB;
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const CommentDetail = styled.div `
    display: flex;
    flex-direction: column;
    gap: 4px;
    h1 {
        font-size: 14px;
        line-height: 16.71px;
        color: #4b5563;
        font-weight: 400;
    }
    h2 {
        font-size: 12px;
        line-height: 14.32px;
        font-weight: 400;
    }
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const CommentData = styled.div `
    display: flex;
    margin-bottom: 24px;
    gap: 8px;
    img {
        width: 40px;
        height: 40px;
    }
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }

`;

const BackListButton = styled.div `
    background-color: #3692FF;
    gap: 10px;
    display: flex;
    border-radius: 40px;
    padding: 12px 71px;
    color: #ffffff;
    justify-content: center;
    align-items: center;
            /* 테블릿버전 */
    @media (768px < width < 1280px) {

    }

    /* 모바일버전 */
    @media (400px < width < 768px) {

    }
`;

const Section = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 24px;

             /* 테블릿버전 */
    @media (768px < width < 1280px) {
        padding: 24px;
    }

    /* 모바일버전 */
    @media (400px < width < 768px) {
        padding: 16px;
    }

`;

const NotCommentImg = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 200px;
        height: 224px;
    }
`;

function DateFomet(strdate:string) {
    const date = new Date(strdate);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
}

interface ItemProps {
    images : string;
    name : string;
    price : number;
    description: string;
    tags: string[];
    favoriteCount: number;
}

interface CommentProps {
    content: string;
    writer: {nickname: string};
    updatedAt: string;
}

function ItemDetail() {
    const [item, setItem] = useState<ItemProps>();
    const [itemComments, setItemComments] = useState<CommentProps[]>([]);
    const router = useRouter();
    // const itemId: number = Number((router.pathname.split("/").pop()));
    const { productid } = router.query;
    const itemId: number = Number(productid);
    
    const ItemLoad = async () => {
        const response = await CallItemDetail(itemId);
        setItem(response);
    };

    const ItemComments = async () => {
        const resopnse = await CallItemComment(itemId);
        setItemComments(resopnse.list);
    }

    useEffect(() => {
        ItemLoad();
        ItemComments();
    }, [itemId]);

    if (!item) return <div>Loading...</div>;

    return(
        <Section>
            <ItemDetailLayer>
                <ItemImg src={item.images} alt="상품사진" />
                <Detail>
                    <div>
                        <ItemNamePrice>
                            <ItemName>{item.name}</ItemName>
                            <img src={More} alt="더보기버튼" />
                            <ItemPrice>{item.price ? item.price.toLocaleString() : ""}원</ItemPrice>
                        </ItemNamePrice>
                        <DescriptionLayer>
                            <h1>상품소개</h1>
                            <p>{item.description}</p>
                        </DescriptionLayer>
                        <ItemTags>상품태그</ItemTags>
                        <TageList>
                            {item.tags && item.tags.length > 0 ? (
                            item.tags.map((tag, index) => (
                            <Tag key={index}>#{tag}</Tag>
                            ))
                            ) : (
                            <p>태그없음</p>
                        )}
                        </TageList>
                    </div>
                    <FavoriteCount>
                        <img src={heartIcon} alt="하트"></img>
                        <p>{item.favoriteCount}</p>
                    </FavoriteCount>
                </Detail>
            </ItemDetailLayer>
            <Question>
                <h1>문의하기</h1>
                <input placeholder="개인정보를 공유 및 요청하거나, 명예 훼손,
                무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 
                이에 대한 민형사상 책임은 게시자에게 있습니다." />
                <ButtonLayer>
                    <button>등록</button>
                </ButtonLayer>
                <UserQuestionList>
                    {itemComments.length > 0 ? (
                        itemComments.map((comment, index) => (
                        <Comment key={index}>
                            <p>{comment.content}</p>
                            <CommentData>
                                <Image src={UserIcon} alt="유저아이콘" width={32} height={32}/>
                                <CommentDetail>
                                    <h1>{comment.writer.nickname}</h1>
                                    <h2>{DateFomet(comment.updatedAt)}</h2>
                                </CommentDetail>
                            </CommentData>
                        </Comment>
                    ))
                ) : (
                    <NotCommentImg>
                        <img src={NotComment} alt="문의없음" />
                    </NotCommentImg>
                )}
                </UserQuestionList>
            </Question>
            <Link href="/items">
                <BackListButton>
                    <p>목록으로 돌아가기</p>
                    <img src={BackIcon} alt="돌아가기 아이콘"></img>
                </BackListButton>
            </Link>
        </Section>
    );
}

export default ItemDetail;