import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents.js";
import { server } from "../../constants/config";
import {
  useErrors,
  useFetchData
} from '../../hooks/hook.jsx';

const Dashboard = () => {


const { loading, data, error, refetch } = useFetchData(
  `${server}/api/v1/admin/stats`,
  "dashboard",
  {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include credentials (cookies) in the request
  }
);
 


  const {stats} = data || {}

  useErrors([{
    isError: error,
    error: error
  }])


  const Appbar = ( 
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />

        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />

        <Typography display={{ xs: "none", lg: "block" }}>
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>

        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = <Stack direction={{ xs: "colo", sm: "row" }}  justifyContent={"space-between"} alignItems={"center"} margin={"2rem 0"}>
    <Widget title={"Users"} value={stats?.usersCount}  icon={<PersonIcon />}/>
    <Widget title={"Chats"} value={stats?.totalChatsCount} icon={<GroupIcon />} />
    <Widget title={"Messages"} value={stats?.messagesCount} icon={<MessageIcon />} />
  </Stack>;

  return (
    <AdminLayout>
   {
    loading ? <Skeleton /> :
        <Container component={"main"}>
        {Appbar}

        <Stack direction={{
          xs: "column",
          lg:"row"
        }} sx={{gap:"2rem"}} flexWrap={"wrap"} justifyContent={"center"} alignItems={{xs: "center", lg:"stretch"}}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
             
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
           <LineChart value={stats?.messagesChart || []} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart value={[(stats?.totalChatsCount - stats?.groupsCount) || 0 , stats?.groupsCount]} labels={["Single Chats", "Group Chats"]}/>

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
          Char area
        </Stack>
        {Widgets}
      </Container>
   }
    </AdminLayout>
  );
};



  const Widget = ({title, value, icon}) => <Paper sx={{
    padding:"2rem",
    margin:"2rem 0",
    borderRadius:"1rem",
    widows:"20rem"
  }}>
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography sx={{
        color:"rgba(0,0,0,0.7)",
        borderRadius:"50%",
        border:"5px solid rgba(0,0,0,0.7)",
        width:"5rem",
        height:"5rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>

export default Dashboard;
