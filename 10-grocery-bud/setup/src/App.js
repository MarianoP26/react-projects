import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'));
  }
  else{
    return [];
  }
};

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type:'',
  });

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list));
  },[list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      showAlert(true, 'danger', 'Please enter a value');
    }
    else if(name && isEditing){
      setList(list.map((item)=>{
        if(item.id === editID){
          return {...item, title: name};
        }
        return item;
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'successfully edited the item');
    }
    else{
      showAlert(true, 'success', 'item added succesfully to the list')
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('');
    }
  } 

  const showAlert = (show=false, type="", msg='') => {
    setAlert({show, type, msg}); //show: show, type: type, msg: msg
  };

  const clearList = () => {
    showAlert(true, 'danger', 'You succesfully cleared the list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true,'danger','Item removed');
    setList(list.filter((item)=> item.id !== id));
  };

  const editItem = (id) => {
    const selectedItem = list.find((item) => item.id == id);
    setIsEditing(true);
    setEditID(id);
    setName(selectedItem.title);
  };


  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
      <h3>Grocery bud</h3>
      <div className="form-control">
        <input type="text" className="grocery" placeholder="e.g. eggs"
        value={name} onChange={(e)=>setName(e.target.value)}/>
        <button type="submit" className="submit-btn">
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && 
      <div className="grocery-container">
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button className="clear-btn" onClick={clearList}>
        clear items
      </button>
    </div>
    }
    
  </section>
}

export default App
