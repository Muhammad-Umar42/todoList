import React, { useEffect, useId, useState } from 'react'
import './index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const getData = () => {
    let list = localStorage.getItem('list')
    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}


const Index = () => {
    const [allData, setallData] = useState(getData())
    const [inputData, setinputData] = useState('');
    const [edit, setedit] = useState('')
    // const [toggle, settoggle] = ("false")



    const handleClick = (e) => {
        e.preventDefault();

        if (inputData === '') {
            toast.error('empty Data!')
        }
        else {
            const wid = { id: new Date().getTime().toString(), name: inputData }
            setallData([...allData, wid])
            setinputData('')
            toast.success('Message sent successfully!');
        }
    }



    const getChangevalue = (e) => {
        setinputData(e.target.value)
    }
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(allData))
    }, [allData])


    const handleDel = (id) => {
        const upDate = allData.filter((ele) => {

            return ele.id !== id
        })
        setallData(upDate)
        toast.dark('Item remove!');
    }

    const handleedit = (data) => {
        setinputData(data.name)
        setedit(data)
    }
    const handleupdate = () => {
        // const newupDate = allData.filter((ele) => {

        //     // console.log(ele)
        //     // if (ele.id === edit.id) {
        //         // console.log(ele)
        //         // return ele.name = inputData;

        //     }
        //     // localStorage.setItem('list', JSON.stringify([...ele, newupDate]))
        //     setinputData('')
        // })
        // console.log("update", newupDate)
        const updatedArr = allData.map(obj => {
            if (obj.id === edit.id) {
                return { ...obj, name: inputData };
            } else {
                return obj;
            }
        });
        localStorage.setItem("list", JSON.stringify(updatedArr))
        setallData(updatedArr)
        setinputData('')
        setedit('')

        console.log("updated", updatedArr)
    }


    return (
        <>
            <ToastContainer />

            <div className="container">
                <form action="">
                    <input type="text" placeholder='✍️ type Email' value={inputData} onChange={getChangevalue} />

                    {/* ////////////////button//////////////// */}


                    <div className="btn">
                        {edit === "" ? <button onClick={handleClick}> ADD </button> : <button type='button' onClick={handleupdate}>
                            update </button>}


                    </div>


                    {/* ////////////////button//////////////// */}

                    <div className="todo">
                        {/* <h3>{allData}</h3> */}
                        {
                            allData.map((value, ind) => {
                                return (
                                    <>
                                        <div style={{ display: "flex", justifyContent: "center", margin: '10px 0' }} key={ind}>
                                            <button type='button' className='edit' onClick={() => handleedit(value)}>Edit</button>
                                            <h3 >{value.name}</h3>
                                            <button type='button' className='remove' onClick={() => handleDel(value.id)}>Delet</button>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>


                </form>
            </div>
        </>
    )
}

export default Index