import React from "react";
import Header from "../components/LayoutComponents/Header";
import Footer from "../components/LayoutComponents/Footer";
import FeatureSection from "../components/MainPageComponents/FeatureSection";
import design from "./MainPage.module.css"
import mapimg from "../assets/mapimg.png"
import AIchat from "../assets/AIchat.png"
import peopleimg from "../assets/peoplechat.png"


const MainPage = () => {
    const linkRoute = {
        place: '/place',
        chat: 'chat',
        emergency: '/place?category=동물병원',
        aiChat: '/ai/chat'
    };
     return (
    <>
      <Header />
            <div className={design.main_body}> 

            <h1 className={design.main_word}>VETT를 통해</h1>
            <h2>반려동물을 위한 여러 기능을 사용해보세요</h2>
            
            <FeatureSection
                image={mapimg}
                title="01. 상황별 동물병원 찾기"
                description="현재 위치에서 가장 가까운 동물병원을 빠르게 안내하고, 응급상황 시 신속하게 동물병원을 찾아드려요! "
                buttonLabel="병원 찾기"
                buttonLink= {linkRoute.emergency}
            />
            <FeatureSection
                image={AIchat}
                title="02. 반려동물 AI 챗봇 상담"
                description="소중한 반려동물에 대한 궁금한 점을 AI 챗봇에게 물어보세요."
                buttonLabel="챗봇 열기"
                buttonLink={linkRoute.aiChat}
            />
            <FeatureSection
                image={peopleimg}
                title="03. 반려동물 보호자 대화 "
                description="다른 보호자들과 고민을 나누고 해결하세요!"
                buttonLabel="채팅방 가기"
                buttonLink={linkRoute.chat}
            />
          </div>
      <Footer />
    </>
  );
};

export default MainPage;