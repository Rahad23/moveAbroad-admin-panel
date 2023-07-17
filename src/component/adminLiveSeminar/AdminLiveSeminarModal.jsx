// import axios from "axios";
// import { useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import "../adminEBooks/AdminEbooksCss/AdminEbookModal.css";

// eslint-disable-next-line react/prop-types
const AdminLiveSeminarModal=({modalIsopen, coloseModal, id})=>{
  // console.log(id)
    const { register, handleSubmit, reset} = useForm();
    const [imgFileName, setImgFileName] = useState('');
    const [imgSizeError, setImgSizeError]=useState('');
    const [status, setStatus] = useState('');
    const [getDate, setGetDate]=useState('');
    const [liveSeminarData, setLiveSeminarData]=useState({});
    // console.log(liveSeminarData)
    const objectDate = new Date();
    const day = objectDate.getDate();
    const month = objectDate.getMonth()+1;
    const year = objectDate.getFullYear();

    const formatDate = year + "-" + month + "-" + day;

    const {aboutUniversity,classStartTime,date,imagePath,publishDate,registrationTiming,universityName, _id } = liveSeminarData;
    const liveSeminarDatas=()=>{
      //get one live seminar data
    if(id){
      axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/liveOnlineSeminar/${id}`)
    .then(response => {
      setLiveSeminarData(response.data);
  })
  .catch(error => {
    console.error(error);
  });
    }
    }
  

    useEffect(()=>{
      liveSeminarDatas();
    },[id])

    const onSubmit = data => {
      const selectedTime = addAmPmIndicator(data?.time);
        if(data?.universityName && data?.aboutUniversity && data?.timingRegistration && getDate && selectedTime){
            const live_seminar_Data ={
                universityName: data?.universityName,
                date: getDate,
                classStartTime: selectedTime,
                universityImg: imgFileName,
                aboutUniversity: data?.aboutUniversity,
                registrationTiming: data?.timingRegistration,
                publishDate: formatDate
            }
            if(id){
              console.log("hello")
              console.log(liveSeminarData)
              axios.patch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/liveOnlineSeminar/${id}`,{
                ...live_seminar_Data
              })
              .then(response => {
                if(response.data.acknowledged){
                  toast.success("Update successfully");
                  reset()
                  setLiveSeminarData({});
                }
              })
              .catch(error => {
                // Handle error
                console.error(error);
              });
            }else{
              axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/liveOnlineSeminar`,{
                ...live_seminar_Data,
            })
            .then(function (response) {
                if(response.status === 200){
                    setImgSizeError('');
                    toast.success("Success");
                    reset();
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            }
            
        }

    };

    const addAmPmIndicator = (time) => {
        const [hours, minutes] = time.split(":");
        let formattedHours = parseInt(hours);
        let amPm = "AM";
    
        if (formattedHours >= 12) {
          amPm = "PM";
          if (formattedHours > 12) {
            formattedHours -= 12;
          }
        }
    
        const formattedTime = `${formattedHours}:${minutes}${amPm}`;
        return formattedTime;
      };

    function handleFileUpload(event) {
        const files = event.target.files;
        const file = files[0];
        
        if (file) {
          const formData = new FormData();
          formData.append('files', file);
          
          axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/liveSeminar`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              setStatus(response.status)
              setImgFileName(response.data.filename);
            })
            .catch(error => {
              setStatus('');
              setImgSizeError(error.response.data.error);
              console.log(error)
            });
        }
      }

    return (
      <div>
      {
      
      modalIsopen && (
        <div id="modal" className="fixed inset-0 flex items-center justify-center z-50 w-screen">
          <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto ">
          <div className="flex justify-end">
              <button id="closeModal" className="text-red-600 rounded text-2xl" onClick={()=>coloseModal(false)}>
                x
              </button>
            </div>
            <div className="mb-4">
<form onSubmit={handleSubmit(onSubmit)} className=" bg-white text-gray-950 max-w-none max-h-none" encType="multipart/formData">

<div className="my-5">
<h1 className="mb-2 text-xl font-semibold text-gray-950 animate-charcter capitalize">{id ? "Edit" : "Add"} Live online seminar</h1>
    <div className="w-full">
      <label className="label">
        <span className="label-text">University Name</span>
      </label>
      <input {...register("universityName")} defaultValue={universityName ? universityName : null} type="text" placeholder="University Name" className="input input-bordered input-primary w-full bg-white" required />
    </div>
    <div className="w-full">
      <label className="label">
        <span className="label-text">About University</span>
      </label>
      <textarea {...register("aboutUniversity")} defaultValue={aboutUniversity ? aboutUniversity : null} className="textarea textarea-bordered w-full bg-white textarea-primary" placeholder="About University" required></textarea>
    </div>
    <div className="flex mt-4 items-center">
    <div className="w-full relative">
      <label className="label">
        <span className="label-text">Timing of registration</span>
      </label>
      <input
{...register("timingRegistration")}
type="date"
defaultValue={registrationTiming ? registrationTiming : null}
className="bg-white text-gray-950 input input-bordered input-primary cursor-pointer"
/>
      {/* <input {...register("time")} type="time"  className="bg-white text-gray-950 input input-bordered input-primary cursor-pointer" id="myDateInput" defaultValue="00:00" /> */}
    </div>
    <div className="w-full relative">
      <label className="label">
        <span className="label-text">Class start date</span>
      </label>
      <input
{...register("date")}
defaultValue={""}
type="date"
className="bg-white text-gray-950 input input-bordered input-primary cursor-pointer"
onChange={(e) => {
const selectedDate = new Date(e.target.value);
const formattedDate = selectedDate.toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
setGetDate(formattedDate);
}}
/>

    </div>
    <div className="w-full relative">
      <label className="label">
        <span className="label-text">Class start time</span>
      </label>
      <input {...register("time")} type="time"  className="bg-white text-gray-950 input input-bordered input-primary cursor-pointer" id="myDateInput" defaultValue={classStartTime ? classStartTime : "10:30"} />
    </div>
    <div className="w-full">
    <label className="label">
        <span className="label-text">University Image</span>
      </label>
    <input onChange={handleFileUpload} {...id ? "default" : {required: true}} name="files" type="file" className="file-input file-input-bordered file-input-primary w-full bg-white" />
    {status ? null : imgSizeError && <span className="text-red-600">{imgSizeError}</span>}
    </div>
    </div>
  <div className="flex justify-center mt-10">
    {
      id ?
<button type="submit" className="btn bg-[#FE0000] hover:bg-[#FE0000] border-none text-white w-[30%]">Update</button>
:
<button type="submit" className="btn bg-[#FE0000] hover:bg-[#FE0000] border-none text-white w-[30%]">Submit</button>
    }
  
  </div>
</div>
</form>

            </div>
          </div>
        </div>
      )}
    </div>


    )
}
export default AdminLiveSeminarModal;