import {useEffect, useState} from "react";
import axios from "axios";


export function ListStudent() {
    let [student, setStudent] = useState([]);
    let [nameSearch, setNameSearch] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3000/students').then(res => {
            console.log(res.data)
            setStudent(res.data)
        })
    }, []);
    const filterStudents = student.filter((stu) => {
        const searchStudentName = stu.name.toUpperCase().includes(nameSearch.toUpperCase());
        console.log(nameSearch)
        return searchStudentName
    })
    return (
        <>
            <h2>DANH SÁCH SINH VIÊN</h2>
            <input onChange={(event) => {
                setNameSearch([event.target.value])
            }} placeholder={'search for name'}/>
            <table>
                <tr>
                    <th>Num</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                    <th>Score</th>
                </tr>
                {filterStudents.map((item, index) =>
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.action}</td>
                        <td>{item.score}</td>
                    </tr>
                )}

            </table>
        </>
    )
}

//Bài tập: Hiện danh sách, tìm kiếm theo tên gần đúng, sắp xếp theo điểm