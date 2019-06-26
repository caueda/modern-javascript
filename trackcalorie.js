// Storage Controller

// Item Controller
const ItemCtrl = (function(){
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    const data = {
        items : [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 400}
        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems : function(){
            return data.items;
        },
        logData: function(){
            return data;
        },
        addItem: function(name, calories){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length-1].id + 1;
            } else {
                ID = 0;
            }
            let newItem = new Item(ID, name, calories);
            
            data.items.push(newItem);
            
            return newItem;
        }
    }
})();
// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList : '#item-list',
        addBtn : '.add-btn',
        itemInputName : '#item-name',
        itemInputCalories : '#item-calories'
    }

    getItemInput = function(){
        return {
             name: document.querySelector(UISelectors.itemInputName).value,
             calories: document.querySelector(UISelectors.itemInputCalories).value
        }
    }

    return {
        populateItemList: function(items){
            let html = '';
            items.forEach(item => {
                html += 
                `<li id="item-${item.id}" class="collection-item">
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function(){
            return UISelectors;
        },
        getItemInput : getItemInput
    }
})();
// App Controller
const App = (function(ItemCtrl, UICtrl){
    //Load event listeners
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);        
    }
    //Add Item submit
    const itemAddSubmit = function(e){
        let input = UICtrl.getItemInput();
        if(input.name !== '' && input.calories !== ''){
            //Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        } else {

        }
        
        e.preventDefault();
    }

    return { 
        init: function(){
            loadEventListeners();            
            const items = ItemCtrl.getItems();
            UICtrl.populateItemList(items);
        }
    }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();