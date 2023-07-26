import axios from "axios";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { BsSearch} from "react-icons/bs";
import AdminEbookModal from "./AdminEbookModal";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from "react-photo-view";
import { getSession } from "../Login_Registration/SessionManagement/SessionManagement";
import { useNavigate } from "react-router-dom";
const AdminEBooks=()=>{
  // const { handleSubmit } = useForm();
  // const [imgFileName, setImgFileName] = useState('');
  // const [bookId, setBookId] = useState('');
  // const [existingFileName, setExistingFileName] = useState('');
  const [bookData, setBookData] = useState([]);
  // const [save, setSave]=useState(false);
  const [search, setSearch]=useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader]=useState(true);
  const {isLoggedIn } = getSession();
  const [eBookId, setEbookId] = useState('');
  const [editEbook, setEditEBook] = useState(false);
  // console.log(search);
  const navigate = useNavigate();

  // const eBookUpdate = data => {
  //   if(data?.bookName && data?.description && imgFileName || existingFileName && save){
  //     const E_Book_Data = {
  //       bookName: data?.bookName,
  //       description: data?.description,
  //       imgFileName: imgFileName ? imgFileName : existingFileName
  //   }
  //   axios.patch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/ebook/${bookId}`, {
  //     ...E_Book_Data
  //   })
  //   .then(response => {
  //     // Handle successful response
  //     console.log(response.data.acknowledged);
  //     if(response.data.acknowledged){
  //       toast.success("Update successfully");
  //       setEdit(false);
  //       setSave(false);
  //       location.reload();
  //     }
  //   })
  //   .catch(error => {
  //     // Handle error
  //     console.error(error);
  //   });

  //   }
  // }

  // function handleFileUpload(event) {
  //   const files = event.target.files;
  //   const file = files[0];
    
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('files', file);
  //     axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/upload`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  //       .then(response => {
  //         setImgFileName(response.data.filename);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // }


    const getEbookData=()=>{
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/ebook`)
        .then(response => {
          setLoader(false);
            setBookData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    useEffect(()=>{
        getEbookData();
    },[])


    const deleteBook=(_id)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "Do You want to delete this E_Book?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/ebook/${_id}`)
          .then(response => {
            console.log(response.data);
            if(response.data.acknowledged){
              location.reload();
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
        })
        .catch(error => {
          console.error(error);
        });
        }
      })
    }
    const openModal = () => {
      setIsOpen(true);
    };
    const closeModal = () => {
      setIsOpen(false);
    };

 return  isLoggedIn ? 
 <div className="">
 <div className="overflow-x-auto">
     <div className="mb-9 justify-between items-center flex">
     <button className="btn bg-[#FE0000] hover:bg-[#fc0c0c] text-white border-none" onClick={openModal}>
     Add Book
</button>
   <div className=" bg-white">
     <div className="flex">
     <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..." className="input bg-white input-bordered w-[279px] pr-16 text-gray-950" />
     <button className="btn bg-[#274396] hover:bg-[#D82027] border-none ml-[-15%] rounded-[5px]">
         <BsSearch className="text-xl text-white" />
     </button>
     </div>
 </div>
     </div>
{
loader ? <div className="flex items-center justify-center h-[400px]">
<span className="loader"></span>
</div>
:
<table className="table mt-14">
{/* head */}
<thead className="text-gray-950">
 <tr>
   <th>Book</th>
   <th>Book Name</th>
   <th>Description</th>
   <th>Action</th>
 </tr>
</thead>
<tbody>
{

bookData.length === 0 ? (
<tr>
 <td colSpan="4">Data not found</td>
</tr>
) :
bookData
.filter((resource) => {
 const searchLower = search.toLowerCase();
 const bookNameLower = resource.bookName.toLowerCase();
 const descriptionLower = resource.description.toLowerCase();

 return (
   searchLower === "" ||
   bookNameLower.includes(searchLower) ||
   descriptionLower.includes(searchLower)
 );
}).map(data=> 
   <tr key={data._id} className="text-gray-950">
   <td>
     {
  //      data._id === bookId && edit 
  //      ?
  //      <div>
  //      <input onChange={handleFileUpload} type="file" id="upload" hidden />
  //      <label htmlFor="upload" className='lg:inline-block cursor-pointer'>
  //          <div className='flex items-center justify-center'>
  //          <div className="avatar relative" title="update image">
  //        <div className="mask mask-squircle w-12 h-12">
  //          <img className="opacity-50" src={"http://"+data?.imagePath} alt="Avatar Tailwind CSS Component" />
  //        </div>
  //      </div>
  //              <span className='text-[#FFFFFF] font-medium lg:text-base text-sm absolute'>
  //                  <BsUpload className="text-[#DC2626] text-xl font-bold" />
  //              </span>
  //          </div>
  //      </label>
  //  </div>
  //  :
   <div className="flex items-center space-x-3">
       <div className="avatar">
         <div className="mask mask-squircle w-12 h-12 cursor-pointer">
         <PhotoProvider>
         <PhotoView src={"http://"+data?.imagePath}>
           <img src={"http://"+data?.imagePath} alt="Avatar Tailwind CSS Component" />
         </PhotoView>
       </PhotoProvider>
           {/* <img src={"http://"+data?.imagePath} alt="Avatar Tailwind CSS Component" /> */}
         </div>
       </div>
     </div>
     }
   </td>
   <td>
       {
           <p>{data.bookName.length > 20 ? data.bookName.slice(0, 20)+"..." : data.bookName}</p>
       }
   </td>
   <td>
       {
            <p>
              { data.description.replace(/<[^>]+>/g, '').length > 20 ? data.description.replace(/<[^>]+>/g, '').slice(0, 20)+"..." : data.description.replace(/<[^>]+>/g, '')}
            </p>
       }
       </td>
   <th className="dropdown dropdown-bottom">
     <button className="btn bg-red-600 btn-xs border-none hover:bg-red-600 text-white">Actions <FaCaretDown /></button>
     <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-24 text-gray-950">
       <li onClick={()=>setEbookId(data._id)}>
           {
               <span className="hover:text-gray-950" onClick={()=>setEditEBook(true)}>Edit</span>
           }
          
           </li>
       <li>
           {
             
               <span onClick={()=>deleteBook(data._id)} className="text-red-600 hover:text-red-600">Delete</span>
           }
           
           
           </li>
   </ul>
   </th>
 </tr>
)
}

</tbody>
</table>
}
</div>
<AdminEbookModal modalIsopen={isOpen} id={eBookId} coloseModal={closeModal} editModalF={setEditEBook} editModal={editEbook} />
</div>
 : 
 navigate("/login")   
}

export default AdminEBooks;