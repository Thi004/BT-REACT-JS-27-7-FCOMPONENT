import {useEffect, useState} from "react";
import axios from "axios";

export function ShowList() {
    let [list, setList] = useState([]);
    let [nameSearch, setNameSearch] = useState('');
    let [field, setField] = useState("");
    let [check, setCheck] = useState(false);
    let api = "https://restcountries.com/v3.1/all?fields=name,area,population,flags,capital";
    const getAll = () => {
        axios.get(api).then((res) => {
            setList(res.data)
        })
    }
    let getField = (event) => {
        let field = event.target.value;
        if (field === "") {
            setCheck(false);
            getAll();
            return;
        } else {
            setField(field);
            api = api + "," + field;
            axios.get(api).then((res) => {
                setList(res.data);
                setCheck(true);
            })
        }
    }
    useEffect(() => {
        getAll()
    }, []);
    let findNameContain = (event) => {
        setNameSearch(event.target.value);
        let input = event.target.value;
        if (input === "") {
            getAll();
        } else {
            let newList = list.filter((item) => {
                let nameCountry = item.name.common;
                return nameCountry.toLowerCase().includes(input.toLowerCase());
            });
            setList(newList);
        }
    }
    let findByArea = () => {
        let from = 100;
        let to = 1000;
        let newList = list.filter((item) => {
            let area = item.area;
            return area >= from && area <= to;
        });
        setList(newList);
    }
    return (
        <>
            <h2>DANH SÁCH CÁC QUỐC GIA</h2>
            <input value={nameSearch} onChange={(event) => {
                findNameContain(event)
            }}
                   placeholder={'search for name'}/>
            <button onClick={findByArea}>Danh sách các nước diện tích 100 - 1000</button>
            <button onClick={getAll}>Show All</button>
            <select onChange={getField} value={field}>
                <option value={""}>--Thêm--</option>
                <option value={"timezones"}>timezones</option>
                <option value="status">status</option>
            </select>
            <table>
                <tr>
                    <th>STT</th>
                    <th>LÁ CỜ</th>
                    <th>TÊN</th>
                    <th>DIỆN TÍCH</th>
                    <th>DÂN SỐ</th>
                    {
                        check ? (<th>{field}</th>) : ""
                    }
                </tr>
                {list.map((e, index) =>
                    <tr>
                        <td>{index + 1}</td>
                        <td><img src={e.flags.png} alt=''/></td>
                        <td>{e.name.common}</td>
                        <td>{e.area}</td>
                        <td>{e.population}</td>
                        {
                            check ? (<td>{e[field]}</td>) : ""
                        }
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
