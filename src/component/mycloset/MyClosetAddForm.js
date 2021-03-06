import React, { Component } from "react";
import APIManager from "../modules/APIManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import Dropzone from "react-dropzone";
import request from "superagent";

const uploadPreset = 'clothesSwap';
const uploadURL = 'https://api.cloudinary.com/v1_1/dwx2mgkne/image/upload';

class MyClosetAddForm extends Component {


    //set the initial state
    state = {
        userId: sessionStorage.getItem("credentials"),
        itemName: "",
        qualityArray: [],
        quality: "",
        colorArray: [],
        color: "",
        type: "",
        typeArray: [],
        size: "",
        description: "",
        uploadURL: null,
        file: null,
        imageUrl: "",
        loadingStatus: true,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("credentials"))

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // react-dropzone to upload images
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // uploads the image to cloudinary, and sends a URL to the image back in its place
    handleImageUpload(file) {
        let upload = request.post(uploadURL)
            .field('upload_preset', uploadPreset)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                // console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    imageUrl: response.body.secure_url
                });
            }
        });
    }


    addItem = evt => {
        evt.preventDefault();
        this.toggle();
        //console.log(this.state)
        if (this.state.qualityId === "" || this.state.colorId === "" || this.state.typeId === "") {
            window.alert("Please input an Item");
        }
        else {
            this.setState({ loadingStatus: true });
            const addedItem = {
                userId: parseInt(this.state.userId),
                name: this.state.itemName,
                quality: parseInt(this.state.qualityId),
                type: parseInt(this.state.typeId),
                color: parseInt(this.state.colorId),
                size: this.state.size,
                description: this.state.description,
                imageURL: this.state.imageUrl

            };
            // window.alert(addedItem.name);

            APIManager.post("items", addedItem)
                .then(() => { this.props.getData() }
                );

        };


    }
    // drop down section
    componentDidMount() {
        APIManager.getAll("quality")
            .then((response) => {
                this.setState({
                    qualityArray: response
                })
            });
        APIManager.getAll("color")
            .then((response) => {
                // console.log(response)
                this.setState({
                    colorArray: response
                })
            });
        APIManager.getAll("type")
            .then((response) => {
                this.setState({
                    typeArray: response
                })
            })
    }

    render() {

        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
                </button>
        );
        return (

            <>

                <Button className="addItem" onClick={this.toggle}>
                    Add Item</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        Create Item
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="FileUpload">
                                    <Dropzone
                                        onDrop={this.onImageDrop.bind(this)}
                                        accept="image/*"
                                        multiple={false}>
                                        {({ getRootProps, getInputProps }) => {
                                            return (
                                                <div
                                                    {...getRootProps()}
                                                >
                                                    <input {...getInputProps()} /> ADD PICTURES:
                                                    {
                                                        <p>Upload Pictures</p>
                                                    }
                                                </div>
                                            )
                                        }}
                                    </Dropzone>

                                </div>
                                <div>
                                    {this.state.imageUrl === '' ? null :
                                        <div>
                                            <p>{this.state.name}</p>
                                            <img src={this.state.imageUrl} />
                                        </div>}

                                    <div className="formgrid">
                                        <label htmlFor="itemName">Item Name:</label>

                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            onChange={this.handleFieldChange}
                                            id="itemName"
                                            value={this.state.itemName}
                                        />


                                        <label htmlFor="itemSize">Size:</label>
                                        <input
                                            type="text"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="size"
                                            placeholder="Item Size"
                                        />
                                        <label>Quality</label>
                                        <Input type="select" id="qualityId" onChange={this.handleFieldChange}>
                                            {
                                                this.state.qualityArray.map(qual =>
                                                    <option key={qual.id} value={qual.id}>{qual.name}</option>
                                                )

                                            }
                                        </Input>
                                        <label>Colors</label>
                                        <Input type="select" id="colorId" onChange={this.handleFieldChange}>
                                            {
                                                this.state.colorArray.map(col =>
                                                    <option key={col.id} value={col.id}>{col.name}</option>
                                                )

                                            }
                                        </Input>
                                        <label>Type</label>
                                        <Input type="select" id="typeId" onChange={this.handleFieldChange}>
                                            {
                                                this.state.typeArray.map(ty =>
                                                    <option key={ty.id} value={ty.id}>{ty.name}</option>
                                                )

                                            }
                                        </Input>
                                        <label htmlFor="itemDescription">Description:</label>
                                        <input
                                            type="text"
                                            required
                                            onChange={this.handleFieldChange}
                                            id="description"
                                            placeholder="Item Description"
                                        />
                                    </div>
                                    <div className="alignRight">
                                        </div>
                                    </div>
                            </fieldset>
                            
                        </form>

                    </ModalBody>

                        <ModalFooter>
                            <Button
                                className="add"
                                onClick={this.addItem}
                            >
                                Add
						</Button>{" "}
                            <Button className="cancel" onClick={this.toggle}>
                                Cancel
						</Button>
                        </ModalFooter>
                </Modal>
            </>
                );
            }
        }
export default MyClosetAddForm;