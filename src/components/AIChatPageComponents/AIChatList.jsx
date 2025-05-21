import React, { useState, useContext, useEffect } from "react";
import classes from "./AIChatList.module.css";
import { getAllChatSectionsService, createChatSectionService, deleteChatSectionService,
    editChatSectionService
 } from "../../api/AIChatSectionService";
import loginContext from "../../store/login-context";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import AIChat from "./AIChat";
import AIChatSection from "./AIChatSection";
import Loading from "../LayoutComponents/Loading";

const AIChatList = () => {

    const [chatSections, setChatSections] = useState([]);
    const [currentSection, setCurrentSection] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [title,setTitle] = useState('');
    const loginCtx = useContext(loginContext);
    const memberId = loginCtx.memberId;
    const name = loginCtx.name;

    const titleChangeHandler = (event) => setTitle(event.target.value);

    const createChatSectionHandler = async () => {
        if (title.trim().length === 0) {
            toast.warning("채팅방 제목 설정은 필수입니다.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if (title.trim().length > 200) {
            toast.warning("채팅방 제목은 200자 이내로 작성해주세요.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        const createSectionsResponse = await createChatSectionService(memberId,title);
        if (createSectionsResponse.success) {
            setCurrentSection(createSectionsResponse.data);
            setChatSections((prevSections) => [createSectionsResponse.data,...prevSections, ]);
            setTitle('');
        } else {
            console.error("Failed to fetch chat sections:", createSectionsResponse.message);
        }
    };  
   
    const fetchChatSections = async () => {
        setIsLoading(true);
        const chatSectionsResponse = await getAllChatSectionsService(memberId);
        if (chatSectionsResponse.success) {
            const reversedSections = [...chatSectionsResponse.data].reverse();
            setChatSections(reversedSections);
            if (reversedSections.length > 0) {
                setCurrentSection(reversedSections[0]);
            }
        } else {
            console.error("Failed to fetch chat sections:", chatSectionsResponse.message);
        }
        setTimeout(() => {
            setIsLoading(false);
        },1500)
    };

    useEffect(() => {
        fetchChatSections();
    },[])

    const setCurrentSectionHandler = (section) => {
        setCurrentSection(section);
    }

    const deleteSectionHandler = async (sectionId) => {
        if (currentSection && sectionId === currentSection.id) {
            setCurrentSection(null);
        }
        const deleteSectionResponse = await deleteChatSectionService(sectionId);
        if (deleteSectionResponse.success && deleteSectionResponse.data){
            setChatSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
        }
        fetchChatSections();
    };

    const saveEditedTitle = async (sectionId, editTitle) => {
        if (editTitle.trim().length === 0) {
            toast.warning("채팅방 제목 설정은 필수입니다.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if (editTitle.trim().length > 200) {
            toast.warning("채팅방 제목은 200자 이내로 작성해주세요.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        setChatSections(prev =>
            prev.map(sec => sec.id === sectionId ? { ...sec, title: editTitle } : sec)
        );
        if (currentSection && currentSection.id === sectionId) {
            setCurrentSection(prev => prev.id === sectionId ? { ...prev, title: editTitle } : prev);
        }
        const editSectionResponse = await editChatSectionService(sectionId, editTitle);
        if (!editSectionResponse.success || !editSectionResponse.data) {  
            console.error("Failed to edit section title:", editSectionResponse.message);
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className={classes.chat_wrapper}>
                <motion.div
                    className={classes.chat_section_wrapper}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={classes.chat_section_list}>
                    <motion.input
                        type="text"
                        value={title}
                        placeholder="제목을 입력해주세요."
                        onChange={titleChangeHandler}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={createChatSectionHandler}
                    >
                        + 새로운 AI 채팅
                    </motion.button>
                    <h1 className={classes.chat_list_header}></h1>
                    <AnimatePresence>
                        {chatSections.length !== 0 ? (
                            chatSections.map((section) => (
                                <motion.div
                                    key={section.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                <AIChatSection
                                    onSetCurrent={setCurrentSectionHandler}
                                    onEdit={saveEditedTitle}
                                    onDelete={deleteSectionHandler}
                                    section={section}
                                />
                                </motion.div>
                            ))
                        ) : (
                        <motion.p
                            className={classes.no_chat_room_message}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            아직 등록된 채팅이 존재하지 않습니다. <br/>
                            새로운 채팅을 생성해보세요!
                        </motion.p>
                        )}
                    </AnimatePresence>
                    </div>
                </motion.div>
                <AnimatePresence>
                    {currentSection && (
                        <motion.div
                            className={classes.chat_content}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <AIChat section={currentSection} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {chatSections.length === 0 && (
                        <motion.div
                            className={classes.new_chat_description}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}>
                                새로운 채팅방을 생성하여 궁금한 점을 물어보세요! <br/>
                                반려동물 건강 정보 및 케어에 대한 다양한 정보를 얻을 수 있어요. <br/>
                                <span style={{ color: 'rgb(56, 43, 160)', fontWeight: 'bold' }}>
                                    본 답변은 반려동물 건강 정책 자료를 기반으로 생성됩니다.
                                </span>
                        </motion.div>
                    
                    )}

                </AnimatePresence>
            </div>
        </>
    );
};

export default AIChatList;