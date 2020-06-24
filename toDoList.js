window.addEventListener('load', function () {

    const ToDoList = function(parent = document.body) {

        function createElm(className = '', tagName = 'div') {
            let elm = document.createElement(tagName);

            if(className) {
                elm.classList.add(className);
            }
            return elm;
        }

        const ItemTask = function (parentForTask, text = '') {
            if (!parentForTask) return;

            let parentForTaskElm = parentForTask,
                textElm = text;

            const itemTaskHtml = `
                     <div class="item-task-check">
                        <span></span>
                     </div>
                     <div class="item-task-text"></div> 
                `,
                selectorForText = '.item-task-text',
                checkElm = '.item-task-check span',
                itemTask = 'item-task';

            function checkTask() {
                this.closest('.' + itemTask).classList.toggle('checked');
            }

            function generate(){
                const itemTaskElm = createElm(itemTask);
                parentForTaskElm.append(itemTaskElm);
                itemTaskElm.insertAdjacentHTML('beforeend', itemTaskHtml);
                let textElm = itemTaskElm.querySelector(selectorForText);
                textElm.append(text);
                itemTaskElm.querySelector(checkElm).addEventListener('click', checkTask)
            }

            generate();
        }

        const newTask = function (parentForTask) {
            if(!parentForTask) return null;

            let parentForTaskElm = parentForTask;

            function generate(){
                const input = createElm('', 'input');
                input.placeholder = 'Type your task...';
                input.addEventListener('keydown', addTaskItem);
                return input;
            }

            function addTaskItem(event) {
                if(event.key == 'Enter') {
                   let value = this.value;
                    const item = new ItemTask(parentForTaskElm, value);
                    this.value = '';
                }
            }
            const input = generate();
            return input;
        }

        const container = createElm('toDoList-container'),
              toDoListHtml =  `
                    <div class="toDoList-container-header">
                        To Do List
                    </div>

                    <div class="toDoList-container-body">

                        <div class="toDoList-container-body-input"></div>

                        <div class="toDoList-container-body-list"></div>
                    </div>
            `
            parentForTask = '.toDoList-container-body-list',
            parentContainer = parent;

        function drow() {

            parentContainer.append(container);
            container.insertAdjacentHTML('beforeend', toDoListHtml);

            const inputNode = container.querySelector('.toDoList-container-body-input');
            const newTaskInout = new newTask(container.querySelector(parentForTask));
            inputNode.append(newTaskInout)
        }

        drow();
    }

    new ToDoList();
})