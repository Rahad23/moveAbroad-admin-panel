import "./adminLiveSeminarStyle/AdminLiveSeminar.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

// import { TimePicker } from 'react-ios-time-picker';
function AdminLiveSeminar() {
    const { register, handleSubmit, reset} = useForm();
    const [imgFileName, setImgFileName] = useState('');
    const [imgSizeError, setImgSizeError]=useState('');
    const [status, setStatus] = useState('');
    const [getDate, setGetDate]=useState('');

    const onSubmit = data => {
        const selectedTime = addAmPmIndicator(data?.time);
        if(data?.universityName && data?.aboutUniversity && data?.timingRegistration && getDate && selectedTime && imgFileName){
            const live_seminar_Data ={
                universityName: data?.universityName,
                date: getDate,
                moduleStartTime: selectedTime,
                universityImg: imgFileName,
                aboutUniversity: data?.aboutUniversity,
                registrationTiming: data?.timingRegistration
            }
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
    <>
      <div className="d-grid">
        <div className="">
            <h1 className="text-2xl font-semibold animate-charcter">Manage Live online seminar</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto ">
            <div className="mb-4">
            <form onSubmit={handleSubmit(onSubmit)} className=" bg-white text-gray-950 max-w-none max-h-none" encType="multipart/formData">

    <div className="my-5">
        <div className="w-full">
          <label className="label">
            <span className="label-text">University Name</span>
          </label>
          <input {...register("universityName")} type="text" placeholder="University Name" className="input input-bordered input-primary w-full bg-white" required />
        </div>
        <div className="w-full">
          <label className="label">
            <span className="label-text">About University</span>
          </label>
          <textarea {...register("aboutUniversity")} className="textarea textarea-bordered w-full bg-white textarea-primary" placeholder="About University" required></textarea>
        </div>
        <div className="flex mt-4 items-center">
        <div className="w-full relative">
          <label className="label">
            <span className="label-text">Class start date</span>
          </label>
          <input
  {...register("date")}
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
          <input {...register("time")} type="time"  className="bg-white text-gray-950 input input-bordered input-primary cursor-pointer" id="myDateInput" defaultValue="00:00" />
        </div>
        <div className="w-full relative">
          <label className="label">
            <span className="label-text">Timing of registration</span>
          </label>
          <select {...register("timingRegistration")} className="select w-[70%] input-bordered input-primary bg-white text-gray-950">
        <option disabled selected>Pick</option>
        <option>1-month</option>
        <option>2-month</option>
        <option>3-month</option>
        <option>4-month</option>
        <option>5-month</option>
        <option>6-month</option>
        <option>7-month</option>
        <option>8-month</option>
        <option>9-month</option>
        <option>10-month</option>
        <option>11-month</option>
        <option>1-year</option>
        </select>
          {/* <input {...register("time")} type="time"  className="bg-white text-gray-950 input input-bordered input-primary cursor-pointer" id="myDateInput" defaultValue="00:00" /> */}
        </div>
        <div className="w-full">
        <label className="label">
            <span className="label-text">University Image</span>
          </label>
        <input onChange={handleFileUpload} required name="files" type="file" className="file-input file-input-bordered file-input-primary w-full bg-white" />
        {status ? null : imgSizeError && <span className="text-red-600">{imgSizeError}</span>}
        </div>
        </div>
      <div className="flex justify-center mt-10">
      <button type="submit" className="btn bg-[#FE0000] hover:bg-[#FE0000] border-none text-white w-[30%]">Submit</button>
      </div>
    </div>
  </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLiveSeminar;