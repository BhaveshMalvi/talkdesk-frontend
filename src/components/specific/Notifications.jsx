/* eslint-disable react/display-name */
import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { setIsNotification } from '../../redux/reducers/misc'

const Notifications = () => {

  const { isNotification } = useSelector((state) => state.misc)
  console.log('isNotification', isNotification)
  const dispatch = useDispatch()
  const { isLoading, data, error, isError } = useGetNotificationsQuery()

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation)

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false))

    await acceptRequest("Accepting...", {requestId: _id, accept})

 
  }

  useErrors([{ error, isError }])

  console.log(data);

  const closeHandler = () => dispatch(setIsNotification(false))


  return (
    <Dialog open={isNotification} onClick={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading ? (<Skeleton />)
            :
            <>
              {
                data?.allRequest?.length > 0 ? (
                  data?.allRequest?.map(({ sender, _id }) => <NotificationItem sender={sender}
                    _id={_id} handler={friendRequestHandler} key={_id} />)
                ) : <Typography textAlign={"center"}> 0 Notifications</Typography>
              }
            </>
        }

      </Stack>
    </Dialog>
  )
}


const NotificationItem = memo(({ sender, _id, handler }) => {

  const { name } = sender

  return (
    <ListItem >
      <Stack k direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar
        // src={avatar}
        />

        <Typography variant='body1' sx={{
          flexGrow: 1,
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%"

        }}>{name}</Typography>

        <Stack direction={{
          xs: "column",
          sm: "row"
        }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>
        </Stack>

      </Stack>
    </ListItem>
  )
})

export default Notifications