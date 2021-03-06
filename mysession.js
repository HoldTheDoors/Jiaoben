if (sessionStorage.getItem("temp" + 0) == null) {
    var a = 0;
    var b = 0;
}
else {
    var a = sessionStorage.getItem("a");
    var b = sessionStorage.getItem("b");
}
localStorage.setItem("a", a);
window.onload = function () {
    function $(id) {
        return document.getElementById(id);
    }
    const CL_COMPLETED = 'completed';

    const items = [];
    const temp = [];
    const ststus = [];
    const isdeleted = [];

    for (var i = 0; i < a; i++) {
        if (sessionStorage.getItem("isdeleted" + i) == "true") {
            console.log("status" + i + "deleted");
        }
        else {
            var for_msg = sessionStorage.getItem("temp" + i);
            var for_com = sessionStorage.getItem("status" + i);

            // console.log("status:"+i+for_com);

            if (for_com == "true") {
                items.push({
                    msg: for_msg,
                    completed: true
                });
            }
            else {
                items.push({
                    msg: for_msg,
                    completed: false
                });
            }
        }

    }


    addTodo('');
    update();
    a = localStorage.getItem("a");

    function update() {
        // for (var i = 0; i < sessionStorage.getItem("items").length; ++i){
        //     // console.log(sessionStorage.getItem("items")[i].msg);
        // }
        var list = $('list');
        list.innerHTML = '';
        for (var i = 0; i < items.length; ++i) {
            (function (index) {
                var it = items[index];
                var msg = it.msg;
                // console.log("a:" + a);
                var temp_a = sessionStorage.getItem("a");
                // console.log("temp_a:" + temp_a);
                if (typeof (Storage) !== "undefined") {

                    // for(var j=0; j<temp_a;j++)
                    // {
                    //     var for_msg = sessionStorage.getItem("temp" + j);
                    //     console.log("for:"+for_msg);
                    // }里面是这次输入的数组
                    a--;
                    // for(var j = 0; j <= a; ++j)
                    // {
                    //     var for_msg = sessionStorage.getItem("temp" + j);
                    //     console.log("for_session:" + for_msg);
                    // }
                    a++;
                    // console.log("msg:" + msg);
                }
                var item = document.createElement('div');
                var itemContent = document.createElement('div');
                var itemDelete = document.createElement('button');
                var itemDeleteAll = document.createElement('button');
                var iteminput = document.createElement('input');
                item.classList.add('list-item');
                it.completed && item.classList.add(CL_COMPLETED);
                itemContent.innerHTML = msg;
                itemContent.className = 'content';
                // itemContent.style="display: ;"
                itemDelete.type = 'button';
                itemDeleteAll.type = 'button';
                itemDeleteAll.innerHTML = ' 删除全部 ';
                itemDelete.innerHTML = ' X ';
                itemDelete.className = 'delete';
                itemDeleteAll.className = 'deleteAll';
                iteminput.setAttribute('type', 'text');
                iteminput.setAttribute('class', 'edit');
                iteminput.setAttribute('value', msg);
                item.appendChild(itemContent);
                item.appendChild(itemDelete);
                item.appendChild(itemDeleteAll);
                item.appendChild(iteminput);
                list.insertBefore(item, list.childNodes[0]);

                // bind events
                itemContent.addEventListener('click', function () {
                    it.completed = !it.completed;
                    sessionStorage.setItem("status" + index, it.completed);
                    console.log("index:" + index);
                    console.log("i:" + i);
                    console.log("item completed" + index + ":" + it.completed);
                    update();
                });
                itemDelete.addEventListener('click', function (event) {
                    var b = sessionStorage.getItem('b');
                    sessionStorage.setItem("isdeleted" + index, true);
                    console.log("remove status" + index);
                    items.splice(index, 1);
                    update();
                    event.stopPropagation();
                });
                itemDeleteAll.addEventListener('click', function (event) {
                    for (var se = 0; se < a; se++) {
                        sessionStorage.setItem("isdeleted" + se, true);
                    }
                    update();
                });
                iteminput.addEventListener('keyup', function (ev) {
                    if (ev.keyCode === 27) { // Esc
                        console.log('exit');
                    } else if (ev.keyCode === 13) {
                        it.msg = this.value;
                        console.log("msg=" + this.value);
                        update();
                        addTodo('');
                    }
                });
            })(i);
        }

        var activeCount = 0;
        items.forEach(function (item) {
            if (!item.completed) ++activeCount;
        });
        $('count').innerHTML = activeCount + ' items left';
    }

    function addTodo() {
        var todo = $('todo');
        var msg = todo.value;
        if (msg == '') {
            console.warn('msg is empty');
            return;
        }

        items.push({
            msg: msg,
            completed: false
        });
        temp.push(msg);

        var temp_a = sessionStorage.getItem("a");
        sessionStorage.setItem("temp" + a, msg);
        sessionStorage.setItem("status" + a, false);
        sessionStorage.setItem("isdeleted" + a, false);
        a++;
        sessionStorage.setItem("a", a);
        update();
        todo.value = '';
    }

    $('todo').addEventListener('keyup', function (event) {
        if (event.keyCode != 13) return;
        addTodo();
    });
    $('search').addEventListener('keyup', function (ev) {
        if (ev.keyCode === 27) { // Esc
            console.log('exit');
        } else if (ev.keyCode === 13) {
            console.log('value:' + this.value);
            a = localStorage.getItem("a");
            console.log(a);
            for (var i = 0; i < a; i++) {
                var for_msg = sessionStorage.getItem("temp" + i);
                console.log('temp:' + for_msg);
                if (this.value === for_msg) {
                    alert("Find item at :" + i + "line");
                    return;
                }
            }
            alert("Can not find");
        }
    });
}