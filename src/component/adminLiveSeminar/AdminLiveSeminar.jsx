import "./adminLiveSeminarStyle/AdminLiveSeminar.css"
import { useEffect, useState } from "react";
import AdminLiveSeminarModal from "./AdminLiveSeminarModal";
import { BsSearch } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
function AdminLiveSeminar() {
  const [search, setSearch]=useState('');
  const [liveSeminarData, setLiveSeminarData] = useState([]);
  console.log(liveSeminarData)
    const [isOpen, setIsOpen] = useState(false);
      const openModal = () => {
        setIsOpen(true);
      };
      const closeModal = () => {
        setIsOpen(false);
      };
      
      const getLiveSeminar=()=>{
        axios.get(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/liveOnlineSeminar`)
        .then(response => {
            setLiveSeminarData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    const liveSeminarDelete=(_id)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this live seminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          axios.delete(
            axios.delete(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/liveOnlineSeminar/${_id}`)
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
          })
          )
        }
      })
    }

    useEffect(()=>{
      getLiveSeminar();
    },[])

  return (
    <>
      <div className="d-grid">
        <div className="">
            <div className="mb-9 justify-between items-center flex">
                <button className="btn bg-[#FE0000] hover:bg-[#fc0c0c] text-white border-none" onClick={openModal}>
                Add Live seminar
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
            <div className="bg-white rounded-lg p-6 overflow-y-auto ">
            <div className="mb-4">
            <AdminLiveSeminarModal modalIsopen={isOpen} coloseModal={closeModal} />
            </div>
          </div>
          <div className="overflow-x-auto">
          <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>University</th>
        <th>University Name</th>
        <th>Class start time</th>
        <th>Registration time</th>
        <th>About University</th>
        <th>Publish Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        liveSeminarData.length === 0 ? (
          <tr>
            <td colSpan="4">Data not found</td>
          </tr>
        ) 
        :
        liveSeminarData.filter((resource) => {
        const searchLower = search.toLowerCase();
        const universityNameLower = resource.universityName.toLowerCase();
        const universityDescriptionLower = resource.aboutUniversity.toLowerCase();
    
        return (
          searchLower === "" ||
          universityNameLower.includes(searchLower) ||
          universityDescriptionLower.includes(searchLower)
        );
      }).map(data=>
        <tr key={data?.key}>
        <td>
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <PhotoProvider>
                <PhotoView src={"http://"+data?.imagePath}>
                  <img src={"http://"+data?.imagePath} alt="Avatar Tailwind CSS Component" />
                </PhotoView>
              </PhotoProvider>
              </div>
            </div>
          </div>
        </td>
        <td>
          {data?.universityName}
        </td>
        <td>{data?.classStartTime}</td>
        <td>
         {data?.registrationTiming}
        </td>
        <td>
         {data?.aboutUniversity.length > 10 ? data?.aboutUniversity.slice(0, 10)+"..." : data?.aboutUniversity}
        </td>
        <td>
          {data?.publishDate}
        </td>
        <th className="dropdown dropdown-bottom">
        <button className="btn bg-red-600 btn-xs border-none hover:bg-red-600 text-white">Actions <FaCaretDown /></button>
        <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-24 text-gray-950">
                    <li>
                        {
                            <span className="hover:text-gray-950">Edit</span>
                        }
                       
                        </li>
                    <li>
                        {
                           
                            <span onClick={()=>liveSeminarDelete(data?._id)} className="text-red-600 hover:text-red-600">Delete</span>
                        }
                        
                        
                        </li>
                </ul>
        </th>
      </tr>
        ) 

      }
    </tbody>
  </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLiveSeminar;