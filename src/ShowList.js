import {useEffect, useState} from "react";
import axios from "axios";

export function ShowList() {
    let [list, setList] = useState([]);
    let [listSearch, setListSearch] = useState([]);
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=name,area,population,flags').then(x => {
            setList(x.data);

        })
    }, []);
    return (
        <>
            <h2>DANH SÁCH CÁC QUỐC GIA</h2>
            <input onChange={(eName) => {
                setListSearch([eName.target.value])
            }}
                   placeholder={'search for name'}/>
            <table>
                <tr>
                    <th>LÁ CỜ</th>
                    <th>TÊN</th>
                    <th>DIỆN TÍCH</th>
                    <th>DÂN SỐ</th>
                </tr>
                {list.map((e) =>
                    <tr>
                        <td><img src={e.flags.png} alt=''/></td>
                        <td>{e.name.common}</td>
                        <td>{e.area}</td>
                        <td>{e.population}</td>
                    </tr>
                )}
            </table>
        </>
    )
}

//https://restcountries.com/v3.1/all?fields=name,area,population,flags
// Tạo 1 compoent hiện danh sách quốc gia có: ảnh (hiện ảnh), tên (1 tên), diện tích và dân số.
// Tính năng thêm:
// Tìm kiếm theo tên gần đúng
// Tìm kiêm theo khoảng diện tích (ví dụ từ 100 - 1000)
// Tìm kiêm theo khoảng dân số (ví dụ từ 100000 - 1000000)
// Nâng cao: hiện 1 select option để chọn thêm 1 thông tin hiện thêm (ví dụ: chọn capital => Hiện thêm tên thủ đô)
