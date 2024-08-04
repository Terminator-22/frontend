import React from 'react'
import { Box,Button, Typography } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MySelectField from './forms/MySelectField'
import MyMultilineField from './forms/MyMultilineField'
import MyDatepickerField from './forms/MyDatePickerField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs  from 'dayjs'
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const Create = () => {
  const navigate = useNavigate()
  const defaultValues = {

    name : '',
    comments : '',
    status : '',
  }

  const schema = yup
  .object({
    name: yup.string().required('Name is a required field '),
    status: yup.string().required('Status is a required field '),
    comments: yup.string(),
    start_date: yup.date().required('Start datee is a required field '),
    end_date: yup.date().required('End date is a required field ').min(yup.ref('start_date'),'The end date can not be before the start date'),
    
  })

  const {handleSubmit, control} = useForm({defaultValues:defaultValues, resolver: yupResolver(schema)})

  const submission = (data) => {

    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
    AxiosInstance.post(`Project/`,{
      name :data.name,
      comments:data.comments,
      status:data.status,
      start_date: StartDate,
      end_date: EndDate,
    }

    )
    .then((res) =>{
      navigate('/')
    })
  }
    

  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
      <Box sx={{display:"flex", width:"100%", backgroundColor:"#00003f", marginBottom:"10px" }}>
        <Typography sx={{marginLeft:'20px', color:'#fff'}}>

          Create Records
        </Typography>



      </Box>

      <Box sx={{display:"flex", width:"100%", boxShadow:3 , padding:4, flexDirection:'column' }}>


          <Box sx={{display:"flex", justifyContent:"space-around", marginBottom:"40px" }}>
            <MyTextField

              label="Name"
              name="name"
              control={control}
              placeholder="Provide a project name"
              width = {"30%"}
            />

            <MyDatepickerField
             label="Start date"
             name="start_date"
             control={control}
             width = {"30%"}

            />

            <MyDatepickerField
             label="End date"
             name="end_date"
             control={control}
             width = {"30%"}

            />


            
          </Box>

          <Box sx={{display:"flex", justifyContent:"space-around" }}>
            <MyMultilineField

              label="comments"
              name="comments"
              control={control}
              placeholder="Provide project comments"
              width = {"30%"}
            />

            <MySelectField
             label="Status"
             name="status"
             control={control}
             width = {"50"}

            />

            <Box sx={{width:"40%"}}>
              <Button variant="contained" type='submit'  sx={{width:"100%"}}>
                Submit

              </Button>
              
            </Box>


            
          </Box>



      </Box>

      </form>
    </div>
    
  )
}

export default Create