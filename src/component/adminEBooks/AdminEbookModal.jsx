// import axios from "axios";
// import { useState } from "react";
import axios from "axios";
import { useState } from "react";
import JoditEditor from 'jodit-react';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import "./AdminEbooksCss/AdminEbookModal.css";

// eslint-disable-next-line react/prop-types
const AdminEbookModal=({modalIsopen, coloseModal})=>{
  
  const [editorValue, setEditorValue] = useState('');

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

    const [imgFileName, setImgFileName] = useState('');
    const { register, handleSubmit, reset } = useForm();
    

    const onSubmitData = data => {
      // console.log(data, editorValue, imgFileName)
        if(data?.bookName && editorValue && imgFileName){
            const E_Book_Data = {
                bookName: data?.bookName,
                description: editorValue,
                imgFileName: imgFileName
            }
            axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/ebook`,{
                ...E_Book_Data,
            })
            .then(function (response) {
                if(response.status === 200){
                    toast.success("Create a new book");
                    reset();
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    };

    function handleFileUpload(event) {
        const files = event.target.files;
        const file = files[0];
        
        if (file) {
          const formData = new FormData();
          formData.append('files', file);
          
          axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              setImgFileName(response.data.filename);
            })
            .catch(error => {
              console.error(error);
            });
        }
      }
      
      const config ={
        height: "200px",
        placeholder: 'write description...',
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
            <form onSubmit={handleSubmit(onSubmitData)} className=" bg-white text-gray-950 max-w-none max-h-none " encType="multipart/formData">

    <div className="my-5">
      <h1 className="mb-2 text-xl font-semibold text-gray-950 animate-charcter capitalize">Add Book</h1>
        <div className="w-full">
          <label className="label">
            <span className="label-text">Book name</span>
          </label>
          <input {...register("bookName")} type="text" placeholder="Book-name" className="input input-bordered input-primary w-full bg-white" required />
          {/* <textarea {...register("bookName")} required className="textarea textarea-primary inline w-full bg-white" placeholder="Book-name"></textarea> */}
        </div>
        <div className="w-full relative">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
         
         {/* use here jodit editor */}
         <JoditEditor
           value={editorValue}
           onBlur={handleEditorChange}
           required
           config={config}
        />
          {/* <textarea {...register("description")} required className="textarea textarea-primary inline w-full bg-white" placeholder="Description"></textarea> */}
        </div>
      <div className="flex justify-between mt-4">
      <input onChange={handleFileUpload} required name="files" type="file" className="file-input file-input-bordered file-input-primary w-[50%] max-w-xs bg-white" />
      <button type="submit" className="btn bg-[#FE0000] hover:bg-[#FE0000] border-none text-white w-[30%]">Submit</button>
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

export default AdminEbookModal;