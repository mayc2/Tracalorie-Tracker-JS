// Storage Controller


// Item Controller
const ItemCtrl = (function(){
    // console.log('Item Controller');

    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structures / State
    const state = {
        items: [
            // {id: 0, name: "Steak Dinner", calories: 1200},
            // {id: 1, name: "Cookie", calories: 400},
            // {id: 2, name: "Eggs", calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // public methods
    return {
        logData: () => {
            return state;
        },
        getItems: () => {
            return state.items;
        },
        addItem: (name, calories) => {
            let ID;
            if(state.items.length > 0) {
                ID = state.items[state.items.length - 1].id + 1;
            } else {
                ID = 0
            }
            calories = parseInt(calories);

            newItem = new Item(ID, name, calories);
            state.items.push(newItem);
            state.totalCalories += calories;
            return newItem;
        },
        getTotalCalories: () => {
            // let total = 0;
            return state.totalCalories;
        }

    }
})();



// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    return {
        populateItemList: (items) => {
            let html = '';
            items.forEach(item => {
                html += `
                <li id='item-${item.id}1' class='collection-item'>
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li>`;
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: () => {
            return UISelectors;
        },
        getItemInput: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: (item) => {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        setTotal: (total) => {
            document.querySelector(UISelectors.totalCalories).innerHTML = total;
        },
        setAddState: () => {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        }

    }
})();



// App Controller
const App = (function(ItemCtrl, UICtrl){
    // Load Event Listeners
    const loadEventListeners = () => {
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    }

    // Add Item Submit
    const itemAddSubmit = (e) => {
        // Get form input from UI controller
        const input = UICtrl.getItemInput();

        if (input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);
            const total = ItemCtrl.getTotalCalories();
            console.log(total);
            UICtrl.setTotal(total);
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    // public methods
    return {
        init: () => {
            console.log('Initializing App...');
            UICtrl.setAddState();
            
            // Populate Item List
            const items = ItemCtrl.getItems();
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
                UICtrl.setTotal(ItemCtrl.getTotalCalories());
            }
            loadEventListeners();
        }
    }


})(ItemCtrl, UICtrl);

//Initializing App
App.init();