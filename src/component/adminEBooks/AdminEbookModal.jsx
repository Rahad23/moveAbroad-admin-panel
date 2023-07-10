// import axios from "axios";
// import { useState } from "react";
import axios from "axios";import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
const AdminEbookModal=()=>{
    const [imgFileName, setImgFileName] = useState('');
    const { register, handleSubmit, reset } = useForm();

    const closeModal = () => {
      const modal = document.getElementById("my_modal_3");
      if (modal) {
        modal.close();
      }
    };
    

    const onSubmitData = data => {
        if(data?.bookName && data?.description && imgFileName){
            const E_Book_Data = {
                bookName: data?.bookName,
                description: data?.description,
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
      

   
    return (
    <>
    {/* <img src={} alt="" /> */}
    <dialog id="my_modal_3" className="modal">
  <form onSubmit={handleSubmit(onSubmitData)} method="dialog" className="modal-box w-[800px] bg-white text-gray-950" encType="multipart/formData">
    <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <div className="my-5">
      <h1 className="mb-2 text-xl font-semibold text-gray-950">Add Book</h1>
      <div className="flex gap-x-5 justify-center">
        <div className="w-full">
          <label className="label">
            <span className="label-text">Book name</span>
          </label>
          <textarea {...register("bookName")} required className="textarea textarea-primary inline w-full bg-white" placeholder="Book-name"></textarea>
        </div>
        <div className="w-full">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea {...register("description")} required className="textarea textarea-primary inline w-full bg-white" placeholder="Description"></textarea>
        </div>
      </div>
      <input onChange={handleFileUpload} required name="files" type="file" className="file-input file-input-bordered file-input-primary w-[50%] max-w-xs bg-white mt-3" />
    </div>
    <div className="flex justify-center">
      <button type="submit" className="btn bg-[#FE0000] hover:bg-[#FE0000] border-none text-white w-[70%]">Submit</button>
    </div>
  </form>
</dialog>

    </>
    )
}

export default AdminEbookModal;