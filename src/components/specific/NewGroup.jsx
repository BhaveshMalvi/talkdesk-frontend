import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'

import React, { useState } from 'react'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'
import { setIsNewGroup } from '../../redux/reducers/misc'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import toast from 'react-hot-toast'


const NewGroup = () => {


  const { isError, isLoading, error, data } = useAvailableFriendsQuery()

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const { isNewGroup } = useSelector((state) => state.misc)
  console.log('isNewGroup', isNewGroup)
  const [selectedMembers, setselectedMembers] = useState([])
  const dispatch = useDispatch()

  const errors = [{
    isError,
    error
  }]
  useErrors(errors)


  const SelectMemberHadler = (id) => {
    setselectedMembers((prev) => prev.includes(id) ? prev.filter(currentElm => currentElm !== id) : [...prev, id])
  }


  console.log('selectedMembers', selectedMembers)

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2) return toast.error("Please select Atlest 3 members");

    newGroup("Creating new Group...", { name: groupName.value, members: selectedMembers })

    closeHandler()


  }


  const closeHandler = () => {
    dispatch(setIsNewGroup(false))

  }







  const groupName = useInputValidation("")

  return (
    <Dialog onClose={closeHandler} open={isNewGroup} >
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"} sx={{
        width: {
          xs: "16rem",  // for extra small screens
          sm: "25rem",  // for small screens and up
        }
      }}>
<DialogTitle 
  textAlign="center" 
  variant="h4" 
  sx={{ 
    fontSize: "1rem",
    padding: 0,        // Removes all padding
    margin: 0,         // Optional: Removes margin if needed
    lineHeight: 1.5,   // Adjust line height for compactness
  }}
>
  New Group
</DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          variant="outlined"
          size="small" // Compact padding
          sx={{
            // Base styles (mobile-first)
            "& .MuiInputBase-input": {
              fontSize: "0.875rem", // Default: ~14px (Tailwind's `text-sm`)
              padding: "8px 12px",  // Tighter padding
            },
            // Larger screens
            "@media (min-width: 600px)": {
              "& .MuiInputBase-input": {
                fontSize: "1rem", // ~16px (Tailwind's `text-base`)
              },
            },
          }}
        />
        <Typography variant='body1' justifyContent={"space-between"}  >
          Members
        </Typography>

        <Stack>
          {
            isLoading ? <Skeleton /> :
              (data?.friends?.map((i) => (
                <UserItem user={i} key={i._id} handler={SelectMemberHadler} isAdded={selectedMembers.includes(i._id)} />
              )))
          }
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="outlined"
            color="error"
            onClick={closeHandler}
            sx={{
              fontSize: { xs: "0.6rem", sm: "1rem" }, // text-sm (mobile) → text-base (desktop)
              padding: { xs: "4px 8px", sm: "10px 22px" }, // Compact (mobile) → Standard (desktop)
              lineHeight: 1.2,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
            sx={{
              fontSize: { xs: "0.6rem", sm: "1rem" }, // text-sm (mobile) → text-base (desktop)
              padding: { xs: "4px 8px", sm: "10px 22px" }, // Compact (mobile) → Standard (desktop)
              lineHeight: 1.2,
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup