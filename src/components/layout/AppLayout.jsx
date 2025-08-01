// import { Drawer, Box, Skeleton } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { useErrors, useSocketEvents } from "../../hooks/hook.jsx";
// import { useMyChatsQuery } from "../../redux/api/api.js";
// import { setIsDeleteMenu, setIsMobile, setSelectedDeletedChat } from "../../redux/reducers/misc.js";
// import { getSocket } from "../../socket.jsx";
// import Title from "../shared/Title";
// import ChatList from "../specific/ChatList";
// import Profile from "../specific/Profile.jsx";
// import Header from "./Header";
// import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events.js'
// import { useCallback, useEffect, useRef, useState } from "react";
// import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat.js";
// import { getOrSaveFromStorage } from "../../lib/features.js";
// import DeleteChatMenu from "../../dialogs/DeleteChatMenu.jsx";


// const AppLayout = () => (WrapedComponent) => {
//   // eslint-disable-next-line react/display-name
//   return (props) => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const param = useParams();

//     const chatId = param.chatId;
//     const deleteMenuAnchor = useRef(null)

//     // +++++++ implement socket
//     const socket = getSocket()

//     const [onlineUsers, setOnlineUsers] = useState([])


//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const { isMobile } = useSelector((state) => state.misc)
//     const { user } = useSelector((state) => state.auth)
//     const { newMessagesAlert } = useSelector((state) => state.chat)
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const dispatch = useDispatch()
//     // eslint-disable-next-line no-unused-vars, react-hooks/rules-of-hooks
//     const { isLoading, data, isError, error, refetch } = useMyChatsQuery("")

//     const navigate = useNavigate()

//     console.log('data', data?.chats, chatId)

//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useErrors([{ isError, error }])



//     useEffect(() => {
//       getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
//     }, [newMessagesAlert])

//     const handleDeleteChat = (e, chatId, groupChat) => {
//       // e.preventDefault();
//       dispatch(setIsDeleteMenu(true))
//       dispatch(setSelectedDeletedChat({ chatId, groupChat }))
//       deleteMenuAnchor.current = e.currentTarget
//     };

//     const handleMobileClose = () => dispatch(setIsMobile(!isMobile))

//     const newMessageAlertListener = useCallback((data) => {
//       if (chatId === data.chatId) return
//       dispatch(setNewMessagesAlert(data))
//     }, [chatId])

//     const newRequestListener = useCallback(() => {
//       dispatch(incrementNotification())
//     }, [dispatch])


//     const onlineUsersListener = useCallback((data) => {
//       console.log(" online user data" ,data);
      
//       setOnlineUsers(data)
//     }, [])

//     const refetchListener = useCallback(() => {
//       refetch()
//       navigate("/")
//     }, [refetch, navigate])


//     const eventHandlers = {
//       [NEW_MESSAGE_ALERT]: newMessageAlertListener,
//       [NEW_REQUEST]: newRequestListener,
//       [REFETCH_CHATS]: refetchListener,
//       [ONLINE_USERS]: onlineUsersListener,
//     }

//     useSocketEvents(socket, eventHandlers)


//     return (
//       <>
//         <Title />
//         <Header />

//         <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />

//         {
//           isLoading ? <Skeleton /> : (
//             <Drawer open={isMobile} onClose={handleMobileClose}>
//               <ChatList
//                 w="40vw"
//                 chats={data?.chats}
//                 chatId={chatId}
//                 handleDeleteChat={handleDeleteChat}
//                 newMessagesAlert={newMessagesAlert}
//                 onlineUsers={onlineUsers}
//               />
//             </Drawer>
//           )
//         }



//         <Box
//           display="grid"
//           gridTemplateColumns={{
//             xs: "1fr",
//             sm: "4fr 8fr",
//             md: "3fr 6fr 0.5fr"
//           }}
//           height="calc(100vh - 3rem)"
//         >
//           {/* Sidebar */}
//           <Box
//             sx={{
//               display: { xs: "none", sm: "block" },
//               overflow: "auto",
//               height: "100%",
//             }}
//           >
//             {isLoading ? (
//               <Skeleton />
//             ) : (
//               <ChatList
//                 w="90vw"
//                 chats={data?.chats}
//                 chatId={chatId}
//                 handleDeleteChat={handleDeleteChat}
//                 newMessagesAlert={newMessagesAlert}
//                 onlineUsers={onlineUsers}
//               />
//             )}
//           </Box>

//           {/* Chat Window */}
//           <Box height="100%">
//             <WrapedComponent {...props} chatId={chatId} user={user} />
//           </Box>

//           {/* Profile */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "block" },
//               padding: "2rem",
//               bgcolor: "rgba(0,0,0,0.85)",
//               height: "100%",
//             }}
//           >
//             <Profile user={user} />
//           </Box>
//         </Box>

//         {/* <div>Footer</div> */}
//       </>
//     );
//   };
// };

// export default AppLayout;


import { Drawer, Box, Skeleton, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useErrors, useSocketEvents } from "../../hooks/hook.jsx";
import { useMyChatsQuery } from "../../redux/api/api.js";
import { setIsDeleteMenu, setIsMobile, setSelectedDeletedChat } from "../../redux/reducers/misc.js";
import { getSocket } from "../../socket.jsx";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile.jsx";
import Header from "./Header";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events.js'
import { useCallback, useEffect, useRef, useState } from "react";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat.js";
import { getOrSaveFromStorage } from "../../lib/features.js";
import DeleteChatMenu from "../../dialogs/DeleteChatMenu.jsx";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const param = useParams();
    const chatId = param.chatId;
    const deleteMenuAnchor = useRef(null);
    const socket = getSocket();
    const [onlineUsers, setOnlineUsers] = useState([]);

    // Responsive hooks
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:900px)');

    const { isMobile: isMobileRedux } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    const navigate = useNavigate();

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeletedChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback((data) => {
      if (chatId === data.chatId) return;
      dispatch(setNewMessagesAlert(data));
    }, [chatId]);

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />

        {/* Mobile Chat List Drawer */}
        {isMobile && (
          <Drawer
            open={isMobileRedux}
            onClose={handleMobileClose}
            sx={{
              '& .MuiDrawer-paper': {
                width: '85vw',
              },
            }}
          >
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : (
              <ChatList
                w="100%"
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Drawer>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'minmax(200px, 30%) 1fr',
              md: 'minmax(250px, 30%) 1fr minmax(250px, 20%)'
            },
            height: 'calc(100vh - 3rem)',
            overflow: 'hidden',
          }}
        >
          {/* Sidebar - Hidden on mobile when drawer is closed */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              overflow: 'auto',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : (
              <ChatList
                w="100%"
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Box>

          {/* Main Content */}
          <Box sx={{ overflow: 'auto' }}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Box>

          {/* Profile - Hidden on mobile and tablet */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              padding: '2rem',
              bgcolor: 'rgba(0,0,0,0.85)',
              overflow: 'auto',
              borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            <Profile user={user} />
          </Box>
        </Box>
      </>
    );
  };
};

export default AppLayout;