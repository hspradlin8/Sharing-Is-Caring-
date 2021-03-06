// import React, { Component } from "react";
// import APIManager from "../../modules/APIManager";
// import { Button, ModalBody, ModalFooter } from "reactstrap";


// class OtherClosetEditForm extends Component {
//     //set the initial state
//     state = {
//         name: "",
//         quality: "",
//         color: "",
//         type: "",
//         size: "",
//         description: "",
//         loadingStatus: true,
//         modal: false,
//         activeUser: parseInt(sessionStorage.getItem("userId"))
//     };

//     handleFieldChange = evt => {
//         const stateToChange = {};
//         stateToChange[evt.target.id] = evt.target.value;
//         this.setState(stateToChange);
//     };

//     updateExistingItem = evt => {
//         evt.preventDefault();
//         this.setState({ loadingStatus: true });
//         const editedItem = {
//             id: parseInt(this.props.itemId),
//             name: this.state.itemName,
//             quality: this.state.quality,
//             color: this.state.color,
//             size: this.state.size,
//             description: this.state.description
//         };
//         APIManager.update("items", editedItem)
//             .then(() => { this.props.getData() }
//             );
//     }


//     componentDidMount() {
//         return APIManager.get("items", this.props.itemId)
//             .then(
//                 item => {
//                     this.setState({
//                         itemName: item.name,
//                         itemQuality: item.quality,
//                         itemColor: item.color,
//                         itemSize: item.size,
//                         itemDescription: item.description,
//                         loadingStatus: false,
//                     });
//                 });
//     };

//     render() {
//         return (
//             <>
//                 <ModalBody>
//                     <form>
//                         <fieldset>
//                             <div className="formgrid">
//                                 <label htmlFor="itemName">Item Name</label>
//                                 <input
//                                     type="text"
//                                     required
//                                     className="form-control"
//                                     onChange={this.handleFieldChange}
//                                     id="itemName"
//                                     value={this.state.itemName}
//                                 />

//                                 <label htmlFor="quality">Quality: </label>
//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                  id="itemQuality"
//                                 value={this.state.itemQuality}
//                             />
//                             <label htmlFor="venue">Color: </label>
//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="itemColor"
//                                 value={this.state.itemColor}
//                             />
//                             <label htmlFor="venue">Size: </label>
//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="itemSize"
//                                 value={this.state.itemSize}
//                             />
//                             <label htmlFor="venue">Type: </label>
//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="itemType"
//                                 value={this.state.itemType}
//                             />
//                             <label htmlFor="venue">Description: </label>
//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="itemDescription"
//                                 value={this.state.itemDescription}
//                             />
//                             </div>
//                             <div className="alignRight"></div>
//                         </fieldset>
//                     </form>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button
//                         type="button"
//                         disabled={this.state.loadingStatus}
//                         onClick={evt => {
//                             this.updateExistingItem(evt);
//                             this.props.toggle();
//                         }}
//                         className="btn btn-primary"
//                     >
//                         Submit
// 					</Button>
//                     <Button className="cancel" onClick={this.props.toggle}>
//                         Cancel
// 					</Button>
//                 </ModalFooter>
//             </>
//         );
//     }
// }


// export default OtherClosetEditForm;