import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export function ListStudent() {
    let [student, setStudent] = useState([]);
    let [nameSearch, setNameSearch] = useState('');
    let navigate  = useNavigate()
    let getAll = () => {
        axios.get("http://localhost:3000/students").then((res) => {
            let data = res.data;
            setStudent(data);
        })
    }

    useEffect(() => {
        getAll();
    }, []);
    let searchName = (event) => {
        let name = event.target.value;
        setNameSearch(name);
        if (name === "") {
            getAll();
            return;
        }
        let newLList = student.filter((item) => {
            return item.name.toLowerCase().includes(name.toLowerCase());
        });
        console.log(newLList);
        setStudent(newLList);
    }
    let sortBySore = (event) => {
        let value = event.target.value;
        if (value === "") {
            getAll();
            return;
        }
        if (value === "asc") {
            let newList = [...student];
            newList.sort((a, b) => {
                return a.score - b.score;
            });
            setStudent(newList);
        } else {
            let newList = [...student];
            newList.sort((a, b) => {
                return b.score - a.score;
            });
            setStudent(newList);
        }
    }
    return (
        <>
            <input placeholder="Search Name" value={nameSearch} onChange={(event) => {
                searchName(event)
            }}></input>
            <select onChange={(event) => {
                sortBySore(event)
            }}>
                <option value="">Sắp xếp điểm</option>
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
            </select>
            <h2>DANH SÁCH SINH VIÊN</h2>
            <table>
                <tr>
                    <th>Num</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                    <th>Score</th>
                </tr>
                {student.map((item, index) =>
                    <>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.action}</td>
                            <td>{item.score}</td>
                        </tr>
                    </>
                )}
            </table>
            <button onClick={() => {
                navigate('/a')
            }}
            >Go to page A
            </button>
        </>
    )
}

//Bài tập: Hiện danh sách, tìm kiếm theo tên gần đúng, sắp xếp theo điểm