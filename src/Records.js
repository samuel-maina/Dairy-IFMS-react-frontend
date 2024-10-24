import Nav from './Nav';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link, NavLink } from 'react-router-dom';
import MemberRecords from './MemberRecords';
import moment from 'moment';
import { useState, useEffect } from 'react'
import axios from 'axios';
const  Records = () => {

    const[member, setMember] = useState({});
    const[records, setRecords] = useState([]);
    const[error, setError] = useState("");
    const [dataRecords, setDataRecords] = useState([]);
    const tenant = localStorage.getItem("tenant");
    const [month, setMonth] = useState(moment());
    const [day, setDay] = useState("");
    const[info, setInfo] = useState("")
    const[record, setRecord] = useState(0);
    const[permissionError, setPermissionError] = useState(false);
    const[memberAmountForMonth, setMemberAmountforMonth] = useState(0);
    const[memberId, setMemberId] = useState(0);
    const user = localStorage.getItem("employee");
    const tenantname = localStorage.getItem("tenant_name");
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const[cost, setCost] = useState(null);
    const[deductions, setDeductions] = useState([]);
    const[deductionsSum, setDeductionsSum] = useState(0);
    const onItemChange = (e) => {
        setItem(e.target.value);
    };

    const onQuantityChange = (e) => {
        setQuantity(e.target.value);
    };
    const onCostChange = (e) => {
        setCost(e.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();
        var deduction = {
            "cost": cost,
            "item": item,
            "member": {
                "id": member.id
            },
            "quantity": quantity
        }
        await  axios.post("/api/v1/deductions/" + tenant, deduction)
                .then((response) => {
                    showDeductions();
                    setCost("");
                    setItem("");
                    setQuantity("");
                    fetchMemberDeductionsSum(month);

                }).catch((err) => {

            if (err.response.status === 403) {
                setPermissionError(true);
            }

            //setMember("");
        });
        ;
    }


    const incrementMonth = async(e) => {
        setMemberAmountforMonth(0);
        var date = moment();
        date = month;
        date.add(1, 'month');
        await setMonth(date);
        var date = month.format('YYYY-MM-DD');
        fetchMemberMonthlyRecords(member.id, date);
        fetchMemberAmountForMonth(member.id, month);
        fetchMemberDeductionsSum(month);
        showDeductions();
        setInfo("Showing data records for member " + member.id + " for " + month.format('YYYY-MM'));
        setError("");
    };
    const showDeductions = async(date) => {
        await  axios.get("/api/v1/deductions/" + tenant + "/" + member.id + "/" + month.format('YYYY-MM-DD'))
                .then((response) => {
                    setDeductions(response.data);

                }).catch((err) => {
            if (err.response.status === 403) {
                setPermissionError(true);
            }

            //setMember("");
        });

        //await visibilityToggle();
    };
    const visibilityToggle = () => {
        document.getElementById("add-deductions").style.visibility = "visible";
        showDeductions();
    };

    const hideDeductions = () => {
        document.getElementById("add-deductions").style.visibility = "hidden";
    }


    const decrementMonth = (e) => {
        setMemberAmountforMonth(0);
        var date = month;
        date.subtract(1, 'month');
        console.log(date);
        setMonth(date);
        var date = month.format('YYYY-MM-DD');
        fetchMemberMonthlyRecords(member.id, date);
        fetchMemberAmountForMonth(member.id, month);
        fetchMemberDeductionsSum(month);
        showDeductions();
        setInfo("Showing data records for member " + member.id + " for " + month.format('YYYY-MM'));
    };
    const update = (e, f) => {
        setDay(e);
        showAmountEditor();
    }
    const showAmountEditor = () => {
        document.getElementById("amountEditor").style.visibility = "visible";
    };
    const hideAmountEditor = () => {
        document.getElementById("amountEditor").style.visibility = "hidden";
    };
    const onMemberIdChange = async (e) => {
        hideAmountEditor();
        setMemberAmountforMonth(0);
        setRecords(0);
        setMember([]);
        setError("");
        setDeductionsSum(0);
        setMemberId(e.target.value);
        //setMember(e);
        if (memberId === "") {
//setRecords([]);
// setMemberId(0);
        }


    }
    const fetchData = async () => {
        var date = month.format('yyyy-MM-DD');
        fetchMemberDeductionsSum(month);

        {
            axios.get("/api/v1/member/" + tenant + "/" + memberId)
                    .then((response) => {
                        setMember(response.data);
                        setInfo("Showing data records for member " + memberId + " for " + month.format('YYYY-MM'));
                        setError("");
                        fetchMemberMonthlyRecords(memberId, date);
                        fetchMemberAmountForMonth(memberId, month);
                    }).catch((err) => {
                setError("Member " + memberId + " does not exist");
                setInfo("Showing data records for member " + memberId + " for " + month.format('YYYY-MM'));
                setMember("");
                setRecords(0);
            });
           

        }
    }
    const fetchMemberDeductionsSum = (date) => {
        axios.get("/api/v1/deductions/" + tenant + "/" + memberId + "/" + date.format('YYYY-MM-DD') + "/sum")
                .then((response) => {
                    setDeductionsSum(response.data);

                }).catch((err) => {
            if (err.response.status === 403) {
                setPermissionError(true);
            }

            //setMember("");
        });
    }
    const fetchMemberMonthlyRecords = async (member, date) => {
        axios.get("/api/v1/records/" + tenant + "/" + member + "/" + date)
                .then((response) => {

                    setRecords(response.data);
                    setRecord(0);
                    setInfo("Showing data records for member " + memberId + " for " + month.format('YYYY-MM'));
                }).catch((err) => {
            if (err.response.status === 403) {
                setPermissionError(true);
            }
            setRecords([]);
            //setMember("");
        });
        ;
    }
    const fetchMemberAmountForMonth = (member, month) => {
        axios.get("/api/v1/records/" + tenant + "/" + member + "/" + month.format("YYYY-MM-DD") + "/individual")
                .then((response) => {

                    setMemberAmountforMonth(response.data);
                }).catch((err) => {
            if (err.response.status === 403) {
                setPermissionError(true);
            }

//setMember("");
        });
        ;
    }
    const updateRecord = (e) => {
        var date = month;
        date.date(day);
        var payLoad = {amount: record, date: date.format("YYYY-MM-DD")}
        axios.post("/api/v1/records/" + tenant + "/" + member.id, payLoad)
                .then((response) => {
                    hideAmountEditor();
                    fetchMemberMonthlyRecords(member.id, date.format("YYYY-MM-DD"));
                    fetchMemberAmountForMonth(member.id, month);
                }).catch((err) => {

        });
        ;
    }
    const setAmount = (e) => {
        console.log(e.target.value);
        setRecord(e.target.value);
    }

    const deleteRecord = (e) => {
        var date = month;
        date.date(day);
        axios.delete("/api/v1/records/" + tenant + "/" + member.id + "/" + date.format("yyyy-MM-DD"))
                .then((response) => {
                    hideAmountEditor();
                    fetchMemberMonthlyRecords(member.id, date.format("YYYY-MM-DD"));
                    fetchMemberAmountForMonth(member.id, month);
                }).catch((err) => {

        });
        ;
    }


    return(
            <div class="relative ">
            
                <Nav/>
            
                <div class="absolutfe hidden center-left bg-teal padding-md pointer border-right-rad-md text-white">
                    <span class="material-symbols-outlined">chevron_right</span> 
                </div>
            
                <div class="content-box relative ">
                    <div class="right-top-2 absolute text-white bg-orange padding-sm font-sm pointer hidden">{tenantname} {user} {moment().format("MMMM DD YYYY ")}</div>
                    <div class="hiddend absolute-center  flex-vertical relative  border-1 font-sm" id="amountEditor">
                        <div class="close top-left absolute bg-blue border-rad-md text-white padding-sm pointer" onClick={hideAmountEditor}>X</div>
                        <div>
                            <span class="margin-sm badge">  {month.format('MMMM')} {day}</span>
                        </div>
            
                        <div>
            
                        </div>
                        <input type="text" class="border-1 margin-top-xsm  padding-sm margin-sm" onChange={setAmount} value={record} value={record}/>
            
                        <div class="flex-vertical padding-md">
                            <button class="bg-red border-none padding-sm text-white border-rad-sm pointer text-gray" onClick={() => deleteRecord()}>Delete</button>
                            <button class="bg-blue border-none padding-sm margin-sm text-white border-rad-sm pointer" onClick={() => updateRecord()}>Update/Insert</button>
                        </div>
                    </div>
                    <div class="w-100">
                        <div class=" border-rad-sm absolute top-right info padding-md z-index-high">
                            <span class="material-symbols-outlined  top-center-center float-right text-white pointer padding-xsm bg-green border-rad-md" >info</span> 
                            <div class="info-child text-white ">
                                <span class="Mulish font-sm">Data shown</span>
                                <div class="flex-vertical font-sm">
                                    <div class="flex-horizontal">
                                        {info}
                                    </div>
                                </div>
                            </div>                          
                        </div></div>
                    <div class="w-10 absolute bg-whited bg-gray  h-55 "> 
                        <span class="text-white Mulish absoludte padding-md bg-blue">Records</span>
                        <div class="padding-sm flex-horizontald border-rad-sm center margin-md bg-gray-2">
                            <input required type="text" class="  bg-gray-2 border-none padding-sm center w-75 border-rad-sm  text-white  " onChange={onMemberIdChange}/>
                            <span class="material-symbols-outlined bg-orange border-rad-sm  padding-sm text-white pointer " onClick={() => fetchData()}>Chevron_right</span>                    
                        </div>
            
                        <div class="padding-md">
                            <div class="fixed-variable  margin-sm">
                                <div class="text-gray">
                                    <span class="material-symbols-outlined icon badge">person</span>
                                </div>
                                <div class="text-white padding-md font-sm item">{member.firstName} {member.secondName}</div>
                            </div>
                            <div class="fixed-variable margin-sm">
                                <div class="text-gray">
                                    <span class="material-symbols-outlined badge icon">train</span>
                                </div>
                                <div class="text-white padding-md font-sm item">{member.identityNo}</div>
                            </div>
                            <div class="fixed-variable margin-sm">
                                <div class="text-gray">
                                    <span class="material-symbols-outlined icon badge">phone</span>
                                </div>
                                <div class="text-white padding-md item font-sm">{member.phone}</div>
                            </div>
                            <div class="fixed-variable margin-sm">
                                <div class="text-gray">
                                    <span class="material-symbols-outlined icon badge">map</span>
                                </div>
                                <div class="text-white padding-md item font-sm">{member.address}</div>
                            </div>
                            <div class="fixed-variable margin-sm">
                                <div class="text-gray">
                                    <span class="material-symbols-outlined icon badge">grocery</span>
                                </div>
                                <div class="text-white padding-md item font-sm">{memberAmountForMonth}Kg</div>
                            </div>
                        </div>
                        <div class="font-sm pointer mulish font-bold text-white z-index-high center bg-yellow-variant bg-gray padding-md border-rad-sm margin-md"><span class="material-symbols-outlined">money</span>Deductions <span class="material-symbols-outlined icon pointer badge bg-green text-bold float-right font-sm">KES {deductionsSum}</span></div>
                        {error ?
                            <div class="font-sm  mulish font-bold text-white z-index-high top-center-center center bg-yellow-variant padding-md border-rad-sm margin-md"><span class="material-symbols-outlined">gpp_maybe</span>  {error} {member}</div> : <></>}
                        <div class="absolute left-bottom" onClick={visibilityToggle} ><span class="material-symbols-outlined icon pointer badge bg-green text-bold">add</span></div>               
                    </div>
                    {!permissionError ?
                            <div class=" float-left ">
                                {records.length > 0 ?
                                                <div class=" w-9d0 left-md absoluted relative   float-leftd">
                                    
                                                    <div  class="absolute Mulish text-green h-55 bg-white w-100 z-index-high" id="add-deductions">
                                    <div class="month text-md text-bold text-white padding-md ">
                                                        <select class="bg-gray margin-sm  border-rad-sm margin-sm text-white padding-md border-none">
                                                            <option>{month.format('YYYY')}</option>
                                                        </select>
                                                        <span class=" badge font-sm margin-sm"> {month.format('MMMM')}</span>
                                                    </div>
                                                        <div class="top-right absolute bg-orange padding-sm border-rad-md pointer center text-white" onClick={hideDeductions}><span class="material-symbols-outlined font-sm font-bold">close</span></div>                                                    
                                    
                                                        <div class='bg-white-snow border-1 margin-md h-40 overflow-scroll padding-md  padding-md'>
                                                            <table class='padding-sm table  overflow-scroll w-100 text-gray '>
                                                                <tr class=' border-rad-md  Mulish border-rad-md font-sm bg-green '> <th class="">Item</th> <th>Amount</th> <th>Cost</th><th>Date</th><th>Action</th><th class="bg-green">Total</th></tr>
                                                                {deductions.map(i =>
                                                                            <tr class='Mulish bg-yellow padding-sm border-rad-md text-gray font-sm'><td>{i.item}</td><td>{i.quantity}</td><td>{i.cost}</td><td>{i.date[0]}-{i.date[1]}-{i.date[2]}</td> <td><button class="bg-red border-none margin-sm text-white pointer centerd ">Delete</button><button class='bg-green border-none text-white pointer centerd msrgin-sm'>Update</button></td> <td class=""></td></tr>)}
                                    
                                                                <tr class='Mulish bg-nb text-white font-sm'><td ></td><td></td><td></td><td></td><td></td> <td class="margin-sm padding-sm bg-green">KES {deductionsSum}</td> </tr> 
                                                            </table>
                                    
                                                        </div>                                                   
                                                        <form onSubmit={submit} class="h-50">                                                   
                                                            <div class="flex-vertical margin-md">
                                                                <span class="font-sm ">Item</span>
                                                                <input required type="text" class="border-1 border-rad-sm padding-md w-9d0" onChange={onItemChange} value={item}/>
                                                            </div>  
                                                            <div class="flex-vertical margin-md">
                                                                <span class="font-sm ">Quantity</span>
                                                                <input required type="text" class="border-1 border-rad-sm padding-md w-9d0" onChange={onQuantityChange} value={quantity}/>
                                                            </div> 
                                                            <div class="flex-vertical margin-md">
                                                                <span class="font-sm ">Cost*</span>
                                                                <input required type="text" class="border-1 border-rad-sm padding-md w-9d0" onChange={onCostChange} value={cost}/>
                                                            </div> 
                                                            <div class="absoludte bottom-lefrt margin-md"><button type="submit" class="border-none bg-green padding-sm pointer text-white" >save</button></div>
                                                        </form>
                                                    </div>
                                                    <button class="btn-prev absolute border-rad-md border-none bg-white menu-item-1 z-index-high" onClick={ (e) => decrementMonth()}>
                                                        <span class="material-symbols-outlined ">Chevron_left</span>
                                                    </button>
                                                    <div class="month text-md text-bold text-white padding-md ">
                                                        <select class="bg-gray margin-sm  border-rad-sm margin-sm text-white padding-md border-none">
                                                            <option>{month.format('YYYY')}</option>
                                                        </select>
                                                        <span class=" badge font-sm margin-sm"> {month.format('MMMM')}</span>
                                                    </div>
                                                    <button class="btn-next border-rad-md absolute z-index-high bg-white border-none menu-item-1" onClick={(e) => incrementMonth()}>
                                                        <span class="material-symbols-outlined ">Chevron_right</span>
                                                    </button>
                                                    <div class="hidden grid hidden">
                                                        {records.map((record, k) =>
                                                                    <>
                                                                    {record.amount === 0 ? <div class="date bg-white relative" onClick={() => update(k + 1, record.id)}>
                                                                        <div class="font-bold Ubuntu">{record.amount}</div>
                                                                        <div class="font-xsm  absolute">{record.date[2]}</div>
                                                                    </div> : <div class="date-2 bg-white relative" onClick={() => update(k + 1)}>
                                                                        <div class="font-bold Ubuntu">{record.amount}</div>
                                                                        <div class="font-xsm  absolute">{record.date[2]}</div>
                                                                    </div>}
                                                                    </>)}
                                    
                                    
                                                    </div><div class="w-100  ">
                                                        <MemberRecords data={records}/>
                                                    </div> 
                                                </div> : <div class="left-md text-center text-white centerpage">No results to show!</div>}
                    
                            </div> : <div class="center text-crimson bg-orange padding-md font-sm left-md text-white">You do not have permission to view member records</div>}
                </div>
            </div>
            );
}


;
export default Records;
