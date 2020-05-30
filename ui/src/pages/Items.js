import React from 'react';
// import { Plugins } from '@capacitor/core';
import config from '../config';
import AuthService from '../auth/AuthService';
import { Link } from 'react-router-dom';
import { 
  IonHeader,
  IonContent,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonTitle,
  IonButton,
  IonList,
  IonModal,
  IonRow,
  IonCol,
  IonItemDivider,
  IonInput,
  IonToast,
  IonLoading
} from '@ionic/react';
import { trashOutline, addCircleOutline, cloudUploadOutline, createOutline } from 'ionicons/icons';

// const { Geolocation } = Plugins;

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // coords: null,
      showModal: false,
      showToast: false,
      required_items: [],
      newItemName: '',
      newItemQty: '',
      editItemIndex: -1,
      saveBtnEnabled: false,
      loggedIn: false,
      showLoading: true
    };
    this.domain = config.url;
    this.Auth = new AuthService();
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showToast = this.showToast.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addOrModifyItem = this.addOrModifyItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveData = this.saveData.bind(this); 
    this.hideLoading = this.hideLoading.bind(this);
    this.pageRef = React.createRef();
  }

  async componentDidMount() {
    // Geolocation.watchPosition({}, (position, err) => {
    //   if (!err) {
    //     this.setState({coords: position.coords});
    //     console.log('mycoords: ', this.state.coords);
    //   }
    // })
    let loggedIn = await this.Auth.loggedIn();
    this.setState({
      loggedIn: loggedIn
    });
    try{
      const res = await this.Auth.fetch(`${this.domain}/user/profile`, {
        method: 'GET'
      });
      if (res.status === 401) return this.setState({loggedIn: false, showLoading: false});
      return this.setState({ required_items: res.user.required_items, showLoading: false });
    } catch(e) {
      this.setState({
        loggedIn: false,
        showLoading: false
      });
    }
    
    // const position = await Geolocation.getCurrentPosition();
    // console.log(position);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  addOrModifyItem(e, editItemIndex){
    e.preventDefault();
    // Edit
    if(editItemIndex > -1) {
      let reqItems = this.state.required_items;
      reqItems.splice(editItemIndex, 1, {
        item_name: this.state.newItemName,
        item_quantity: this.state.newItemQty
      });
      this.setState({
        required_items: reqItems,
        saveBtnEnabled: true
      });
    } else {
      // Add
      this.setState({
        required_items: [
          ...this.state.required_items,
          { item_name: this.state.newItemName, item_quantity: this.state.newItemQty }
        ],
        saveBtnEnabled: true
      });
    }
    this.hideModal();
    this.showToast();
  }

  hideLoading() {
    this.setState({
      showLoading: false
    })
  }

  deleteItem(index) {
    let tmp = this.state.required_items;
    if (index > -1) tmp.splice(index, 1);
    this.setState({
      required_items: tmp,
      saveBtnEnabled: true
    });
    this.hideModal();
  }

  async saveData() {
    this.setState({showLoading: true})
    try{
      const res = await this.Auth.fetch(`${this.domain}/user/profile`, {
        method: 'PUT',
        body: JSON.stringify({
          required_items: this.state.required_items
        })
      });
      if (res.status === 401) return this.setState({loggedIn: false, showLoading: false, saveBtnEnabled: false});
      return this.setState({ required_items: res.user.required_items, showLoading: false, saveBtnEnabled: false });
    } catch(e) {
      this.setState({
        loggedIn: false,
        showLoading: false,
        saveBtnEnabled: false
      });
    }
  }

  showToast() {
    this.setState({
      showToast: true
    })
  }

  hideToast() {
    this.setState({
      showToast: false
    })
  }

  showModal(index) {
    if(index > -1) {
      this.setState({
        editItemIndex: index,
        newItemName: this.state.required_items[index].item_name,
        newItemQty: this.state.required_items[index].item_quantity
      })
    };
    this.setState({
      showModal: true
    })
  };

  hideModal() {
    this.setState({
      showModal: false,
      newItemName: '',
      newItemQty: '',
      editItemIndex: -1
    })
  };

  render() {
    const { showModal, required_items, showToast, editItemIndex, saveBtnEnabled, loggedIn, showLoading } = this.state;
    // return <div>Hello , <Link to='/login'>Login</Link></div>;
    if(!loggedIn) {
      return (
        <div style={{textAlign: 'center'}}>
          <img src="assets/img/login.png" style={{maxHeight: '60%', maxWidth: '60%', margin: '20px 0'}} alt="" />
          <h2> Please login to continue</h2>
          <Link to='/login'>
            <IonButton style={{margin: '20px'}} expand="block">Login</IonButton>
          </Link>
        </div>
      )
    }

    const itemList = required_items.map((item, index) => {
      return (
        <IonItemSliding key={`item-${index}`}>
          <IonItem button onClick={() => this.showModal(index)}>
            <div style={{height: '55px', width: '55px', margin: '10px 10px 10px 0', overflow: 'hidden', borderRadius: '6px'}}>
              <img src='/assets/img/item.png' alt="Item" />
            </div>
          
            <IonLabel>
              <h2>{item.item_name}</h2>
              <p>Qantity: {item.item_quantity}</p>
            </IonLabel>
          </IonItem>
          <IonItemOptions>
            <IonItemOption onClick={() => this.deleteItem(index)} color="danger">
              <IonIcon slot="end" icon={trashOutline} />
              Delete
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      )
    });

    const modal = (
      <IonModal
        swipeToClose={true}
        isOpen={showModal}
        onDidDismiss={() => this.hideModal()}
        presentingElement={this.props.pageRef.current}
      >
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle size="large"> {editItemIndex > -1 ? 'Edit Item' : 'Add Item' }</IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={() => this.hideModal()}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen={true}>
          <form onSubmit={(e)=>this.addOrModifyItem(e, editItemIndex)}>
            <IonList>
              <IonItemDivider></IonItemDivider>
              <IonItem>
                <IonLabel position="floating">Item Name*</IonLabel>
                <IonInput
                  value={this.state.newItemName}
                  name='newItemName'
                  placeholder="Milk, Sugar..."
                  onIonChange={e => this.handleChange(e)}
                  required={true}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Item Quantity*</IonLabel>
                <IonInput
                  value={this.state.newItemQty}
                  name='newItemQty'
                  placeholder="2 Pack, 500 gms.."
                  onIonChange={e => this.handleChange(e)}
                  required={true}
                />
              </IonItem>
            </IonList>
            { editItemIndex  > -1 ? (
              <IonRow>
                <IonCol size='6'>
                  <IonButton expand="block" type='submit'>
                    Update <IonIcon slot="end" icon={createOutline} />
                  </IonButton>
                </IonCol>
                <IonCol size='6'>
                  <IonButton expand="block" color='danger' onClick={()=> this.deleteItem(editItemIndex)}>
                    Delete <IonIcon slot="end" icon={trashOutline} />
                  </IonButton>
                </IonCol>
              </IonRow>
            ) : (
              <IonButton expand="block" type='submit'>
                Add <IonIcon slot="end" icon={addCircleOutline} />
              </IonButton>
            )}
            
          </form>
        </IonContent>
      </IonModal>
    )
    return (
      <>
        {required_items.length === 0 ?
        <div style={{textAlign: 'center'}}>
          <img src="assets/img/empty.png" style={{maxHeight: '60%', maxWidth: '60%', margin: '20px 0'}} alt="" />
          <h2> Add something to your list</h2>
        </div> : itemList}
        {modal}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => this.hideToast()}
          message="Item added. When you're done, press Save to publish"
          duration={1000}
          position="top"
        />
      

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonRow>
            <IonCol size={saveBtnEnabled ? "6" : "12"}>
              <IonButton onClick={() => this.showModal(-1)} expand="block">
                Add
                <IonIcon slot="end" icon={addCircleOutline} />
              </IonButton>
            </IonCol>
            {saveBtnEnabled && 
              <IonCol size="6">
                {/* <IonButton style={{ '--background': '#fadcdc', '--color': 'red' }} expand="block" fill="outline">Delete </IonButton> */}
                <IonButton onClick={() => this.saveData()} expand="block" color="success">
                  Save
                  <IonIcon slot="end" icon={cloudUploadOutline} />
                </IonButton>
              </IonCol>
            }
          </IonRow>
        </IonToolbar>
      </IonFooter>
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => this.hideLoading()}
        message={'Please wait...'}
      />
      </>
    )
  }
}

export default Items;