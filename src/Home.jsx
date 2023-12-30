import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert";
function Home() {
  const [comment, setComment] = useState("");
  const [note, setNote] = useState([]);
  const people = [
    {
      name: "Leslie Alexander",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "Michael Foster",
      email: "michael.foster@example.com",
      role: "Co-Founder / CTO",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "Dries Vincent",
      email: "dries.vincent@example.com",
      role: "Business Relations",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: null,
    },
    {
      name: "Lindsay Walton",
      email: "lindsay.walton@example.com",
      role: "Front-end Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "Courtney Henry",
      email: "courtney.henry@example.com",
      role: "Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "Tom Cook",
      email: "tom.cook@example.com",
      role: "Director of Product",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: null,
    },
  ];

  useEffect(() => {
    console.log("euseeffect");
    const fetchnotes = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/createnote/notes/"
      );
      if (response.status == 200) {
        console.log(response.data);
        setNote(response.data);
      }
    };
    fetchnotes();
  }, []);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      Swal({
        title: "please enter!",
        text: "Notes  .",
        icon: "warning",
        button: "Got it!",
      });
    } else {
      const data = {
        note: comment,
      };
      await axios
        .post("http://127.0.0.1:8000/createnote/notes/create", data)
        .then((response) => {
          console.log(response.data);

          if (response.status === 201) {
            setNote(response.data);
            Swal({
              title: "Sucess!",
              text: "Notes created sucessfully .",
              icon: "success",
              button: "Got it!",
            }).then(() => {
              setComment("");
            });
          } else {
            console.error("Unexpected status code:", response.status);
            Swal.fire({
              title: "Unexpected Error!",
              text: "Something went wrong. Please try again later.",
              icon: "error",
            });
          }
        });
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    if (name === "comment") {
      console.log(e.target.value);
      setComment(e.target.value);

      console.log("change");
    }
  };
  const handledelete = async (id) => {
    const response = axios.delete(
      `http://127.0.0.1:8000/createnote/notes/delete/${id}/`
    );
    if (response.status == 200) {
      setNote(response.data);
    }
    console.log("hhhh");
  };
  return (
    <div>
      <div className="split left">
        <div className="centered">
          <form
            className="flex w-full max-w-sm space-x-3"
            onSubmit={handlesubmit}
          >
            <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
                Make Your Notes
              </div>
              <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                <div className="col-span-2">
                  <label className="text-gray-700" htmlFor="name">
                    <textarea
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      id="comment"
                      placeholder="Enter your thoughts"
                      name="comment"
                      rows={5}
                      cols={40}
                      onChange={handlechange}
                      value={comment}
                    />
                  </label>
                </div>
                <div className="col-span-2 text-right">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className=" p-10 split right">
        <div className="centered">
          <h2 className="text-black">My Notes</h2>
          <ul role="list" className="divide-y divide-gray-100">
            {note.map((not) => (
              <li key={not.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <button
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Toggle modal
                  </button>

                
                  <button onClick={() => handledelete(not.id)}>Delete</button>

                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {not.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
