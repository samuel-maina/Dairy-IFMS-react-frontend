import AdminNav from './AdminNav';
import React from 'react';
import ImageUpload from './ImageUpload';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button, Box } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import swal from 'sweetalert';
import axios from 'axios';
class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: "", contributor: "", about: "", articles: [], body: "", step: 0};
        this.handleContributorChange = this.handleContributorChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.submit = this.submit.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }
    nextStep() {
        this.setState({step: 1})
    }
    previousStep() {}
    handleBodyChange(event) {
        this.setState({body: event.target.value});
    }
    handleContributorChange(event) {
        this.setState({contributor: event.target.value});
    }
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    submit(event) {
        event.preventDefault();
        var blog = {title: this.state.title, contributor: this.state.contributor, body: this.state.body}
        axios.post("http://localhost:3030/api/v1/blog/article", blog)
                .then((response) => {
                    this.setState({title: ""});
                    this.setState({contributor: ""});
                    this.setState({about: ""});
                    swal("", "", "success");
                }).catch((err) => {
        });
    }
    render() {
        return(
                <div class="margin-top-md ">
                    <AdminNav/>
                    <div class="session">
                        <div class="margin-top-md"> 
                            <form onSubmit={this.submit} class="flex-vertical w-100 ">
                                <div class='grid-form-container'>
                                    <div  class='stepper'>
                                        <Stepper activeStep={this.state.step} orientation='vertical'>
                                            <Step>
                                                <StepLabel>Upload article details</StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>Upload Image</StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>Publish</StepLabel>
                                            </Step>
                                        </Stepper>
                                    </div>
                                    <div class='form flex-vertical'>
                                        <div class='flex-vertical absolute'>
                                            <span class="Mulish font-lg">Input Article Information</span>
                                            <p class='Poppins center font-sm'><span class="material-symbols-outlined">
                                                    pages
                                                </span>Article title</p>
                                            <input type='text' placeholder='Article title' class='input' value={this.state.title} onChange={this.handleTitleChange}/>
                                            <p class='Poppins center font-sm'><span class="material-symbols-outlined">
                                                    person
                                                </span>Author</p>
                                            <input type='text' placeholder='Article Author' class='input' value={this.state.contributor} onChange={this.handleContributorChange}/>
                                            <p class='Poppins center font-sm'><span class="material-symbols-outlined">
                                                    article
                                                </span>Body</p>
                                            <textarea class='input' value={this.state.body} onChange={this.handleBodyChange}></textarea>
                                            <div class='flags Poppins border-1'>
                                                <p class='center'> <span class="material-symbols-outlined">
                                                        strategy
                                                    </span>Tags</p>
                                                <div class='flex-horizontal'>
                                                    <button class='flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Technology</button>
                                                    <button class='flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Cars</button>
                                                    <button class='flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Entertainment</button>
                                                    <button class='flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Fashion</button>
                                                    <button class='flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Trends</button>
                                                    <button class='flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Sports</button>
                                                    <button class='flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Nature</button>
                                                </div>
                                            </div>
                                            <div class='flags Poppins border-1'>
                                                <p class='center'> <span class="material-symbols-outlined">
                                                        schema
                                                    </span>Sub-tags</p>
                                                <div class='flex-horizontal'>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Technology</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Cars</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Entertainment</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Fashion</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Trends</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Sports</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Nature</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Technology</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Cars</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Entertainment</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Fashion</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Trends</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Sports</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Nature</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Technology</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Cars</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Entertainment</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Fashion</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Trends</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Sports</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Nature</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Technology</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Cars</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Entertainment</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Fashion</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Trends</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Sports</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Nature</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Technology</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Cars</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Entertainment</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Fashion</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Trends</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Sports</button>
                                                    <button class='sub-flag font-xsm play center text-white'> <span class="material-symbols-outlined font-sm">
                                                            add
                                                        </span>Nature</button>
                                                </div>
                                                </div><div class="relative"> <ImageUpload/></div></div>
                
                                    </div>
                                </div> 
                
                            </form>
                            <button class='flag-button pointer font-xsm play center text-white float-right' onClick={(e) => this.nextStep()}> Next <span class="material-symbols-outlined">
                                    keyboard_double_arrow_right
                                </span></button>
                        </div> 
                
                    </div>
                
                </div>);
    }
}
;
export default Upload;

