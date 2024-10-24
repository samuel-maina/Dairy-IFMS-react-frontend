import Nav from './Nav';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import axios from 'axios';
const tenant = localStorage.getItem("tenant");
const Members = () => {
    const[firstname, setFirstname] = useState("");
    const[secondname, setSecondname] = useState("");
    const[membershipNo, setMembershipNo] = useState("");
    const[residency, setResidency] = useState("");
    const[nationalID, setNationalID] = useState("");
    const[phone, setPhone] = useState("");
    const[members, setMembers] = useState([]);

    const hideMemberRegistration = () => {
        document.getElementById("registermember").style.visibility = 'hidden';
    };
    const registerMember = () => {
        document.getElementById("registermember").style.visibility = 'visible';
    }

    const onFirstnameChange = (e) => {
        setFirstname(e.target.value);
    };

    const onSecondnameCHange = (e) => {
        setSecondname(e.target.value);
    };

    const onMembershipChange = (e) => {
        setMembershipNo(e.target.value);
    };

    const onResidencyChange = (e) => {
        setResidency(e.target.value);
    };

    const onNationalIDChange = (e) => {
        setNationalID(e.target.value);
    };

    const onPhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const init = () => {
        setPhone("");
        setNationalID("");
        setResidency("");
        setMembershipNo("");
        setSecondname("");
        setFirstname("");


    };
    useEffect(() => {
        loadMemberInformation();
    }, []);
    const loadMemberInformation = () => {
        axios.get("/api/v1/member/" + tenant+"/")
                .then((response) => {
                    setMembers(response.data);
                }).catch((err) => {
        });
    };
    const submit = (event) => {
        event.preventDefault();
        var member = {address: residency, firstName: firstname, secondName: secondname, id: membershipNo, phone: phone, identityNo: nationalID}
        axios.post("/api/v1/member/" + tenant, member)
                .then((response) => {
                    init();
                    loadMemberInformation();
                    swal("", "", "success");

                }).catch((err) => {
        });
    }
    return(
            <div class="relative">
                <Nav/>
                <div class="absolutfe hidden center-left bg-teal padding-md pointer border-right-rad-md text-white">
                    <span class="material-symbols-outlined">chevron_right</span> 
                </div>
            
                <div class="content-box relative padding-md">
            
                    <div class=" bg-gray" >
                        <span class="text-white absolute Mulish padding-md bg-blue absolute top-center">MEMBERS</span>
                        <div class="hidden h-55 absolute bg-gray left-verktical-menu-2">
                            <div class="menu-list margin-md margin-top-md">
                                <div>
                                    <div class="menu-item-1 w-10 padding-md"> 
                                        <span class="material-symbols-outlined">person_search</span>
                                        Search
                                    </div>
                                </div>
                                <div class="menu-item-1 w-10 padding-md">
                                    <span class="material-symbols-outlined">how_to_reg</span>
                                    Register
                                </div>
                                <div class="menu-item-1 w-10 padding-md">
                                    <span class="material-symbols-outlined">subject</span>
                                    View
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden" id="search_member_details">
                        <div class=" h-55 hidden center bg-blue left-md hidden" >
                            <div>
                                <div class="text-white padding-mdd text-center text-lg Open-sans font-bold">  Search member information</div>
                                <div class=" padding-mdd margin-md text-white Mulish">Enter name, member number, id or location to search</div>
            
                                <form>
                                    <input type="text" class="border-1  padding-md w-9d0 margin-md"/>
                                    <button type="submit" class="padding-md border-rad-sm">find</button>
                                </form>
                            </div>
            
                        </div>
                    </div>
            
            
            
                    <div class=" w-250 hidden absolute z-index-high right-0 center"  id="registermember">
                        <div class=" h-55 relative  bg-white border-rad-md left-md ">
                            <div>
            
            
                                <form class=" text-gray font-sm relative w-250" onSubmit={submit}>
                                    <div class="top-right absolute bg-orange padding-sm border-rad-md pointer text-white" onClick={hideMemberRegistration}><span class="material-symbols-outlined font-md font-bold">close</span></div>
                                    <div class="flex-vertical">
                                        <div class="flex-vertical">
                                            First name
                                            <input required type="text" class="border-1 border-rad-sm  padding-md w-9d0 margin-md" value={firstname} onChange={onFirstnameChange}/>
                                        </div>
                                        <div class="flex-vertical">
                                            Second Name
                                            <input required type="text" class="border-1 border-rad-sm padding-md w-9d0 margin-md"value={secondname} onChange={onSecondnameCHange}/>
                                        </div>
                                        <div class="flex-vertical">
                                            Membership No.
                                            <input required type="text" class="border-1 border-rad-sm padding-md w-9d0 margin-md" value={membershipNo} onChange={onMembershipChange}/>
                                        </div>
                                        <div class="flex-vertical float-left">
                                            Residency
                                            <input required type="text" class="border-1 border-rad-sm padding-md w-9d0 margin-md" value={residency} onChange={onResidencyChange}/>
                                        </div>
                                        <div class="flex-vertical">
                                            National Id No.
                                            <input required type="text" class="border-1 border-rad-sm padding-md w-9d0 margin-md"value={nationalID} onChange={onNationalIDChange}/>
                                        </div>
                                        <div class="flex-vertical">
                                            Phone No.
                                            <input required type="text" class="border-1 border-rad-sm padding-md w-9d0 margin-md" value={phone} onChange={onPhoneChange}/>
                                        </div>
                                    </div>
                                    <button type="submit" class="padding-sm border-rad-sm border-none menu-itemf bg-orange text-white pointer ">Register</button>
                                </form>
                            </div>
            
                        </div></div>
            
                    <div class="z-index-high " id="member_detailss">
                        <div class="right-top z-index-high">
                            <div class=" margin-md ">
                                <div>
                                    <div class="menu-item-1 border-rad-sm bg-orange text-white padding-md"> 
                                        <span class="material-symbols-outlined">person_search</span>
            
                                    </div>
                                </div>
                                <div class="menu-item-1  padding-md bg-orange text-white" onClick={registerMember}>
                                    <span class="material-symbols-outlined">how_to_reg</span>
            
                                </div>
                                <div class="menu-item-1  padding-md bg-orange text-white">
                                    <span class="material-symbols-outlined">subject</span>
            
                                </div>
                            </div>
                        </div>
                        <div class=" h-55   centedr overflow-scroll  relative" i>
            
                            <div class="padding-md ">
                                <div class="text-gray padding-md text-center text-lg hidden Open-sans font-bold">  Member details</div>
                                <table class="table hidden  font-bold Open-sans">
                                    <tr class="text-white border-1 "><th>Name</th><th>Membership No</th><th>Residency</th><th>Id No.</th><th>Phone</th></tr>
                                    {members.map(member =>
                                <tr class="font-sm  padding-sm"><td class="text-orange">{member.firstName} {member.secondName}</td><td class="badge">{member.id}</td> <td>{member.address}</td> <td>{member.identityNo}</td><td>{member.phone}</td></tr>)}
                                </table>
                                <div class="fixed-lg font-sm text-white"> {members.map(member => <div class="padding-md pointer bg-gray relative">
                                        <div class="flex-horizontal fixed padding-sm"> <span>Name:</span> {member.firstName} {member.secondName}</div>  
                                        <div class="flex-horizontal fixed padding-sm"> <span>Residency:</span> {member.address}</div>
                                        <div class="flex-horizontal fixed padding-sm"> <span>Phone:</span> {member.phone}</div>
                                        <div class="flex-horizontal fixed padding-sm"> <span>ID:</span> {member.identityNo}</div>
                                        <span class="badge-2 absolute top-left border-rad-sm Open-sans">{member.id}</span>
                                    </div>)}</div>
                                <button class="btn-prev absolute border-rad-md border-none bg-white menu-item-1 hidden ">
                                    <span class="material-symbols-outlined ">Chevron_left</span>
                                </button>
                                <button class="btn-next border-rad-md absolute bg-white border-none menu-item-1 hidden">
                                    <span class="material-symbols-outlined ">Chevron_right</span>
                                </button>
                            </div>
            
                        </div>
                    </div>
                </div>
            
            </div>
            );



}
;
export default Members;
